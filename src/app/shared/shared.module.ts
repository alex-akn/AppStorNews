import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';

import { TopmenuComponent, } from './topmenu/topmenu.component';
//import { SocialShareComponent, } from './topmenu/socialshare.component';

import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { FooterComponent } from './footer/footer.component';
import { PricetabsComponent } from './pricetabs/pricetabs.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
//import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
//import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';
import { SliderComponent } from './slider/slider.component';
import { TitleComponent } from './title/title.component';
import { AdSegmentComponent } from './ad-segment/ad-segment.component';
//import { SearchboxComponent } from './searchbox/searchbox.component';


@NgModule({
  imports: [
    AppRoutingModule,
    CommonModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    //MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule,
    //MatRippleModule,
  ],
  declarations: [TopmenuComponent, /*SocialShareComponent,*/ SidemenuComponent, FooterComponent, PricetabsComponent, SliderComponent, TitleComponent, AdSegmentComponent,/* SearchboxComponent*/],
  exports: [ 
    MatButtonModule,
    TopmenuComponent,
    //SocialShareComponent,
    SidemenuComponent,
    FooterComponent,
    PricetabsComponent,
    SliderComponent,
    TitleComponent,
    AdSegmentComponent,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    //MatRippleModule,
  ],
  providers: []
})
export class SharedModule { }
