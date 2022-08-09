import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { DashBoardComponent } from './dash-board/dash-board.component';

const routes: Routes = [{
  path: 'dash-board',
  component: DashBoardComponent,
  canActivate: [AuthGuard],
  children: [

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RectrictedRoutingModule { }
