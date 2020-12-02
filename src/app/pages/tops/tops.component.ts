import { OnInit, Component, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { Subscription, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { BackendService } from '../../services/backend.service';
import { IntercomService } from '../../services/intercom.service';
import { MetaService } from '../../services/meta.service';

import App from '../../models/app';
import Param from '../../models/param';
import { CATEGORIES } from '../../models/categories';
import { listAnimation } from '../../shared/animations';


@Component({
  selector: 'app-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.css'],
  animations: [ listAnimation ]
})
export class TopsComponent implements OnInit, OnDestroy {
  device: number = 0;
  genre: number = 0;
  price: number = 0;
  limit: number = 25;
  //offset: number = 0;
  lang:string = 'de'
  listOne: App[] = [];
  listTwo: App[] = [];
  sliding: boolean = false;
  listOneState: string = 'initial';
  listTwoState: string = 'initial';
  destination:string = 'top-apps';
  loading: boolean = false;

  subscription: Subscription;

  private moreSource = new Subject<number>();
  private moreObservable$ = this.moreSource.asObservable();

  constructor(
    private backend: BackendService,
    private intercom: IntercomService,
    private meta: MetaService
  ) {

    this.resubscribe();    

    this.subscription = intercom.paramAdded$
    .subscribe(this.processAddedParams.bind(this));
  }


  ngOnInit() {
    this.meta.setTitle("top-apps");
    this.loadMore(this.limit);
  }


  resubscribe(){
    //Subscribe to User choosing param and merge with 
    //Load More click event observable        
    this.moreObservable$.pipe(      
      switchMap(this.getMoreApps.bind(this)))
    .subscribe(
      next => this.prepareApps(next),
      err => {        
        console.log('error:', err)
        this.loading = false;
        this.resubscribe(); // or have to reload page
      },
      () => {
        this.loading = false;
      }
    );
  }


  //Emits a new value from loadMoreSource observable
  loadMore(num:number){    
    this.moreSource.next(num);
    this.loading = true;
  }
  
 
  processAddedParams(params: Param[]){
    let flag: boolean = false;
    params.forEach(param => {
      let j = param.value;
      switch(param.name){
        case 'price':
          if(this.tabToggleHandler(j)) { this.price = j; }
          break;
        case 'genre':
          if(this.genre != j) { flag = true; this.genre = j;}
          break;
        case 'device':
          if(this.device != j) { flag = true; this.device = j;}
          break;
        default:
          
      }
    });

    if(flag){
      this.listOne = [];
      this.listTwo = [];
    }
    
    setTimeout(this.loadMoreIfShort.bind(this), 300);
  }


  tabToggleHandler(price: number): boolean{
    if(this.price === price){
      return false;      
    }
    if(this.price === 0 && price === 1){
      this.listOneState = 'void';
      this.listTwoState = 'shiftedRight';
    }
    else if(this.price === 1 && price === 0){
      this.listOneState = 'shiftedLeft';
      this.listTwoState = 'void';
    }
    this.sliding = true;
    return true;
  }


  getMoreApps(param:number){    
    return this.backend.getMoreApps(this.prepareParams(param));
  }


  //Handle raw app data returned by backend service
  prepareApps(data: App[]){
    data.forEach((app:App) => {
        app.catNames = this.fromIdToNames(app.genres);
        app.state = 'shiftedUp';
        const reg_up = /up/;
        const reg_down = /down/;
        if(app.class.match(reg_up) != null){
          app.class = "arrow-up";
        }
        else if(app.class.match(reg_down) != null){
          app.class = "arrow-down";
        }
        else {
          app.class = app.arrow == "=" ? "" : "text-warning";
        }
        if(this.price === 0) { this.listOne.push(app); }
        else { this.listTwo.push(app); }
            
    });
    this.loading = false;
  }


  loadMoreIfShort(){
    let visibleApps = this.getNumberOfVisibleApps();
    if(visibleApps < this.limit) {       
      this.loadMore(this.limit - visibleApps);      
    } 
  }


  animDoneHandler($e:AnimationEvent){
    //if($e.fromState === 'initial') { return; }
    this.sliding = false;
  }
  animStartedHandler($e:AnimationEvent){
    //console.log($e.fromState, $e.toState);
  }


  //Converts ids into names
  //returns first 2??
  fromIdToNames(genre:string):string{
    let output = "";    
    
      CATEGORIES.forEach(cat => {
        if(cat['id'] === +genre){ output = cat['name']; }
      })      
    
    return output;
  }

 
  prepareParams(limit:number):Param[]{
    const offset = this.getNumberOfVisibleApps();
    return [
      {name:'action', value:'tops'}, //Required  
      {name:'limit', value:limit},                    //Required
      {name:'offset', value:offset},                  //Required
      {name:'genre', value:this.genre},
      {name:'price', value:this.price},
      {name:'device', value:this.device},
      {name:'country', value:this.lang},
    ]
  }


  getNumberOfVisibleApps():number{
    let offset = 0;
    if(this.price === 0){
      offset = this.listOne.length;
    } else {
      offset = this.listTwo.length;
    }
    return offset;
  }
  
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    
    //console.log('TopsComponent destroyed');
  }
}
