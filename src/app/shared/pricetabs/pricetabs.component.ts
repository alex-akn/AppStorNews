import { Component, Input, OnInit } from '@angular/core';

import { IntercomService } from '../../services/intercom.service';

@Component({
  selector: 'pricetabs',
  templateUrl: './pricetabs.component.html',
  styleUrls: ['./pricetabs.component.css']
})
export class PricetabsComponent implements OnInit {
  @Input() dest: string = "";
  tabset1 = ['ALLE APPS', 'JETZT GRATIS', 'REDUZIERTE APPS'];
  tabset2 = ['KOSTENPFLICHTIG', 'KOSTENLOS'];
  tabset3 = ['ALLE APPS', 'KOSTENLOS', 'KOSTENPFLICHTIG'];
  tabs:string[] = []
  price:number = 0;
  constructor(private intercom: IntercomService) { }

  ngOnInit() {
    this.intercom.newWidth$.subscribe(w => {      
        this.tabset1[2] = w < 600 ? 'REDUZIERTE' : 'REDUZIERTE APPS';      
    });
    switch(this.dest){
      case 'deals':
        this.tabs = this.tabset1;
        break;
      case 'deals-mac':
          this.tabs = this.tabset1;
          break;
      case 'top-apps':
        this.tabs = this.tabset2;
        break;
      case 'new-apps':
        this.tabs = this.tabset3;
        break;        
    }
    
  }

  onSelectPrice(price: number){
    this.price = price;
    this.intercom.addParam([{name:'price', value:price}]);
  }

  

}
