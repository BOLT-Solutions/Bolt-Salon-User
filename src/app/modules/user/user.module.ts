import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserwelcomepageComponent } from './userwelcomepage/userwelcomepage.component';
import { DropdownModule } from 'primeng/dropdown';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [UserwelcomepageComponent, LoginPageComponent],
  imports: [
    CommonModule,
    UserRoutingModule, DropdownModule, FormsModule, ReactiveFormsModule, DialogModule
  ]

 
})
export class UserModule { }
