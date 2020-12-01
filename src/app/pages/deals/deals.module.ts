import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { DealsComponent } from './deals.component';
import { ApplistComponent } from './applist/applist.component';
import { AppComponent } from './app/app.component';


@NgModule({
  imports: [ CommonModule, SharedModule ],
  declarations: [DealsComponent, ApplistComponent, AppComponent],
  exports: [ AppComponent, ApplistComponent ]
})
export class DealsModule { }
