import { Event } from 'src/app/class/event';
import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/class/alerts';
import { EventsService } from '../../services/events.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { catchError, empty, map, Observable } from 'rxjs';

@Component({
  selector: 'app-read-event',
  templateUrl: './read-event.component.html',
  styleUrls: ['./read-event.component.css']
})
export class ReadEventComponent implements OnInit {
  alert : Alert | null = null

  listEvents$!: Observable<Event[]>;

  constructor(private events: EventsService, private router: Router) { }

  deleteEvents(EventID: Number){
    this.router.navigate(['dash-board/delete/'+''+'/'+EventID]);
  }

  updateEvents(EventID: Number){
    this.router.navigate(['dash-board/update/'+''+'/'+EventID]);
  }


  guestsRead(EventID: Number){
    this.router.navigate(['dash-board/invite/'+''+'/'+EventID]);
  }


  ngOnInit() {
    this.pipeList()

  }

  refresh(){
    this.pipeList()
  }

    pipeList(){
      this.listEvents$ = this.events.read().pipe(
      map(data =>{
        // Observando notificação
        if(data.info != null){
          this.alert = new Alert(data.info, 0)
        }

        console.log(data);

        const transformData : Array<Event> = Object.values(data.listEvents)
        return transformData
      }),

      catchError(error => {
        this.alert = new Alert(error.error.info, 1)
        return empty();
      }));
    }
}
