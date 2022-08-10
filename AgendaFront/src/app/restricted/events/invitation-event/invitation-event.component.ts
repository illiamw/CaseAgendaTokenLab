import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, empty, map, Observable } from 'rxjs';
import { Alert } from 'src/app/class/alerts';
import { Invite } from 'src/app/class/invite';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-invitation-event',
  templateUrl: './invitation-event.component.html',
  styleUrls: ['./invitation-event.component.css'],
})
export class InvitationEventComponent implements OnInit {
  alert: Alert | null = null;

  listEvents$!: Observable<Invite[]>;

  constructor(
    private events: EventsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteEvents(EventID: Number) {
    this.router.navigate(['dash-board/delete/' + '' + '/' + EventID]);
  }

  updateEvents(EventID: Number) {
    this.router.navigate(['dash-board/update/' + '' + '/' + EventID]);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // PARAMS CHANGED ..

      let id = params['id'];
      this.listEvents$ = this.events.readGuest(id).pipe(
        map((data) => {
          console.log(data);

          // Observando notificação
          if (data.info != null) {
            this.alert = new Alert(data.info, 0);
          }

          console.log(data);

          const transformData: Array<Invite> = data.guestsResultado;
          console.log(transformData);

          return transformData;
        }),

        catchError((error) => {
          this.alert = new Alert(error.error.info, 1);
          return empty();
        })
      );
    });
  }

  pipeList(id: number) {

  }
}
