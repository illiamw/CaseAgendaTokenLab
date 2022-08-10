import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, empty, map, Observable } from 'rxjs';
import { Alert } from 'src/app/class/alerts';
import { Event } from 'src/app/class/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  event$!: Observable<Event>;
  alert : Alert | null = null
  eventreplace : Event | null = null

  id:number = -1

  UpdateEvent: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    invitation: new FormControl(''),
    start: new FormControl(new Date(), [Validators.required]),
    finish: new FormControl(new Date(), [Validators.required])
  });

  constructor(private router: Router, private route: ActivatedRoute, private events: EventsService, private formBuilder: FormBuilder,) {

  }


  ngOnChange(){

  }

  ngOnInit() {
    this.UpdateEvent.setValue({
      title: 'data.title',
      description: 'data.description',
      invitation: 'data.invitation',
      start: new Date(),
      finish: new Date()
    })


    this.route.params.subscribe(params => {
      // PARAMS CHANGED ..

      let id = params['id'];
      this.id = id
      this.event$ = this.events.getEvent(id).pipe(
        map(data =>{
          if(data.info)
            this.alert = new Alert(data.info, 0)


          this.updateForm(data.event)
          return data.event
        }),

        catchError(error => {
          console.error(error)
          if(error)
            this.alert = new Alert(error.error.info, 1)
          return empty();
        }));
    });
  }

  updateForm(data: Event){
    this.UpdateEvent.patchValue({
      title: data.title,
      description: data.description,
      invitation: data.invitation,
      start: data.start ? new Date(data.start): new Date(),
      finish: data.finish ? new Date(data.finish): new Date()
    })
  }

  //Submit form
  onSubmit(data: Event | any) {

    if(this.UpdateEvent.valid){
      // Instanciando Usuario
      let event = new Event(
        data.title,
        data.description,
        data.invitation,
        data.start,
        data.finish,
        this.id
        )
        console.log(event);

      // Requisição HTTP
      this.events.update(event).subscribe(
        (data ) => {
          // Observando notificação
          if(data.info != null){
            this.alert = new Alert(data.info, 0)
          }



        },
        (error) =>{
          this.alert = new Alert(error.error.info, 1)

        }
      )
    }

  }
}
