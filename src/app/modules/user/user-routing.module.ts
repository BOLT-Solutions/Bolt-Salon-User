import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserwelcomepageComponent } from './userwelcomepage/userwelcomepage.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: 'userWelcomePage', component: UserwelcomepageComponent },
  { path: '', component: LoginPageComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
