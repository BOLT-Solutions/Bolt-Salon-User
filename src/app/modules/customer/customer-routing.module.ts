import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewcustomerComponent } from '../customer/newcustomer/newcustomer.component';
import { ExistingcustomerComponent } from '../customer/existingcustomer/existingcustomer.component';
import { ChooseBarberComponent } from '../client/choose-barber/choose-barber.component';
import { ChooseStyleAndConfirmComponent } from '../client/choose-style-and-confirm/choose-style-and-confirm.component';

const routes: Routes = [
  { path: 'NewCustomer', component: NewcustomerComponent },
  { path: 'ExistingCustomer', component: ExistingcustomerComponent },
  { path: '', redirectTo: 'ExistingCustomer', pathMatch: 'full' },
  { path: 'BarberSelection', component: ChooseBarberComponent },
  { path: 'ServiceSelection', component: ChooseStyleAndConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
