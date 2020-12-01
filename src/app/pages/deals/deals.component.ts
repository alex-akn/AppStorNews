import { OnInit, Component, OnDestroy } from '@angular/core';
import { AnimationEvent } from '@angular/animations';

import { ActivatedRoute } from '@angular/router';

import { Subscription, Observable, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { BackendService } from '../../services/backend.service';
import { IntercomService } from '../../services/intercom.service';
import { MetaService } from '../../services/meta.service';

import App from '../../models/app';
import Param from '../../models/param';
import { Cat } from '../../models/cat';

import { CATEGORIES, SUBCATEGORIES } from '../../models/categories';
import { listAnimation } from '../../shared/animations';



@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  styleUrls: ['./deals.component.css'],
  animations: [ listAnimation ]
})
export class DealsComponent implements OnInit, OnDestroy {
  device: number = 2;
  genre: number = 0;
  price: number = 0;
  limit: number = 10;
  //offset: number = 0;
  lang:string = 'de'
  apps: App[] = [];
  listOne: App[] = [];
  listTwo: App[] = [];
  listOneActive: boolean = true;
  sliding: boolean = false;
  listOneState: string = 'initial';
  listTwoState: string = 'initial';
  destination:string = 'deals';       // deals, deals-mac or news
  loading: boolean = false;           // Load More pressed
  showActive: boolean = true;
  mobileMode: boolean = true;

  subscription1: Subscription;
  subscription2: Subscription;

  private moreSource = new Subject<number>();
  private moreObservable$ = this.moreSource.asObservable();

  constructor(
    private backend: BackendService,
    private intercom: IntercomService,
    private activatedRoute: ActivatedRoute,
    private meta: MetaService
  ) {

    this.resubscribe();    

    this.subscription1 = this.intercom.paramAdded$
    .subscribe(this.handleAddedParams.bind(this));

    //Since this component is used for 3 routes
    //it needs to know wich one is current
    this.subscription2 = this.activatedRoute.url.pipe(map(url => url[0].path))
    .subscribe(this.initializeComponent.bind(this));
    
    this.intercom.newWidth$.subscribe(w => {
      this.mobileMode = w < 768 ? true : false;
    })
  }

  ngOnInit() {
    if(this.apps === undefined){
      this.apps = [];
    }    
  }
  

  resubscribe(){
    // Subscribe to User choosing param and merge with 
    // Load More click event observable 
    this.moreObservable$.pipe(      
      switchMap(this.getMoreApps.bind(this)))
    .subscribe(
      next => this.prepareApps(next),
      err => {        
        console.log('error:', err)
        this.loading = false;
        this.resubscribe();
      },
      () => {
        this.loading = false;
      }
    );
  }

  
  initializeComponent(path:string){
    this.destination = path;
    // set tittle of the site
    this.meta.setTitle(path);
    if(path === 'deals-mac') {
      this.device = 3}
    this.loadMore(this.limit);
  }

  handleAddedParams(params: Param[]){
    let flag: boolean = false;
    params.forEach(param => {
      if(param.name == 'price' && this.tabToggleHandler(param.value)) { 
        flag = true;
        this.price = param.value;
      } else if(param.name == 'device') {
        this.device = param.value;
      } else if (param.name == 'genre'){
        this.genre = param.value;
      }
      //this[param.name] = param.value; // doesn't work in strict mode
    });
    if(flag) return;
    
    if(this.mobileMode){
      // remove inactive apps right away no animation
      this.refresh(false);
      this.removeInactiveApps();
      setTimeout(this.appAnimationDone.bind(this), 350, false);

    } else { 
      this.refresh(true);
       // wait for app animation to end
      setTimeout(this.appAnimationDone.bind(this), 350, true);
    }
  }

  tabToggleHandler(price: number): boolean{
    const oldprice = this.price;
    this.price = price;    
    if((oldprice === 1 && price === 2) || (oldprice === 2 && price === 1)){
      this.refresh(false);
      this.removeInactiveApps();
      this.sliding = true;
      this.listOneActive = !this.listOneActive;
      if(this.listOneActive){
        this.showActive = true;
        this.listOneState = 'shiftedRight';
        this.listTwoState = 'void';
        
      } else {
        this.showActive = false;
        this.listOneState = 'void';
        this.listTwoState = 'shiftedLeft';        
      }
      //return true;
    } else if(price === 0){
      this.refresh(true);
      this.removeInactiveApps();
    }
    else if(oldprice === 0){
      if(this.listOneActive){
        this.listOneState = 'shiftedRight';
        this.listTwoState = 'void';
      } else {
        this.listOneState = 'void';
        this.listTwoState = 'shiftedLeft';
      } 
      this.refresh(true);
      setTimeout(this.appAnimationDone.bind(this), 300);
      }
    return true;
    //return false;
  }


  // tabToggleHandler(price: number): boolean{
  //   if((this.price === 1 && price === 2) || (this.price === 2 && price === 1)){
  //     this.listOneActive = !this.listOneActive;
  //     this.sliding = true;
  //     return true;
  //   }
  //   else if(this.price === 0 && price === 1){
  //     this.listOneState = 'shiftedLeft';
  //     this.listTwoState = 'shiftedRight';
  //   }
  //   else if(this.price === 0 && price === 2){
  //     this.listOneState = 'shiftedRight';
  //     this.listTwoState = 'shiftedLeft';
  //   }
  //   return false;
  // }

  
  refresh(willChangeState: boolean){    
    this.apps.forEach(app => {      
      app.isActive = this.checkIfActive(app);
      if(willChangeState){
        app.state = app.isActive ? 'shiftedRight' : 'void';        
      }      
    });      
  }


  appAnimationDone(removeApps: boolean = true){
    console.log('App animation done' , removeApps);
    if(removeApps) {
      this.removeInactiveApps();
    } 
    this.loadMoreIfShort();
  }


  removeInactiveApps(){
    this.apps.forEach(app => {
      app.visible = app.isActive;
    });
  }
  

  checkIfActive(app:App):boolean{
    const isCat = this.genre === 0 ||
      app.genres.indexOf(`${this.genre}`) !== -1;
    const isPrice = this.isGoodPrice(app.newprice);      
    const isDevice = this.isRightDevice(+app.device);
    return isCat && isPrice && isDevice;
  }

  private isGoodPrice(price: string): boolean{
    if(this.price === 0){ return true; }
    if(this.price === 1){ return price === 'gratis';}
    if(this.price === 2){ return price !== 'gratis';}
    return false;
  }

  private isRightDevice(device:number): boolean{    
    if(this.device === 2) { return device !== 3; }
    if(this.device === 1) { return device === 1 || device === 2; }
    if(this.device === 0) { return device === 0 || device === 2; }
    if(this.device === 3) { return device === 3; }
    return false;
  }

  getMoreApps(param:number){
    console.log("Get more apps");
    return this.backend.getMoreApps(this.prepareParams(param));
  }

  //Handle raw app data returned by backend service
  prepareApps(data: App[]){
    console.log(data);
    if(this.apps === undefined) this.apps = [];
    data.forEach((app:App) => {
      if(this.apps.every(a => a.id != app.id)) { 
        app.catNames = this.fromIdToNames(app.genres);
        app.isActive = this.checkIfActive(app);
        app.state = app.isActive ? 'shiftedUp' : 'shiftedRight';
        app.visible = true;              
        this.apps.push(app);
      }      
    });
    this.fillActiveList();
  }

  //Two lists are needed for animation
  fillActiveList(){    
    
    this.listOne = this.apps.filter((app) => true);
  
    this.listTwo = this.apps.filter((app) => true);  

    this.loading = false;
  }

  // fillActiveList(){
    
  //   if(this.listOneActive){
  //     this.listOne = this.apps.filter((app) => app.isActive);
  //   } else { 
  //     this.listTwo = this.apps.filter((app) => app.isActive);
  //   }

  //   this.loading = false;
  // }


  loadMoreIfShort(){
    const visibleApps = this.getNumberOfVisibleApps();
    if(visibleApps < this.limit) {       
      this.loadMore(this.limit - visibleApps);      
    } 
  }

  animDoneHandler($e:AnimationEvent){
    console.log($e.fromState);
    if($e.fromState === 'initial' || $e.toState === 'initial') { return; }
    
    this.sliding = false;
   
    this.loadMoreIfShort();
  }

  animStartedHandler($e:AnimationEvent){
    //console.log($e.fromState, $e.toState);
  }

  //Converts ids into names
  //returns first 2??
  fromIdToNames(genres:any[]):string{
    let output = "";
    let categories: Cat[];
    if(genres[0] == '6014'){
      categories = CATEGORIES.concat(SUBCATEGORIES);
    } else {
      categories = CATEGORIES;
    }
    genres.forEach(genre => {
      categories.forEach(cat => {
        if(cat['id'] === +genre){ output = `${output}, ${cat['name']}`; }
      })      
    })
    return output.slice(2);
  }
 
  prepareParams(limit:number):Param[]{
    let offset = this.getNumberOfVisibleApps();
    if(this.price === 0){
      offset = offset - limit;
      if(offset < 0) { offset = offset + limit; }
      else { limit *= 2; }
    }
    //const action = paths.forEach
    return [
      {name:'action', value:this.getaction()}, //Required  
      {name:'limit', value:limit},                    //Required
      {name:'offset', value:offset},                  //Required
      {name:'genre', value:this.genre},
      {name:'price', value:this.price},
      {name:'device', value:this.device},
      {name:'country', value:this.lang},
    ]
  }

  getaction(){
    return this.destination == 'deals' || this.destination == 'deals-mac' ? 'pdrops' : 'news';    
  }

  getNumberOfVisibleApps():number{
    let offset = 0;
    this.apps.forEach(app => {      
      if(app.isActive) {offset++;}
    });    
    return offset;
  }
  
  //Emits a new value from loadMoreSource observable
  loadMore(num:number){   
    console.log("loadMore") 
    this.moreSource.next(num);
    this.loading = true;
  }


  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();

    console.log('DealsComponent destroyed');
  }
}
