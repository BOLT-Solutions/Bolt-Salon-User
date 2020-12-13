import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChooseStyleAndConfirmComponent } from './choose-style-and-confirm/choose-style-and-confirm.component';
import { ChooseBarberComponent } from './choose-barber/choose-barber.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecieptComponent } from './reciept/reciept.component';


const routes: Routes = [
  { path: 'BarberSelection', component: ChooseBarberComponent },
  { path: 'ServiceSelection', component: ChooseStyleAndConfirmComponent },
  { path: 'receipt', component: RecieptComponent },
  { path: '', redirectTo: 'BarberSelection', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ModalModule.forRoot()
  ],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
