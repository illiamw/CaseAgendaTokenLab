import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DevOpsTesteService {

  private readonly API =  `${environment.API}`;
  constructor(private http: HttpClient) {

  }

  teste(){
    return this.http.get<any>(this.API, {responseType: 'json' });
  }
}
