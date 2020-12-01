import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  searchlist$: Observable<Object[]>;
  watchlist: Object[];
  constructor(private backend: BackendService) { }

  ngOnInit() {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    
  }

  saveWatchlist(){
    localStorage.setItem("watchlist", JSON.stringify(this.watchlist));
  }

  onSearch(term:string){
    console.log("Method ");
    this.searchlist$ = this.backend.searchAppStore(term);

  }

  addToWatchlist(trackId:string){
    this.watchlist.push({"id":trackId});
    this.saveWatchlist();
  }

}
