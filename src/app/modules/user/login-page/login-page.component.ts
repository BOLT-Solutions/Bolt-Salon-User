import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/CustomerService';
import { Customer } from '../../../models/Customer';
import { ApiResponse } from '../../../models/http-models/api-response';
import { Router } from '@angular/router';
import { AddCustomerModel } from '../../../models/AddCustomerModel';
import { SharedService } from '../../../services/shared.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Keyboard from "simple-keyboard";
import arabiclayout from "simple-keyboard-layouts/build/layouts/arabic";
import englishlayout from "simple-keyboard-layouts/build/layouts/english";
import { AdminLoginModel } from '../../../models/AdminLoginModel';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  dir: string
  lang: string
  head1: string
  head2: string
  UserName: string
  errorLog: string
  NameError: string
  animFlag: boolean
  mobileNumber: string
  ConfirmLabel: string
  newCustomer: Customer
  placeholderpassword: string;
  placeholderMail: string
  placeholderName: string
  NamePatternError: string
  PhoneNumberError: string
  MailPatternError: string
  display: boolean = false
  LoginFailedPopUpText: string
  placeholderPhoneNumber: string
  RegisterFailedPopUpText: string
  PhoneNumberPatternError: string
  passwordType: string = "password";
  loginErrorText: string;
  loginErrorBoolean: boolean = false;
  email: string ='';
  password: string;
  //
  keyboard_name: Keyboard;
  keyboard_pwd: Keyboard; 
  root: any;
 
  
  english = {
    default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", "q w e r t y u i o p", "a s d f g h j k l ", "{shift} z x c v b n m {shift}", ".com @ {space}"],
    shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "Q W E R T Y U I O P", "A S D F G H J K L ", "{shift} Z X C V B N M {shift}", ".com @ {space}"]
  };
 
  CustomerRegister: FormGroup = new FormGroup({

    mail: new FormControl(this.email, [Validators.email]),
    password: new FormControl('')
    

  });
  validat
 
  constructor(private router: Router, private customerService: CustomerService, private SharedData: SharedService)
  {
   
  }
 

  get f() {
    return this.CustomerRegister.controls;
  }

  ngOnInit(): void
  {


    this.SharedData.currentLoginRefresh.subscribe(res => {
      if (res == true) {
        window.location.reload();
      }
      else {
        //do nothing.
      }
    });

    this.lang = 'en';
    if (this.lang === 'ar') {

      this.dir = 'rtl'
      this.head1 = 'مرحبا'
      this.head2 =   "تسجيل دخول "
      this.ConfirmLabel = 'التأكيد'
      this.placeholderName = "الاسم"
      this.NameError = "برجاء ادخال الاسم"
      this.NamePatternError = "ادخل حروف فقط"
      this.placeholderpassword = "الرقم السري"
      this.MailPatternError = 'برجاء ادخال ايميل صحيح'
      this.placeholderMail = 'البريد الإلكتروني (اختياري)'
      this.PhoneNumberError = "برجاء ادخال رقم الهاتف المسجل"
      this.PhoneNumberPatternError = "برجاء ادخال رقم هاتف صحيح"
      this.RegisterFailedPopUpText = "فشل في تسجيل الحساب , برجاء اعادة المحاولة"
      this.LoginFailedPopUpText = " ! فشل تسجيل الدخول , يرجى التحقق من رقم الهاتف الذي أدخلته"
    }
    else if (this.lang === 'en') {

      this.dir = 'ltr'
      this.head1 = 'Welcome'
      this.ConfirmLabel = 'Confirm'
      this.placeholderName = "Name"
      this.head2 = 'Please Login'
      this.placeholderMail = "Email"
      this.NameError = "Please enter your name"
      this.placeholderpassword = "Password"
      this.PhoneNumberError = "Please enter your number"
      this.MailPatternError = 'Please enter a valid email address'
      this.PhoneNumberPatternError = "Please enter a valid mobile number"
      this.NamePatternError = "Only arabic and english letters are allowed"
      this.RegisterFailedPopUpText = "Registration failed , this number is already registered"
      this.LoginFailedPopUpText = "Login failed , kindly check the phone number you have entered !"
      this.loginErrorText = 'Login failed, Please check your email or password !';

    }
   
  }

  ngAfterViewInit() {
    // clear 
    let kayboard1 , keyboard2
     document.getElementById("keyboard").classList.add('simple-keyboard')
     document.getElementById("keyboard2").classList.add('simple-keyboard2')
    kayboard1 = document.getElementById("keyboard1");
    keyboard2 = document.getElementById("keyboard2"); 
   
    this.keybordInit('name');
    this.keybordInit('pwd');
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
    
    this.root = document.getElementsByClassName('hg-button-bksp');
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }
  }
  


  displayFalse($event) {
    this.display = false;
    this.onInputChange(event);
  }


  onChange = (input: string) => {
    this.CustomerRegister.controls.mail.setValue(this.email)
    

    let activeElement = document.activeElement.id
    
    if (activeElement == "t1")
    {
      
      
      this.email = input;
      this.CustomerRegister.controls.mail.setValue(this.email)
      //if (!document.getElementsByClassName('simple-keyboard')[0].classList.contains('hide-keyboard'))
      //{
      //  document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
      //}


    }
    else if (activeElement == "t2")
    {
      //if (!document.getElementsByClassName('simple-keyboard2')[0].classList.contains('hide-keyboard'))
      //{
      //  document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
      //}
      this.password = input;
      
    }

    this.CustomerRegister.controls.mail.setValue(this.email)
     
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
    let activeElement = document.activeElement.id
    console.log(event.target.value)
    if (activeElement == "t1") {

      this.keyboard_name.setInput(event.target.value);
    }
    else if (activeElement == "t2") {
      this.keyboard_pwd.setInput(event.target.value);
    }
     
  };

  handleShift = () => {
    let activeElement = document.activeElement.id
    console.log(activeElement)

    if (activeElement=="t1") {
      let currentLayout = this.keyboard_name.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard_name.setOptions({
        layoutName: shiftToggle
      });
    }
    else if (activeElement=="t2") {
      let currentLayout = this.keyboard_pwd.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.keyboard_pwd.setOptions({
        layoutName: shiftToggle
      });


    }


    document.getElementsByClassName('simple-keyboard')[0].classList.add('key')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('key')
    this.root = document.getElementsByClassName('hg-button-bksp');
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }

  };
  clickinput(mode: any)
  {
    document.getElementById('msform').classList.add('swipeUp');
    document.getElementById('logoShrink').classList.add('swipelogo');
    let kayboard1 = document.getElementsByClassName('simple-keyboard')
    let  keyboard2 = document.getElementsByClassName('simple-keyboard2')
    console.log(kayboard1, " keyBoard1 classes  ")
    console.log(keyboard2, " keyboard2 classes ")


    if (mode == 'name') {
      document.getElementsByClassName('simple-keyboard')[0].classList.remove('hide-keyboard')
      document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
     
     document.getElementsByClassName('simple-keyboard')[0].classList.add('key')

    }
    else if (mode == 'pwd')
    {
     document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard2')[0].classList.remove('hide-keyboard')
      document.getElementsByClassName('simple-keyboard2')[0].classList.add('key')
    }
     
    this.root = document.getElementsByClassName('hg-button-bksp');
    console.log(this.root)
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }
     
  }

  keybordInit(config: string) {
 
     if (config === 'name') {

       this.keyboard_name = new Keyboard(".simple-keyboard", {
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        theme: "simple-keyboard hg-theme-default hg-layout-default",
        layout: this.english,
        preventMouseDownDefault: true,
       });
    

    }
    
     else if (config === 'pwd') {
       this.keyboard_pwd = new Keyboard(".simple-keyboard2", {
        onChange: input => this.onChange(input),
        onKeyPress: button => this.onKeyPress(button),
        theme: "simple-keyboard hg-theme-default hg-layout-default",
        layout: this.english,
        preventMouseDownDefault: true,

      });
    }
    
  }




  loginUser() {
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
    const adminLogin: AdminLoginModel = {
      email: this.email,
      password: this.password
    }
    this.customerService.adminLogin(adminLogin).subscribe(result => {
      if (result.succeeded) {
        localStorage.setItem('adminPassword', this.password);
        console.log("your password", this.password);
        this.SharedData.setLoginRefresh(true)
        this.router.navigate(["Welcome/userWelcomePage"]);
      }
    }
      , error => {
        const err: ApiResponse = error.error;
        console.log(err);
        this.loginErrorBoolean = true;

      });
    //document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
  ///  document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')

  }
  clickViewPassword(status) {

    if (status == true) {
      this.passwordType = 'text';
    }
    else {
      this.passwordType = 'password';
    }
  }
  clickhidePassword(status) {
    if (status == true) {
      this.passwordType = 'text';
    }
    else {
      this.passwordType = 'password';
    }
  }

  hideInput()
  {
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
  }
}



