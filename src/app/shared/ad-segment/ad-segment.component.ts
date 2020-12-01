import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'ad-segment',
  templateUrl: './ad-segment.component.html',
  styleUrls: ['./ad-segment.component.css']
})
export class AdSegmentComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    const event = new Event('adready');

    //document.dispatchEvent(event);
  }

}
