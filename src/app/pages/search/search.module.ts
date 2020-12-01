import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { DealsModule } from '../deals/deals.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    DealsModule,
    SharedModule,
  ],
  declarations: [SearchComponent]
})
export class SearchModule { }
