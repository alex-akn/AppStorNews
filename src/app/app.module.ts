import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
//import { LoginRoutingModule } from './login/login-routing.module';
//import { LoginComponent } from './login/login/login.component';
import { SharedModule } from './shared/shared.module';
import { DealsModule } from './pages/deals/deals.module';
import { TopsModule } from './pages/tops/tops.module';
import { SearchModule } from './pages/search/search.module';
import { PageNotFoundComponent } from './pages/404/404.component';
//import { UserModule } from './user/user.module';
//import { WatchlistModule } from './pages/watchlist/watchlist.module';

import { HttpClientJsonpModule } from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors/index';

import { BackendService } from './services/backend.service';
import { IntercomService } from './services/intercom.service';
import { MetaService } from './services/meta.service';




@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    //UserModule,
    //WatchlistModule,
    //LoginRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,    
    DealsModule,
    TopsModule,
    SearchModule,
    SharedModule,    
    AppRoutingModule,
    HttpClientJsonpModule,
  ],
  providers: [IntercomService, BackendService, MetaService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
