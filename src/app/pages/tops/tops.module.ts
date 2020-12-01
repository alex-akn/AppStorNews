import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { TopsComponent } from './tops.component';
import { ChartComponent } from './chart/chart.component';



@NgModule({
  imports: [ CommonModule, SharedModule ],
  declarations: [TopsComponent, ChartComponent],
  exports: [ ChartComponent ]
})
export class TopsModule { }