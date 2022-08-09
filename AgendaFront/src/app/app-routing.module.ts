import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevOpsTesteComponent } from './dev-ops-teste/dev-ops-teste.component';

const routes: Routes = [
  {path: 'teste', component: DevOpsTesteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
