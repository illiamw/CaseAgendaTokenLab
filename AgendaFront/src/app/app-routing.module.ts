import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './public/create/create.component';
import { LoginComponent } from './public/login/login.component';

const routes: Routes = [
  { path: '',   redirectTo: 'dash-board', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'create', component: CreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
