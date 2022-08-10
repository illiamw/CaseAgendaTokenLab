import { User } from './../../class/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from 'src/app/class/event';
import { LoginServiceService } from 'src/app/guard/login-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private readonly API =  `${environment.API}`;
  constructor(private http: HttpClient,
    private router: Router, private auth: LoginServiceService) {

  }



  loadUser(){
    return this.auth.getUser()
  }

  create(event: Event){
    let user = this.loadUser()
    console.log(user);
    console.log(event);

    return this.http.post<any>(this.API + 'rectricted/' + 'create', {event, user}, {responseType: 'json' });
  }

  read(){
    let user = this.loadUser()
    return this.http.post<any>(this.API + 'rectricted/' + 'read',{ email: user.email}, {responseType: 'json' });
  }

  readGuest(id: number){
    return this.http.get<any>(this.API + 'rectricted/' + 'readGuest/' + id, {responseType: 'json' });
  }

  readInvate(){
    let user = this.loadUser()
    return this.http.post<any>(this.API + 'rectricted/' + 'readInvate',{ email: user.email}, {responseType: 'json' });

  }

  accept(GuestID: number, accept: boolean){
    return this.http.post<any>(this.API + 'rectricted/' + 'accept',{ id: GuestID, accept:accept}, {responseType: 'json' });

  }

  update(event: Event){
    return this.http.post<any>(this.API + 'rectricted/' + 'update', {event}, {responseType: 'json' });
  }

  delete(id: Number){
    return this.http.post<any>(this.API + 'rectricted/' + 'delete', {id}, {responseType: 'json' });
  }

  getEvent(id: Number){
    return this.http.get<any>(this.API + 'rectricted/' + 'getEvent/' + id, {responseType: 'json' });
  }


}
