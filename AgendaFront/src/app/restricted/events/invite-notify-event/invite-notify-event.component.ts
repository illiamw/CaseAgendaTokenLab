import { Event } from 'src/app/class/event';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/class/alerts';
import { EventsService } from '../../services/events.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { catchError, empty, map, Observable } from 'rxjs';

@Component({
  selector: 'app-invite-notify-event',
  templateUrl: './invite-notify-event.component.html',
  styleUrls: ['./invite-notify-event.component.css'],
})
export class InviteNotifyEventComponent implements OnInit {
  alert: Alert | null = null;

  listEvents$!: Observable<Event[]>;

  constructor(private events: EventsService, private router: Router) {}

  accept(GuestID: number, accept: boolean) {
    console.log("accept");

    this.events.accept(GuestID, accept).subscribe(
      (data) => {
        // Observando notificação
        if (data.info != null) {
          this.alert = new Alert(data.info, 0);
        }
      },
      (error) => {
        this.alert = new Alert(error.error.info, 1);
      }
    );
  }

  ngOnInit() {
    this.pipeList();
  }

  refresh() {
    this.pipeList();
  }

  pipeList() {
    this.listEvents$ = this.events.readInvate().pipe(
      map((data) => {
        // Observando notificação
        if (data.info != null) {
          this.alert = new Alert(data.info, 0);
        }

        console.log(data);

        const transformData: Array<Event> = Object.values(data.guestsResultado);
        return transformData;
      }),

      catchError((error) => {
        this.alert = new Alert(error.error.info, 1);
        return empty();
      })
    );
  }
}
