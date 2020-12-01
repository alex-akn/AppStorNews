import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { BackendService } from '../../services/backend.service';

import WatchApp from '../../models/watchlistapp';



  
@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

  watchlist: WatchApp[] = [];
  showSearchResults: boolean = false;
  iosApps: WatchApp[] = [];
  macApps: WatchApp[] = [];

  constructor(private backend: BackendService) {}

  ngOnInit() {
    const watchlist = localStorage.getItem('watchlist');
    if(watchlist){
        this.watchlist = JSON.parse(watchlist, (key, value) => {
        //console.log(`key ${key} |`);
        return value;
      }); 
    }
  }

  saveWatchlist() {
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist.filter(app => app.inWatchlist)));
  }

  onSearch(term: string) {

    const observables = ['software', 'iPadSoftware', 'macSoftware'].map(
      entity => this.backend.searchAppStore(term, entity).pipe(
        map(data => this.prepareApps(data))
      )
    );
    
    combineLatest(observables).pipe(
      map(([iphone, ipad, mac]) => [this.crossMerge(iphone, ipad), mac]),
    ).
    subscribe(this.showResults.bind(this));
  }

  prepareApps(data: WatchApp[]) {
    data.forEach((a: WatchApp) => {
      if(!this.watchlist || this.watchlist && this.watchlist.every(app => app.trackId != a.trackId)){
        a.inWatchlist = false;
      } else{
        a.inWatchlist = true;
      }
      if(a.formattedPrice == undefined){
        a.formattedPrice = "Arcade";
      }
      if(a.kind === "mac-software") { a.device = "Mac"; }
      else {
        a.device = a.screenshotUrls.length === 0 ? "iPad" : a.ipadScreenshotUrls.length === 0 ? "iPhone" : "iPhone & iPad"; }

    });
    return data;   
  }

  showResults(data:WatchApp[][]){
    [this.iosApps, this.macApps] = data;
    this.showSearchResults = true;
  }

  crossMerge(arr1: WatchApp[], arr2: WatchApp[]){
    const result = [];
    for(let i = 0; i<Math.max(arr1.length, arr2.length); i++){
      if(arr1[i] !== undefined) { result.push(arr1[i]); }
      if(arr2[i] !== undefined){
        let test = arr1.every(function(el){
          return el.trackId != arr2[i].trackId;
        });
        if(test) { result.push(arr2[i]); }
      }
    }
    return result;
  }

  addToWatchlist(app: WatchApp) {
    if (this.watchlist === undefined) this.watchlist = [];
    
    if(this.watchlist.every(watchapp => watchapp.trackId != app.trackId)){
      const trimmedApp = new WatchApp();
      trimmedApp.trackId = app.trackId;
      trimmedApp.trackName = app.trackName;
      trimmedApp.artistName = app.artistName;
      trimmedApp.artworkUrl60 = app.artworkUrl60;
      trimmedApp.formattedPrice = app.formattedPrice;
      trimmedApp.genres = app.genres;
      trimmedApp.trackViewUrl = app.trackViewUrl;
      trimmedApp.isFree = app.isFree;
      trimmedApp.inWatchlist = true;
      trimmedApp.device = app.device;
      this.watchlist.push(trimmedApp);
    } 
    
    this.saveWatchlist();
  }

  removeFromWatchlist(trackId: string){
    console.log(this.watchlist);
    this.saveWatchlist();
  }


  
}
