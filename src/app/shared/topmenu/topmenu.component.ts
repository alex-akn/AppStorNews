import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {SocialShareComponent} from './socialshare.component'

import { IntercomService } from '../../services/intercom.service'



const tabset1 = ["Angobote", "Top Apps", "Neuerscheinungen"];

@Component({
  selector: 'navigation',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit{
  show_second_row: boolean
  mobile_mode: boolean
  expanded: boolean
  opened_mob: boolean
  title: string = "";
  tabset = [
    { value: "Angobote", link: "/deals"},
    { value: "Top Apps", link: "/top-apps"},
    { value: "Neuerscheinungen", link: "/new-apps"}
  ];

  constructor(
    private _bottomSheet: MatBottomSheet,
    private router: Router,
    private intercom: IntercomService
  ) {
    this.mobile_mode = false
    this.show_second_row = false
    this.expanded = false
    this.opened_mob = false   
  }

  ngOnInit(){

    this.intercom.newWidth$.subscribe(w => {
      if(w < 992 && !this.mobile_mode) {
        this.mobile_mode = true;  
      }
      if(w >= 992 && this.mobile_mode) {
        this.mobile_mode = false;   
      }

      this.tabset[2].value = w < 600 ? 'Neue Apps' : "Neuerscheinungen";
      
    });

    this.intercom.newTitle$.subscribe(title => {
      this.title = title;    
    })
  }

  // BEGIN BUTTON PRESS HANDLERS

  handleMore(): void {
    this.show_second_row = !this.show_second_row;
    this.intercom.informAboutSecondRow(this.show_second_row);
  }


  handleShare(): void {
    this._bottomSheet.open(SocialShareComponent);  
  }


  handleSearch(what:string){
    if(what.length >= 3 ){      
      let link = ['/search', 'deals', what ];
      this.opened_mob = false;
      this.router.navigate(link);
    }
  }

  handleAnotherSearch(){
    this.opened_mob = true;
    this.intercom.informAboutSearch(true);
  }
  handleClose(){
    if(this.opened_mob){
      this.opened_mob = false;
      this.intercom.informAboutSearch(false);
    }
  }



  // END BUTTON PRESS HANDLERS

}


