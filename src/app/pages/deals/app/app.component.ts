import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import  App  from '../../../models/app';

@Component({
  selector: 'app-detail',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent implements OnDestroy {
  @Input() app: App;
  devices = [ 'iPhone', 'iPad', 'iOS Universal', 'Mac'];
  constructor() {
    this.app = {id: 0, rank:0,class:'', arrow:'', change:0, title:'', icon:'', rating:0, reviews:0, newprice:'', oldprice:'',link:'',genres:[],dev:'',isActive:true,visible:true,state:'',catNames:'',maxWidth:'',device:0}
      
  }

  ngOnDestroy(){
    console.log(`app ${this.app.id} (${this.app.state}) destoyed`);
  }
}
