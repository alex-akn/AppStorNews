import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { IntercomService } from '../../services/intercom.service';

import { CATEGORIES } from '../../models/categories';
import { Cat } from '../../models/cat';
import Param from '../../models/param';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit, OnDestroy {
  
  @Input() dest: string = "";
  @Output() catSelected = new EventEmitter<boolean>();

  categories: Cat[];  
  isMobileModeOn:boolean = false;
  catId: number = 0;
  device: number = 2;

  subscription: Subscription;

  constructor(private intercom: IntercomService) {
    this.subscription = intercom.newWidth$.subscribe(w => {
      if(w < 768) { this.isMobileModeOn = true; }
      else { this.isMobileModeOn = false; }
    });
    
    this.categories = this.getCategories(this.device === 3);
  }

  ngOnInit() {
    this.device = this.dest == 'deals-mac' ? 3 : this.dest == 'top-apps' ? 0 : 2;  
  }

  getCategories(isMac: boolean): Cat[]{
    return CATEGORIES.filter(cat => {
        return cat.id < 12000 && cat.show;
        //if(isMac) {return cat.id>=12000 || cat.id===0;}
        //else { return cat.id<12000; }
    });
  }

  onSelectCat(id: number){
    this.catId = id;
    this.catSelected.emit(true);
    this.waitTransitionEnd([this.newParam('genre', id)]);
  }
  onSelectDevice(dev: number){
    if((this.device !== 3 && dev === 3) ||
    (this.device === 3 && dev !== 3)){
      this.catId = 0;
    }
    this.device = dev;
    this.categories = this.getCategories(this.device === 3);
    this.waitTransitionEnd([this.newParam('device', dev),
      this.newParam('genre', 0)]);
  }

  waitTransitionEnd(params: Param[]){
    // if(this.isMobileModeOn) {
    //   setTimeout(() => {
    //     this.intercom.addParam(params);
    //   }, 300);
    // } else {
      this.intercom.addParam(params);
    // }
    
  }

  newParam(name:string, value:any):Param{
    return {name:name, value:value};
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
