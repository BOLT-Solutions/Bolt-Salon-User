import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { CustomerLoginDTO } from '../../../models/CustomerLoginDTO';
import { LoginModel } from '../../../models/auth-models/login-customer';
import { Customer } from '../../../models/Customer';
import { CustomerService } from '../../../services/CustomerService';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../models/http-models/api-response';
import { SharedService } from '../../../services/shared.service';
import { Validators , FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { log } from 'util';
import Keyboard from "simple-keyboard";
import arabiclayout from "simple-keyboard-layouts/build/layouts/arabic";
import englishlayout from "simple-keyboard-layouts/build/layouts/english";
@Component({
  selector: 'app-existingcustomer',
  templateUrl: './existingcustomer.component.html',
  styleUrls: ['./existingcustomer.component.scss'],


})
export class ExistingcustomerComponent implements OnInit {

  dir: string;
  lang: string;
  head1: string;
  head2: string;
  animFlag: boolean
  errorLog: string;
  Customer: Customer;
  phoneNumber: string;
  ConfirmLabel: string;
  PhoneNumberError: string;
  LoginFailedPopUpText: string;
  placeholderPhoneNumber: string;
  PhoneNumberPatternError: string;
 
 
  keyboard: Keyboard;
  root: any; 
  value = "";

 existingCustomerLogin: FormGroup = new FormGroup({
   phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")]),
  });


  display: boolean = false;
  displayWarning: boolean = false;
  popUpText: string;

  constructor(private router: Router, private CustomerService: CustomerService, private fb: FormBuilder, private sharedData: SharedService) {
  }


  get f() {
   // console.log(this.existingCustomerLogin.controls.phoneNumber)

    return this.existingCustomerLogin.controls;
  }

  ngOnInit(): void {

  
    this.lang = localStorage.getItem('Language')
    this.animFlag = false;
    

    if (this.lang === 'ar') {
      this.dir = 'rtl';
      this.head1 = 'مرحبا';
      this.head2 = 'قم بتسجيل الدخول للمتابعة';
       this.ConfirmLabel = 'التأكيد';
      this.placeholderPhoneNumber="رقم الهاتف"
      this.PhoneNumberError = "برجاء ادخال رقم الهاتف المسجل";
      this.PhoneNumberPatternError = "برجاء ادخال رقم هاتف صحيح";
      this.LoginFailedPopUpText = " ! فشل تسجيل الدخول , يرجى التحقق من رقم الهاتف الذي أدخلته";
    }
    else if (this.lang === 'en') {
      this.dir = 'ltr';
      this.head1 = 'Welcome';
      this.ConfirmLabel = 'Confirm';
      this.head2 = 'Login to proceed';
      this.placeholderPhoneNumber = "Phone number"
      this.PhoneNumberError = "Kindly enter your phone number";
      this.PhoneNumberPatternError = "Please enter a valid phone number";
      this.LoginFailedPopUpText = "Login failed , kindly check the phone number you have entered !";

    }
    document.getElementById("keyboard").classList.add('simple-keyboard');
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      preventMouseDownDefault: true,
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {bksp}"],
        shift: ["! / #", "$ % ^", "& * (", "{bksp}"]
      },


      theme: "hg-theme-default hg-layout-numeric numeric-theme"
    });
    document.getElementById("keyboard").classList.add('hide-keyboard');


    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
    //this.sharedData.setLoginRefresh(false)
    

  }

  customerLogin() {

    const postedData = this.existingCustomerLogin.value;

    const customerLogin: CustomerLoginDTO = {
      mobileNumber: postedData.phoneNumber
    }

    this.CustomerService.CustomerLogin(customerLogin).subscribe(response => {
      if (response.succeeded) {

        var id = response.data.id;

        localStorage.setItem('CustomerId', id.toString());

        this.router.navigate(["Login/BarberSelection"]);
      }
    }, error => {
        const err: ApiResponse = error.error;
        this.errorLog = err.errors[0];
        console.log(this.errorLog);
        this.display = true;
       
    });
  }

  displayFalse(event) {
    this.display = false;
    this.onInputChange(event);
    
    
  }
  addClassAnimation()
  {
    if (this.animFlag) {
     this.removeClassAnimation(); 
      return;
    }
    else {
      this.animFlag = true; 
    document.getElementById('msform').classList.add('swipeUp1');

    document.getElementById('logoShrink').classList.add('swipelogo1');
    }
  }
  removeClassAnimation()
  {
    console.log("flag " + this.animFlag);
    if (this.animFlag) {
      document.getElementById('msform').classList.remove('swipeUp1');

      document.getElementById('logoShrink').classList.remove('swipelogo1');
      this.animFlag = !this.animFlag; 
     
    }
    else
    {
        this.animFlag = !this.animFlag;
      return;
    }
  }


  // keyboard function
 
  onChange = (input: string) => {
    this.value = input;
    this.existingCustomerLogin.controls.phoneNumber.setValue(this.value) 
    console.log("Input changed", input);
    this.existingCustomerLogin.controls.phoneNumber.setValue(this.value) 
   };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.existingCustomerLogin.controls.phoneNumber.setValue(this.value) 

    this.keyboard.setInput(event.target.value);

  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };

  clickinput()
  {
    //this.display = false;
    this.existingCustomerLogin.controls.phoneNumber.setValue(this.value) 

    document.getElementById("keyboard").classList.remove('hide-keyboard');
    this.root = document.getElementsByClassName('hg-button-bksp');
    this.root = this.root[0].innerHTML = '<i class="fas fa-backspace" > </i>';
   
  }

  hideInput()
  {
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
   
  }

 
}


