import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import WatchApp from '../../../models/watchlistapp';

@Component({
  selector: 'watchlist-app',
  templateUrl: './watch-app.component.html',
  styleUrls: ['./watch-app.component.css']
})
export class WatchAppComponent implements OnInit {
  @Input() app: WatchApp;
  @Output() addRequest = new EventEmitter<WatchApp>();
  @Output() removeRequest = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  add(){
    this.app.inWatchlist = true;
    this.addRequest.emit(this.app);    
  }
  remove(){
    this.app.inWatchlist = false;
    this.removeRequest.emit(this.app.trackId);    
  }

}
