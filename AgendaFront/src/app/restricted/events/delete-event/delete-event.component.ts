import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { catchError, empty, map, Observable, switchMap } from 'rxjs';
import { Alert } from 'src/app/class/alerts';
import { Event } from 'src/app/class/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  alert : Alert | null = null

  DeleteEvent = new FormGroup({
    confirm: new FormControl('', [Validators.required]),
  });
  constructor(private router: Router, private route: ActivatedRoute, private events: EventsService) { }

  event$!: Observable<Event>;

  selectID = -1;

  ngOnInit() {
    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..

      let id = params['id'];
      this.event$ = this.events.getEvent(id).pipe(
        map(data =>{
          this.alert = new Alert(data.info, 0)
          return data.event
        }),

        catchError(error => {
          this.alert = new Alert(error.error.info, 1)
          return empty();
        }));
    });

  }

//Submit form
onSubmit() {
  const id :Number =  Number(this.route.snapshot.paramMap.get('id')!)
  if(this.DeleteEvent.valid){


    // Requisição HTTP
    this.events.delete(id).subscribe(
      (data ) => {
        // Observando notificação
        if(data.info != null){
          this.alert = new Alert(data.info, 0)
        }
        console.log(data);

        setTimeout(() => {
          this.router.navigate(['dash-board'])      }
        , 3000);


      },
      (error) =>{
        this.alert = new Alert(error.error.info, 1)
      }
    )


  }

}
}
