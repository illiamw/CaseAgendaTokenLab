import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './public/create-user/create-user.component';
import { LoginComponent } from './public/login/login.component';

const routes: Routes = [
  { path: '',   redirectTo: 'dash-board', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
