import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { WatchlistComponent } from './watchlist.component';
import { WatchAppComponent } from './watch-app/watch-app.component';





@NgModule({
  declarations: [WatchlistComponent, WatchAppComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class WatchlistModule { }
