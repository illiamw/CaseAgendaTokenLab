import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RectrictedRoutingModule } from './rectricted-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NavComponent } from './nav/nav.component';


@NgModule({
  declarations: [DashBoardComponent, NavComponent],
  imports: [
    CommonModule,
    RectrictedRoutingModule
  ]
})
export class RectrictedModule { }
