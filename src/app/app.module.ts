import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule,routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from '../app/app-layout/app-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';

import {CarouselModule} from 'primeng/carousel';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { MatButtonModule } from '@angular/material/button';

import { MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent
    
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppLayoutModule, FormsModule,
    CarouselModule, ButtonModule, ToastModule, MatButtonModule, MatKeyboardModule, DialogModule,
    RouterModule.forRoot(routes, { useHash: true }),



  ],
  providers: [SharedService],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
