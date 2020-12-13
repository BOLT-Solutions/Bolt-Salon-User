import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../services/shared.service';
import { CustomerService } from '../../../services/CustomerService';
import { OrderServiceService } from '../../../services/OrderService';
import { OrderService } from '../../../models/OrderService';
import { orderToCreate } from '../../../models/orderToCreate';
import { Router } from '@angular/router';
import { Customer } from '../../../models/Customer';
import { PromoCodeService } from '../../../services/PromoCodeService';
import Keyboard from "simple-keyboard";
import englishlayout from "simple-keyboard-layouts/build/layouts/english";
import { Console } from 'console';
@Component({
  selector: 'app-reciept',
  templateUrl: './reciept.component.html',
  styleUrls: ['./reciept.component.scss']
})
export class RecieptComponent implements OnInit {

  constructor(private router: Router, private sharedData: SharedService, private OrdersService: OrderServiceService, private CustomerService: CustomerService, private PromoCodeService: PromoCodeService) { }
  promoCode: string;
  promoCodeResponse: string;
  promoCodeError: string;
  discountRate = 0;
  isValid: boolean;
  reciept: boolean;

  egp: string
  dir: string;
  mins: string
  hours: string
  lang: string;
  head1: string;
  head2: string;
  head3: string;
  head4: string;
  head5: string;
  head6: string;
  head7: string;
  head8: string
  customerName: string;
  align: string;
  barberQueueId: number;
  customerId: number;
  CurrentCustomer: Customer;
  barberName: string;
  WaitingTime: number;
  WaitingTimeInMinutes: number;
  WaitingTimeInHours: number;
  orderTotalTime: number = 0;
  orderTotal: number = 0;
  orderTotalAfterDiscount: number = 0;
  getLanguageBaberName: string;
  orderServices: OrderService[] = [];
  isLoading: boolean = false;
  confirmbtnpath = "confirm-clicked.png";
  btn: any;
  txtstyle: any;
  warnmsg: any;
  IsGuest: boolean;
  IsBarberBusy: boolean;
  guestmsg: any;
  barberStatus: string;
  applyBtn = 'ApplyEn.png';
  ConfirmationDiv: boolean = false;
  recieptDiv: boolean = true;
  keyboard_promo: Keyboard;
  orderTotalTimeinHrs;
  root: any
  currentDate: Date

  english = {
    default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", "q w e r t y u i o p", "a s d f g h j k l ", "{shift} z x c v b n m {shift}", ".com @ {space}"],
    shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "Q W E R T Y U I O P", "A S D F G H J K L ", "{shift} Z X C V B N M {shift}", ".com @ {space}"]
  };

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }

    document.getElementById("keyboard").classList.add('simple-keyboard')
    this.WaitingTime = Number(localStorage.getItem('WaitingTime'));
    this.WaitingTimeInMinutes = Number(localStorage.getItem('WaitingTimeInMinutes'));
    this.WaitingTimeInHours = Number(localStorage.getItem('WaitingTimeInHours'));
    this.lang = localStorage.getItem('Language')
    console.log("waiting", this.WaitingTime)

    if (this.lang === 'ar') {
      this.dir = 'rtl';
      this.mins = "دقيقة"
      this.hours = "ساعات "
      this.egp = "جنية"
      this.head4 = ' الاجمالي قبل الخصم';
      this.head2 = 'اسم الحلاق';
      this.align = 'alignright';
      this.head1 = 'شكرا لوقتك';
      this.head3 = 'وقت الانتظار';
      this.head5 = ' إجمالي وقت الخدمة';
      this.head6 = ' نسبة الخصم';
      this.head7 = ' الاجمالي';
      this.head8 = ' كود الخصم';
      this.promoCodeError = 'الكود خاطىء'
      this.promoCodeResponse = "تم تفعيل الكود"
      this.getLanguageBaberName = 'ArabicRow';
      this.customerName = 'اسم العميل';
      this.confirmbtnpath = 'confirm-ar.png'
      this.btn = "btn-ar";
      this.txtstyle = "txtstyle-ar"
      this.warnmsg = "يرجى ملاحظة أنه إذا تأخرت أكثر من 10 دقيقة بعد وقت الانتظار ، فسيتم إلغاء طلبك تلقائيًا";
      this.guestmsg = "يرجى ترك رقم هاتفك عند مكتب الكاشير للاتصال بك عندما يحين دورك*";
      this.applyBtn = "ApplyAR.png";
    }
    else if (this.lang === 'en') {
      this.hours="hrs"
      this.dir = 'ltr';
      this.egp = "EGP"
      this.mins = "mins"
      this.head4 = 'Sub Total';
      this.head6 = 'Discount %';
      this.head7 = 'Total';
      this.head8 = "Promo code"
      this.align = 'alignleft';
      this.head2 = 'Barber name';
      this.head3 = 'Waiting time :';
      this.head5 = 'Total service time : ';
      this.head1 = 'Thank you for your time ';
      this.getLanguageBaberName = 'EnglishRow';
      this.promoCodeError = "Invalid code"
      this.promoCodeResponse = "valid code"
      this.customerName = 'Customer name';
      this.btn = "btn"
      this.txtstyle = "txtstyle"
      this.warnmsg = "Kindly be available at the shop 10 minutes before the time of your order or your order will be cancelled ."
      this.guestmsg = "*Kindly leave your phone number at the front desk incase we need to contact you  ."
      this.applyBtn = "ApplyEn.png";
      this.confirmbtnpath = "confirm.png";
    }

    this.barberName = localStorage.getItem('BarberName')

    this.barberStatus = localStorage.getItem('barberStatus');

    console.log(this.barberStatus);

    this.barberQueueId = Number(localStorage.getItem('BarberQueueId'))

    this.customerId = JSON.parse(localStorage.getItem("CustomerId"))
    console.log("customer id ", this.customerId.toString());
    this.orderServices = JSON.parse(localStorage.getItem("OrderServices"))

    for (let i = 0; i < this.orderServices.length; i++) {
      this.orderTotal += this.orderServices[i].price;
      this.orderTotalTime += this.orderServices[i].time;
    }
    this.orderTotalTimeinHrs = Math.floor(this.orderTotalTime / 60)
    this.orderTotalAfterDiscount = this.orderTotal

    this.CustomerService.GetCustomerById(this.customerId.toString()).subscribe(response => {

      this.CurrentCustomer = response.data;
      if (response.succeeded) {
        if (this.CurrentCustomer.name.includes("Guest") && this.barberStatus == "Busy") {
          this.IsGuest = true;
        }
        else {
          this.IsGuest = false;
        }

        if (this.barberStatus == "Busy") {
          this.IsBarberBusy = true;
        }
        else {
          this.IsBarberBusy = false;
        }

        console.log("barberBusy " + this.IsBarberBusy);
        console.log("Guest " + this.IsGuest);


      }
      console.log(this.CurrentCustomer);
      this.isLoading = true;
      console.log("current customer", this.CurrentCustomer);

    });

    console.log(this.orderTotalTime);


    this.keyboard_promo = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      preventMouseDownDefault: true,
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
        shift: ["! / #", "$ % ^", "& * (", "{bksp}"]
      },


      theme: "hg-theme-default hg-layout-numeric numeric-theme"
    });

    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
    this.currentDate = new Date()
  }

  applyPromoCode() {
    //let promo = document.getElementById('promoCode');
    this.PromoCodeService.ApplyPromoCode({ PromoCode: this.promoCode }).subscribe(response => {
      this.discountRate = response.data.discountRate
      console.log("responsive", this.discountRate)
      this.isValid = true
      this.orderTotalAfterDiscount = this.orderTotal - (this.discountRate * this.orderTotal / 100)
      document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')

    }, error => {
      this.isValid = false
      this.discountRate = 0
      this.orderTotalAfterDiscount = this.orderTotal

      console.log(error)

    });

  }

  endPopUp() {

    const orderToCreate: orderToCreate = {
      barberQueueId: this.barberQueueId,
      customerId: this.customerId,
      orderServices: this.orderServices,
      DiscountRate: this.discountRate,
    };
    
    console.log("order to create", orderToCreate);


    this.OrdersService.addOrder(orderToCreate).subscribe(response => {
      console.log(response);
      localStorage.removeItem('BarberbName');
      localStorage.removeItem('BarberQueueId');
      localStorage.removeItem('CustomerId');
      localStorage.removeItem('OrderServices');
      localStorage.removeItem('BarberId');

      if (this.lang == 'ar') {
        this.confirmbtnpath = "confirm-ar-clicked.png";
      }
      else if (this.lang == 'en') {
        this.confirmbtnpath = "confirm-clicked.png";
      }

      this.router.navigate(["../../Welcome/userWelcomePage"]);
      localStorage.removeItem('Barber');
      localStorage.removeItem('OrderServices');

    }, error => {
      console.log(error)
    });


    this.printRecipt()

  }

  finalizeOrder() {

    this.recieptDiv = false;
    this.ConfirmationDiv = true;
 

    this.reciept = true;

  }

  onChange = (input: string) => {

    this.promoCode = input;
    console.log("Input changed", input.length);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {

    console.log(event.target.value)
    this.keyboard_promo.setInput(event.target.value);

  };

  handleShift = () => {


    let currentLayout = this.keyboard_promo.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard_promo.setOptions({
      layoutName: shiftToggle
    });

    document.getElementsByClassName('simple-keyboard')[0].classList.add('key')
    this.root = document.getElementsByClassName('hg-button-bksp');
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }

  }




  clickinput() {

    document.getElementsByClassName('simple-keyboard')[0].classList.remove('hide-keyboard')
    document.getElementsByClassName('simple-keyboard')[0].classList.add('key')

    this.root = document.getElementsByClassName('hg-button-bksp');
    console.log(this.root)
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }

  }


  hideInput() {
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')

    this.root = document.getElementsByClassName('hg-button-bksp');
    console.log(this.root)
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }

  }
  printRecipt() {


    let printContents, popupWin;

    printContents = document.getElementById('receiptPrint').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
      
          </style>
        </head>
    <body onload="window.print();window.close()">
${printContents}</body>
      </html>`


    );
    popupWin.document.close();
    //window.location.reload();

  }
}
