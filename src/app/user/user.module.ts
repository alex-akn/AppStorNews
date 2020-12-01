import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { UserComponent } from './user/user.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { OtherComponent } from './other/other.component';

import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  declarations: [UserComponent, WatchlistComponent, OtherComponent]
})
export class UserModule { }
