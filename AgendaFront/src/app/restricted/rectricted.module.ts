import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RectrictedRoutingModule } from './rectricted-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { NavComponent } from './nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateEventComponent } from './events/create-event/create-event.component';
import { ReadEventComponent } from './events/read-event/read-event.component';
import { UpdateEventComponent } from './events/update-event/update-event.component';
import { DeleteEventComponent } from './events/delete-event/delete-event.component';
import { InvitationEventComponent } from './events/invitation-event/invitation-event.component';

import { InviteNotifyEventComponent } from './events/invite-notify-event/invite-notify-event.component';
import { NotifyComponent } from './events/atomic/notify/notify.component';


@NgModule({
  declarations: [DashBoardComponent, NavComponent, CreateEventComponent, ReadEventComponent, UpdateEventComponent, DeleteEventComponent, InvitationEventComponent, NotifyComponent, InviteNotifyEventComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RectrictedRoutingModule
  ]
})
export class RectrictedModule { }
