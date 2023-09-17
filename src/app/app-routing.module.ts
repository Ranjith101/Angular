import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { BmiComponent } from './bmi/bmi.component';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: BmiComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
