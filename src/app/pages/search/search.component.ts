import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ParamMap
} from '@angular/router';
import {
  Subscription
} from 'rxjs';
import {
  //debounceTime,
  //distinctUntilChanged,
  switchMap,
  distinct
} from 'rxjs/operators';
import {
  Location
} from '@angular/common';

import App from '../../models/app';
import {
  Cat
} from '../../models/cat';
import {
  CATEGORIES,
  SUBCATEGORIES
} from '../../models/categories';

import {
  BackendService
} from '../../services/backend.service';
import {
  IntercomService
} from '../../services/intercom.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  apps: App[] = [];
  title: string = "Suchergebnisse";
  search_box_open: boolean = false;
  message: string = "";
  loading: boolean = false;
  what: string = "";

  subscription: Subscription;


  constructor(
    private backend: BackendService,
    private route: ActivatedRoute,
    private intercom: IntercomService,
    private location: Location
  ) {
    this.loading = true;
    this.route.paramMap.pipe(
      distinct((p: ParamMap) => {
        return p.get("what");
      }),
      switchMap((params: ParamMap) => {
        this.loading = true;
        this.apps = [];
        const where = params.get('where') || "deals";
        const what = params.get('what') || "";
        this.what = what;
        return this.backend.searchApps(where, what);
      })
    ).subscribe(
      next => this.prepareApps(next),
      err => {
        this.message = " Bitte versuchen Sie es später noch einmal";
        console.log('error:', err)
        this.completeSearch();
      },
      () => {
        this.completeSearch();
      }
    );

    this.subscription = this.intercom.isSearchOpen$.subscribe(is_open => this.search_box_open = is_open);
  }


  ngOnInit() {

    this.intercom.setNewTitle(this.title);
  }


  completeSearch(){
    this.loading = false;
    this.search_box_open = false;
  }


  goBack() {
    this.location.back();
  }


  prepareApps(data: App[]) {
    if (this.apps === undefined) this.apps = [];
    
    if (Array.isArray(data)) {
      let count = data.length;
      this.message = count > 0 ? `Ihre Suche nach "${this.what}" ergab ${count}Treffer` : "Keine Ergebnisse gefunden";
    } else {
      this.apps = [];
      this.message = "Keine Ergebnisse gefunden";
    }
    data.forEach((app: App) => {
      app.catNames = this.fromIdToNames(app.genres);
      this.apps.push(app);
    });
    
    this.completeSearch();
  }

  fromIdToNames(genres: any[]): string {
    let output = "";
    let categories: Cat[];
    if (genres[0] == '6014') {
      categories = CATEGORIES.concat(SUBCATEGORIES);
    } else {
      categories = CATEGORIES;
    }
    genres.forEach(genre => {
      categories.forEach(cat => {
        if (cat['id'] === +genre) {
          output = `${output}, ${cat['name']}`;
        }
      })
    })
    return output.slice(2);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
