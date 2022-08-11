import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './public/login/login.component';
import { CreateUserComponent } from './public/create-user/create-user.component';
import { AuthInterceptorService } from './guard/auth-interceptor.service';
import { RectrictedModule } from './restricted/rectricted.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RectrictedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
   }],
  bootstrap: [AppComponent]
})
export class AppModule { }
