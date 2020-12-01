import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject }    from 'rxjs';

import Param from '../models/param';

@Injectable()
export class IntercomService {

  private paramAddedSource = new Subject<Param[]>();
  private newTitleSource = new BehaviorSubject<string>("AppStorNews");
  private isSearchOpenSource = new Subject<boolean>();
  private secondRowShownSource = new Subject<boolean>();
  private newWidthSource = new BehaviorSubject<number>(this.windowWidth);
  //private destinationSource = new Subject<number>();

  paramAdded$ = this.paramAddedSource.asObservable();
  newTitle$ = this.newTitleSource.asObservable();
  newWidth$ = this.newWidthSource.asObservable();
  isSearchOpen$ = this.isSearchOpenSource.asObservable();
  secondRowShown$ = this.secondRowShownSource.asObservable();

  constructor() { 
    console.log('Service Created');
    window.addEventListener("resize", () => this.onResize());
  }

  addParam(param: Param[]){
    this.paramAddedSource.next(param);
  }

  setNewTitle(title: string){
    this.newTitleSource.next(title);
  }

  informAboutSearch(is_open: boolean){
    this.isSearchOpenSource.next(is_open);
  }

  informAboutSecondRow(second_row_shown: boolean){
    this.secondRowShownSource.next(second_row_shown);
  }

  get windowWidth(){
    return window.innerWidth;
  }
  // BEGIN EVENT HANDLERS

  onResize(){    
    this.newWidthSource.next(this.windowWidth);
  }

  
  // END EVENT HANDLERS

}
