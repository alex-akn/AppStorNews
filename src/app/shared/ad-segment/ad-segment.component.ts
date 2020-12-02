import { AfterViewInit, Component, OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';

import { IntercomService } from '../../services/intercom.service';

@Component({
  selector: 'ad-segment',
  templateUrl: './ad-segment.component.html',
  styleUrls: ['./ad-segment.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdSegmentComponent implements AfterViewInit {
  constructor(
    private ref: ChangeDetectorRef,
    private intercom: IntercomService) {
      this.intercom.newTitle$.subscribe(title => {
        this.ref.markForCheck();
      });  
  }

  ngAfterViewInit() {
    const event = new Event('adready');

    //document.dispatchEvent(event);
  }

}
