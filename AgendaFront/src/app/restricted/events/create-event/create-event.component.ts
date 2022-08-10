import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Alert } from 'src/app/class/alerts';
import { Event } from 'src/app/class/event';
import { EventsService } from '../../services/events.service';
//Recourse Layout
import {Toast} from 'bootstrap'

@Component({
  selector: 'app-create',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  alert : Alert | null = null
  CreateEvent = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    invitation: new FormControl(''),
    start: new FormControl(null, [Validators.required]),
    finish: new FormControl(null, [Validators.required])
  });
  constructor(private events:EventsService) {

  }




  ngOnInit() {
  }

  //Submit form
  onSubmit(data: Event | any) {

    if(this.CreateEvent.valid){
      // Instanciando Usuario
      let event = new Event(
        data.title,
        data.description,
        data.invitation,
        data.start,
        data.finish)
        console.log(event);

      // Requisição HTTP
      this.events.create(event).subscribe(
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
