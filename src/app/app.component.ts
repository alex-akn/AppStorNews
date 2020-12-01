import { Component, ApplicationRef } from '@angular/core';
import { first } from 'rxjs/operators';

import { IntercomService } from './services/intercom.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'App Stor News';
  is_second_row: boolean = false;
  mobile_mode: boolean = false;

  constructor(appRef: ApplicationRef,
              private intercom: IntercomService,
              ) {
    appRef.isStable.pipe(
       first(stable => stable)
    ).subscribe(() => console.log('App is stable now'));

    this.intercom.secondRowShown$.subscribe(second => this.is_second_row = second);
    
  }
}