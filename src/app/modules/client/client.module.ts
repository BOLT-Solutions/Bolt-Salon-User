import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ChooseBarberComponent } from './choose-barber/choose-barber.component';
import { ChooseStyleAndConfirmComponent } from './choose-style-and-confirm/choose-style-and-confirm.component';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RecieptComponent } from './reciept/reciept.component';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  declarations: [ChooseBarberComponent, ChooseStyleAndConfirmComponent, RecieptComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    TableModule,
    FormsModule,
    ListboxModule,
    ButtonModule,
    MultiSelectModule,
    ModalModule.forRoot(),
    CarouselModule
  ]
})
export class ClientModule { }
