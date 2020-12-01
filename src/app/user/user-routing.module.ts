import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OtherComponent } from './other/other.component';

import { AuthGuard } from '../login/auth-guard.service';

const userRoutes: Routes = [
  {
    path: 'userarea/watchlist',
    component: WatchlistComponent
    //component: UserComponent,
    //canActivate: [AuthGuard],
    // children: [
    //   {
    //     path: '',
    //     canActivateChild: [AuthGuard],
    //     children: [
    //       { path: 'watchlist', component: WatchlistComponent },          
    //       { path: '', component: OtherComponent }
    //     ]
    //   }
    // ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  declarations: [],
  exports: [ RouterModule ]
})
export class UserRoutingModule { }
