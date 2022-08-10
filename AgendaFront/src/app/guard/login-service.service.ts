import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../class/user';
import * as moment from 'moment';
import { Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private readonly API =  `${environment.API}`;
  constructor(private http: HttpClient,
    private router: Router) {

  }

  create(user: User){
    return this.http.post<any>(this.API + 'create', user, {responseType: 'json' });
  }

  login(user: User){
    return this.http.post<any>(this.API + 'login', user, {responseType: 'json' });
  }

  getUser(): User{
    if(this.isLoggedIn()){
      console.log("user get");
      console.log(localStorage.getItem('email'));


      return new User(localStorage.getItem('name'), localStorage.getItem('lastname') +'', localStorage.getItem('email')+'')
    }else{
      return new User('','','','')
    }
  }

  setSession(authResult: any) {
    // Exmplo de Object
    //   {
    //     "user": {
    //         "id": 2,
    //         "name": "William",
    //         "lastname": "Ferreira",
    //         "email": "williambox37@gmail.com",
    //         "remember_me_token": null,
    //         "created_at": "2022-08-09T00:26:43.000-03:00",
    //         "updated_at": "2022-08-09T00:26:43.000-03:00"
    //     },
    //     "token": {
    //         "type": "bearer",
    //         "token": "MTE.i_t6ZdoO56offqliu5zAf_qJqJcSb6SNxNXyDYsjRuZ3EWlRm4CDjoZtlvun",
    //         "expires_at": "2022-08-09T02:11:20.991-03:00"
    //     },
    //     "info": "Login com sucesso!"
    // }
    console.log("SetSession", authResult);

    localStorage.setItem('name', authResult.user.name);
    localStorage.setItem('lastname', authResult.user.lastname);
    localStorage.setItem('email', authResult.user.email);
    localStorage.setItem('id_token', authResult.token.token);
    localStorage.setItem('expires_at', authResult.token.expires_at);
    this.router.navigate(['dash-board']);
  }

  // Controle de acesso
  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('email');
    localStorage.removeItem('id_token');
    localStorage.removeItem("expires_at");
    this.load();
  }

  public isLoggedIn() {
    console.log(this.getExpiration());
    if(this.getExpiration() != null){
      if(moment().isBefore(this.getExpiration())){
        console.log(moment().isBefore(this.getExpiration()));

        return true
      }else{
        if(localStorage.getItem("expires_at")){
          this.logout();
          return false;
        }else{
          return false
        }
      }
    }else{
      return false
    }
  }



  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    console.log(localStorage.getItem("expires_at"));

    const expiration = localStorage.getItem("expires_at");
    if(expiration != null){
      return moment(expiration);
    }else{
      return null
    }


  }


  load() {
    location.reload();
  }


}
