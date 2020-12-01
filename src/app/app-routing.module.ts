import { NgModule } from '@angular/core';
import { 
  RouterModule, Routes,
 } from '@angular/router';

import { DealsComponent } from './pages/deals/deals.component';
import { TopsComponent } from './pages/tops/tops.component';
import { SearchComponent } from './pages/search/search.component';
import { PageNotFoundComponent  } from './pages/404/404.component';
//import { WatchlistComponent  } from './pages/watchlist/watchlist.component';



//import { AuthGuard } from './login/auth-guard.service';

const routes: Routes = [
  /*{
    path: 'userarea',
    loadChildren: 'app/user/user.module#UserModule',
    canLoad: [AuthGuard]
  },*/
  /*{
    path: 'top-apps',
    loadChildren: 'app/pages/tops/tops.module#TopsModule',
    data: { preload: true }
  },*/
  /*{
    path: 'rss-generator',
    loadChildren: 'app/pages/rss/rss.module#RssModule',
    data: { preload: true }
  },*/
  { path: '', redirectTo: '/deals', pathMatch: 'full' },
  { path: 'deals', component: DealsComponent },
  { path: 'top-apps', component: TopsComponent },
  { path: 'new-apps', component: DealsComponent },
  { path: 'deals-mac', component: DealsComponent },
  //{ path: 'watchlist', component: WatchlistComponent },
  { path: 'search/:where/:what', component: SearchComponent }, 
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
