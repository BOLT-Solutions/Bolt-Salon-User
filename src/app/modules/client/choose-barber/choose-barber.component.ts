import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barber } from '../../../models/barber';
import { BarberProfilePhoto } from '../../../models/BarberProfilePhoto';
import { SelectItem } from 'primeng/api/selectitem';
import { DOCUMENT } from '@angular/common';
import { BarberService } from './../../../services/barber-service';
import { SharedService } from '../../../services/shared.service';
import { Subscriber } from 'rxjs';
import { QueueTimeHandlerModelDTO } from '../../../models/QueueTimeHandlerModelDTO';
import { get } from 'https';

@Component({
  selector: 'app-choose-barber',
  templateUrl: './choose-barber.component.html',
  styleUrls: ['./choose-barber.component.scss']
})
export class ChooseBarberComponent implements OnInit {

  dir: string;
  name: string;
  image: string;
  status: string;
  tablelang: string;
  waitingtime: string; 
  totalAmount: number;
  chooseBarber: string;
  BarberToHighlight: Barber;
  chosenBarber: Array<Barber> = new Array<Barber>();
  // lang vairables
  showNext = false;
  add: string;
  egp: string
  lang: string
  date: string
  edit: string
  view: string;
  mins: string
  hours: string
  Busy: string
  close: string
  email: string;
  title: string;
  float: string;
  comment: string
  confirm: string;
  timeSpend: string
  Available: string
  submitBtn: string
  nameError: string
  barberName: string
  areYouSure: string
  mobileNumber: string;
  customerName: string;
  titleDetails: string;
  selectedBarber: Barber;
  PhoneNumberError: string
  PhoneNumberPatternError: string
  waitingTime: QueueTimeHandlerModelDTO[];
  AvailableBarbers: Array<Barber> = new Array<Barber>();
  barberBorder: any;
  constructor(private router: Router, private barberService: BarberService, private sharedData: SharedService) {

  }

  ngOnInit(): void {


    localStorage.removeItem('BarberbName');
    localStorage.removeItem('BarberQueueId');
    localStorage.removeItem('OrderServices');
    localStorage.removeItem('BarberId');
    localStorage.removeItem('WaitingTime');
    localStorage.removeItem('WaitingTimeInMinutes');
    localStorage.removeItem('WaitingTimeInHours');

   
 
    this.lang = localStorage.getItem('Language')

    if (this.lang === 'ar') {

      this.dir = 'rtl'
      this.Busy = 'مشغول'
      this.egp = "جنية"
      this.name = 'الاسم'
      this.mins = "دق"
      this.hours = "س"
      this.edit = "تعديل"
      this.float = "right"
      this.Available='متاح'
      this.date = "التاريخ"
      this.image = 'الصورة'
      this.email = "الايميل"
      this.status = 'الحالة'
      this.confirm = "تاكيد"
      this.add = "اضافة عميل"
      this.comment = "التعليق"
      this.view = "عرض التفاصيل"
      this.tablelang = 'table-ar'
      this.mobileNumber = "الرقم"
      this.titleDetails = "التفاصيل"
      this.title = "ادارة التقيمات"
      this.barberName = "اسم الحلاق"
      this.customerName = "اسم الزبون"
      this.chooseBarber = 'اختر حلاق'
      this.nameError = "برجاء ادخال الاسم"
      this.waitingtime = 'الباقي من الوقت'
      this.timeSpend = "إجمالي الوقت المنقضي"
      this.PhoneNumberError = "برجاء ادخال رقم الهاتف"
      this.areYouSure = "هل متاكد من هذة التغييرات ؟"
      this.PhoneNumberPatternError = "برجاء ادخال رقم صحيح"

    }

    else if (this.lang === 'en') {
      this.dir = "ltr"
      this.egp = "EGP"
      this.mins = "mins"
      this.hours = "hrs"
      this.date = "Date"
      this.name = 'Name'
      this.view = "view"
      this.Busy = 'Busy'
      this.edit = "Edit"
      this.float = "left"
      this.email = "Email"
      this.image = 'Image'
      this.status = 'Status'
      this.comment = "comment"
      this.confirm = "Confirm"
      this.add = "Add customer"
      this.tablelang = 'table-en'
      this.Available = 'Available'
      this.titleDetails = "Details"
      this.barberName = "Barber name"
      this.waitingtime = 'Waiting time'
      this.title = "Feedback Managment"
      this.chooseBarber = 'Choose Barber'
      this.customerName = "Customer name"
      this.mobileNumber = "Mobile number"
      this.timeSpend = "Total time spend"
      this.nameError = "Name is required."
      this.PhoneNumberError = "Phone number is required."
      this.areYouSure = "Are you sure to confirm Changes ?"
      this.PhoneNumberPatternError = "please enter correct number"
    }


    this.barberService.setBarberQueueWaitingTime().subscribe(res => {
    
      console.log("Waiting", res);

        this.barberService.getAvailableBarbers().subscribe(res => {
          this.AvailableBarbers = res.data;
          console.log(this.AvailableBarbers)
          this.BarberToHighlight = JSON.parse(localStorage.getItem("Barber"));
          if (this.BarberToHighlight) {
            this.showNext = true;
            this.selectedBarber = this.BarberToHighlight
            for (let i = 0; i < this.AvailableBarbers.length; i++) {
              if (this.AvailableBarbers[i].id == this.BarberToHighlight.id) {
                console.log("done")

                this.AvailableBarbers[i].styleClasses = "selected"


              }
            }
          }
        for (let i = 0; i < this.AvailableBarbers.length; i++) {

          this.AvailableBarbers[i].barberQueue.queueWaitingTimeInHours = Math.floor(this.AvailableBarbers[i].barberQueue.queueWaitingTime / 60);
          this.AvailableBarbers[i].barberQueue.queueWaitingTimeInMinutes = this.AvailableBarbers[i].barberQueue.queueWaitingTime % 60;

          if (this.AvailableBarbers[i].barberQueue.queueWaitingTime ==0  && this.lang == 'ar') {
            this.AvailableBarbers[i].status = 'متاح';
          }
          else if (this.AvailableBarbers[i].barberQueue.queueWaitingTime > 0 && this.lang == 'ar') {
            this.AvailableBarbers[i].status = 'مشغول';
          }
         else if (this.AvailableBarbers[i].barberQueue.queueWaitingTime == 0 && this.lang == 'en') {
            this.AvailableBarbers[i].status = 'Available';
          }
          else if (this.AvailableBarbers[i].barberQueue.queueWaitingTime > 0 && this.lang == 'en') {
            this.AvailableBarbers[i].status = 'Busy';
          }


        }


      });

    });

  }

  selectBarber(item) {

    const element = document.getElementById(item.id);

   
    if (!element.classList.contains("selected") ) {

      for (let i = 0; i < this.AvailableBarbers.length; i++) {
        let currentele=document.getElementById(this.AvailableBarbers[i].id.toString())
          currentele.classList.remove("selected");
        
      }
        element.classList.add("selected");
     
      this.selectedBarber = item;
      this.showNext = true;
    }

    else if (element.classList.contains("selected")) {
      element.classList.remove("selected");
      this.showNext = false;

    }

   
   
  }

  SetChosenBarber(event, id) {
    this.selectedBarber = this.AvailableBarbers.find(b => b.id == id);
    this.showNext = true;
  }

  RemoveBarberSelection(event) {
    this.selectedBarber = null;
    this.showNext = false;
  }

  NavigateToServices() {
    

       localStorage.setItem('Barber', JSON.stringify(this.selectedBarber));

       localStorage.setItem('BarberQueueId', this.selectedBarber.barberQueue.id.toString());

    if (this.selectedBarber.barberQueue.queueWaitingTime > 0) {
      localStorage.setItem('barberStatus', 'Busy');
    }
    else {
      localStorage.setItem('barberStatus', 'Available');
    }
    
    localStorage.setItem('WaitingTime', this.selectedBarber.barberQueue.queueWaitingTime.toString());
    localStorage.setItem('WaitingTimeInMinutes', this.selectedBarber.barberQueue.queueWaitingTimeInMinutes.toString());
    localStorage.setItem('WaitingTimeInHours', this.selectedBarber.barberQueue.queueWaitingTimeInHours.toString());

      this.lang == 'ar' &&
      localStorage.setItem('BarberName', this.selectedBarber.nameAR);
    //  localStorage.setItem('BarberId', this.selectedBarber.id.toString());

       this.lang == 'en'&&
       localStorage.setItem('BarberName', this.selectedBarber.nameEN);

       this.router.navigateByUrl("Selection/ServiceSelection");
    }

  RouteToPage(Page: any) {
    if (Page == "Services") {

      this.router.navigateByUrl("client/chooseStyle");
    }
  }


}
