import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SelectItem } from 'primeng/api/selectitem';
import { Router } from '@angular/router';
import { ServiceService } from './../../../services/service-service ';
import { SharedService } from '../../../services/shared.service';
import { Order } from '../../../models/Order';
import { OrderService } from '../../../models/OrderService';
import { Service } from '../../../models/Service';
import { Local } from 'protractor/built/driverProviders';
import { element } from 'protractor';

@Component({
  selector: 'app-choose-style-and-confirm',
  templateUrl: './choose-style-and-confirm.component.html',
  styleUrls: ['./choose-style-and-confirm.component.scss']
})
export class ChooseStyleAndConfirmComponent implements OnInit{
  order: Order;
  showNext = false;
  showCount: number = 0;
  chooseService: string;
  selected: object[] = [];
  OrderServices: OrderService[] = [];
  OrderServicesToHighlight: OrderService[] = [];
  styleServices: Service[] = [];
  chosenServices: Service[] = [];
  //OrderServicesToHighlight: OrderService[] = [];
  image: string;
  ServiceName: string;
  price: string;
  time: string
  // lang vairables
  i: number = 0;
  j: number = 0;
  add: string
  dir: string
  egp: string
  edit: string
  hours: string
  mins: string
  view: string
  date: string
  lang: string
  email: string
  title: string
  float: string
  close: string
  comment: string
  confirm: string
  nameError: string
  timeSpend: string
  submitBtn: string
  areYouSure: string
  barberName: string
  customerName: string
  mobileNumber: string
  titleDetails: string
  PhoneNumberError: string
  PhoneNumberPatternError: string
  serviceTimeInHrs
  constructor(private router: Router, private Service: ServiceService, private sharedData: SharedService) { }

  ngOnInit(): void {
    this.lang = localStorage.getItem('Language')

    if (this.lang === 'ar') {
      this.image = "الصورة"
      this.ServiceName = "الخدمة"
      this.hours="ساعة"
      this.price = "السعر"
      this.time="الوقت"
      this.dir = "rtl"
      this.egp = "جنية"
      this.mins = "دقيقة"
      this.edit = "تعديل"
      this.float = "right"
      this.email = "البريد الإلكتروني"
      this.date = "التاريخ"
      this.confirm = "تاكيد"
      this.add = "اضافة عميل"
      this.comment = "التعليق"
      this.view = "عرض التفاصيل"
      this.mobileNumber = "الرقم"
      this.title = "ادارة التقيمات"
      this.barberName = "اسم الحلاق"
      this.titleDetails = "التفاصيل"
      this.customerName = "اسم الزبون"
      this.chooseService = 'اختر خدمه'
      this.nameError = "برجاء ادخال الاسم"
      this.timeSpend = "إجمالي الوقت المنقضي"
      this.areYouSure = "هل متاكد من هذة التغييرات ؟"
      this.PhoneNumberError = "برجاء ادخال رقم الهاتف"
      this.PhoneNumberPatternError = "برجاء ادخال رقم صحيح"
    }

    else if (this.lang === 'en') {
      this.image = "Image"
      this.ServiceName = "Service"
      this.price = "Price"
      this.time = "Time"
      this.dir = "ltr"
      this.hours="hrs"
      this.egp = "EGP"
      this.mins = "minutes"
      this.edit = "Edit"
      this.date = "Date"
      this.view = "view"
      this.float = "left"
      this.email = "Email"
      this.comment = "comment"
      this.confirm = "Confirm"
      this.add = "Add customer"
      this.titleDetails = "Details"
      this.barberName = "Barber name"
      this.title = "Feedback Managment"
      this.mobileNumber = "Mobile number"
      this.timeSpend = "Total time spend"
      this.customerName = "Customer name"
      this.nameError = "Name is required."
      this.chooseService = 'Choose Service'
      this.PhoneNumberError = "Phone number is required."
      this.areYouSure = "Are you sure to confirm Changes ?"
      this.PhoneNumberPatternError = "please enter correct number"
    }

    this.Service.getAllService().subscribe(res => {

      this.styleServices = res.data;
      
      this.OrderServicesToHighlight = JSON.parse(localStorage.getItem("OrderServices"));
      for (let j = 0; j < this.styleServices.length; j++) {
        this.styleServices[j].serviceTimeInHrs = Math.floor(this.styleServices[j].time / 60);
        console.log(this.styleServices[j].serviceTimeInHrs)
      }
      if (this.OrderServicesToHighlight)

      for (let i = 0; i < this.OrderServicesToHighlight.length; i++) {

        for (let j = 0; j < this.styleServices.length; j++) {
          if (this.OrderServicesToHighlight[i].serviceId == this.styleServices[j].id) {
            this.styleServices[j].styleClasses = "selected";
            this.chosenServices.push(this.styleServices[j]);
            this.showCount++;

            if (this.showNext == false) {
              this.showNext = true;
            }

          }

        }
      }

    });

}

  RouteToPage(Page: any) {
    if (Page == "Services") {
      this.router.navigateByUrl("client/chooseStyle");
    }
  }

  selectServices(item) {

    const element = document.getElementById(item.id);

    if (!element.classList.contains("selected")) {

      this.showCount++;

      element.classList.add("selected");

      this.chosenServices.push(item);

      this.showNext = true;

    }

    else if (element.classList.contains("selected")) {

      this.showCount--;

      element.classList.remove("selected");

      this.deleteRow(item.id);
    }

    if (this.showCount == 0) {
      this.showNext = false;
    
    }
    console.log(this.chosenServices)
  }

  deleteRow(id) {

    for (let i = 0; i < this.chosenServices.length; ++i) {
      if (this.chosenServices[i].id == id) {
        this.chosenServices.splice(i, 1);
      }
    }

  }

  createOrderServices() {

    for (let i = 0; i < this.chosenServices.length; ++i) {

      this.OrderServices.push( {
      nameAR :this.chosenServices[i].nameAR,
      nameEN : this.chosenServices[i].nameEN,
      serviceId : this.chosenServices[i].id,
      price : this.chosenServices[i].price,
      time: this.chosenServices[i].time,
      isConfirmed: false
      })
    }
    
    localStorage.setItem("OrderServices", JSON.stringify(this.OrderServices))




  }

}

  

