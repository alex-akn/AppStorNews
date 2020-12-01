import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  MediaMatcher
} from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { IntercomService } from '../../services/intercom.service';

@Component({
  selector: 'asn-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() destination: string = "deals";

  classSet1: Object = {};
  classSet2: Object = {};
  isCatVisible: boolean;
  isSlidingTime: boolean;

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;
  smallQuery: MediaQueryList;

  showOverlay: boolean = false;
  search_box_open: boolean = false;
  hide_menu: boolean = false;// remove left side from DOM until 3 sec after Init
  is_second_row_shown: boolean = false;

  subscription1: Subscription;
  subscription2: Subscription;


  constructor(private intercom: IntercomService,
    mediaMatcher: MediaMatcher,) {
    this.subscription1 = this.intercom.isSearchOpen$.subscribe(is_open => this.search_box_open = is_open);
    this.subscription2 = this.intercom.secondRowShown$.subscribe(second_row => this.is_second_row_shown = second_row);

    this.smallQuery = mediaMatcher.matchMedia('(max-width: 599px)');
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 767px)');
    this.tabletQuery = mediaMatcher.matchMedia('(max-width: 991px)');
    this.mobileQuery.addEventListener('change', (mql) => this.activateMobileLayout(mql));
    this.tabletQuery.addEventListener('change', (mql) => this.activateMobileLayout(mql));

    this.isCatVisible = false;
    this.isSlidingTime = false;
    
   }

  ngOnInit(): void {    
    if(this.mobileQuery.matches) {
      this.hide_menu = true;
      setTimeout(() => this.hide_menu = false, 3000);
    }    
    this.setClasses();
  }


  // ANIMATIONS BLOCK START

  handleCatOpen() {
    this.showOverlay = true;
    this.isCatVisible = true;
    this.isSlidingTime = true;
    this.setClasses();
  }

  handleCatSelected() {
    this.showOverlay = false;
    this.isCatVisible = false;
    this.isSlidingTime = true;
    this.setClasses();
  }

  setClasses() {
    if (this.tabletQuery.matches) { // Mobile Layout
      this.classSet1 = {
        vis: this.isCatVisible,
        toleft: !this.isCatVisible,
        sliding: this.isSlidingTime && this.isCatVisible && this.mobileQuery.matches,
        "sr-only": !this.isSlidingTime && !this.isCatVisible,
        "sidenav-fixed": !this.mobileQuery.matches,
        "double-margin": this.is_second_row_shown && !this.mobileQuery.matches
      };
      if (this.mobileQuery.matches) {
        this.classSet2 = {
          vis: !this.isCatVisible,
          toright: this.isCatVisible,
          sliding: this.isSlidingTime && !this.isCatVisible,
          "sr-only": !this.isSlidingTime && this.isCatVisible
        };
      } else {
        this.classSet2 = {          
          "sr-only": false
        };
      }
    } else { // Desktop layout
      this.classSet1 = {

      };
      this.classSet2 = {

      };
    }
  }



  onTransitionEnd() {
    if(!this.isSlidingTime){
      return;
    }
    this.isSlidingTime = false;
    this.setClasses();
  }


  // ANIMATIONS BLOCK END

  activateMobileLayout(mql: MediaQueryListEvent) {
    
    this.isCatVisible = false;
    this.showOverlay = false;
    this.setClasses();
  }


  myFunc(){
    console.log("HOORAY");
  }

  ngOnDestroy(){
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
