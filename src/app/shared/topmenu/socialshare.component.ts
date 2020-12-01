import { Component } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';


@Component({
    selector: 'social-share-sheet',
    templateUrl: 'socialshare.component.html',
  })
  export class SocialShareComponent {
    constructor(private _bottomSheetRef: MatBottomSheetRef<SocialShareComponent>) {}
  
    openLink(event: MouseEvent): void {
      this._bottomSheetRef.dismiss();
      event.preventDefault();

      let p = "http://www.pinterest.com/pin/create/button/?description=Die%20letzten%20Preissenkungen%2C%20Schn%C3%A4ppchen%2C%20Deals%2C%20Angebote%2C%20gratis%20und%20reduzierte%20Apps%20%26amp%3B%20Spiele%20im%20iOS%20App%20Store&url=https%3A%2F%2Fappstor.news%2Fdeals&media=http%3A%2F%2Fappstor.news%2Fimg%2Forange_app_store_icon_400x400.jpg"
    }
  }
  