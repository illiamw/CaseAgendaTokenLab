import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { DeleteEventComponent } from './events/delete-event/delete-event.component';
import { InvitationEventComponent } from './events/invitation-event/invitation-event.component';
import { InviteNotifyEventComponent } from './events/invite-notify-event/invite-notify-event.component';
import { UpdateEventComponent } from './events/update-event/update-event.component';

const routes: Routes = [{
  path: 'dash-board',
  component: DashBoardComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: CreateEventComponent
      },
    {
    path: 'delete/:id',
    component: DeleteEventComponent
    },
    {
    path: 'update/:id',
    component: UpdateEventComponent
    },
    {
    path: 'invite/:id',
    component: InvitationEventComponent
    },
    {
    path: 'invites',
    component: InviteNotifyEventComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RectrictedRoutingModule { }
