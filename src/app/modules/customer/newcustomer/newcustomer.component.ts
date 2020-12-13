import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Keyboard from "simple-keyboard";
import { AddCustomerModel } from '../../../models/AddCustomerModel';
import { Customer } from '../../../models/Customer';
import { ApiResponse } from '../../../models/http-models/api-response';
import { CustomerService } from '../../../services/CustomerService';
import { SharedService } from '../../../services/shared.service';
@Component({
  selector: 'app-newcustomer',
  templateUrl: './newcustomer.component.html',
  styleUrls: ['./newcustomer.component.scss']
})
export class NewcustomerComponent implements OnInit {

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
  switchMode: string

  Keyboard_name_ar: Keyboard;
  Keyboard_name_en: Keyboard;
  Keyboard_numbers: Keyboard;
  keyboard_mail: Keyboard;
  tabstate: any = 0; 
  tabs:any

  NameMinLengthPatternError: string;
  NameMaxLengthPatternError: string;


  root: any;
  numberValue: any = null;
  nameValue: any = null;
  mailValue: any = null;
  arabic_name =
    {
      default: ["ذ 1 2 3 4 5 6 7 8 9 0 {bksp}", "{tab} ض ص ث ق ف غ ع ه خ ح ج د", "ش س ي ب ل ا ت ن م ك ط", "ئ ء ؤ ر لا ى ة و ز ظ", ".com @ {space} {enter}"],
  };
  arabic = {
    default: ["ذ 1 2 3 4 5 6 7 8 9 0 {bksp}", "{tab} ض ص ث ق ف غ ع ه خ ح ج د", "ش س ي ب ل ا ت ن م ك ط", "ئ ء ؤ ر لا ى ة و ز ظ", ".com @ {space}"],
    
  };
  english_name = {
    default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", " {tab} q w e r t y u i o p", "a s d f g h j k l ", "{shift} z x c v b n m {shift}", ".com @ {space} {enter}"],
    shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "{tab} Q W E R T Y U I O P", "A S D F G H J K L  ", "{shift} Z X C V B N M {shift}", ".com @ {space} {enter}"]
  };
  english = {
    default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", "  q w e r t y u i o p", "a s d f g h j k l", "{shift} z x c v b n m {shift}", ".com @ {space}"],
    shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "  Q W E R T Y U I O P", "A S D F G H J K L ", "{shift} Z X C V B N M {shift}", ".com @ {space}"]
  };
  nameTabFlag: boolean = false;
  numberTabFlag: boolean = false;
  CustomerRegister: FormGroup = new FormGroup({
    phoneNumber: new FormControl(this.numberValue, [Validators.required, Validators.pattern("^([0]{1}?[1]{1}?[0-2-5]{1}?[0-9]{8})$")]),
    name: new FormControl(this.nameValue, [Validators.minLength(3), Validators.maxLength(20), Validators.required, Validators.pattern("^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-,]+(\s{0,1}\[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFa-zA-Z-, ])*$")]),
    mail: new FormControl(this.mailValue, [Validators.email]),
    
  });
  constructor(private router: Router, private customerService: CustomerService, private SharedData: SharedService) { }

  get f()
  {
    return this.CustomerRegister.controls;
  }

  ngOnInit(): void {
    this.lang = localStorage.getItem('Language')
   
    this.keybordInit(); 
    if (this.lang === 'ar') {
   
      this.dir = 'rtl'
      this.head1 = 'مرحبا'
      this.head2 = 'انشئ حساب '
      this.ConfirmLabel = 'التأكيد'
      this.placeholderName = "الاسم"
      this.NameError = "برجاء ادخال الاسم"
      this.NamePatternError = "ادخل حروف فقط"
      this.placeholderPhoneNumber = "رقم الهاتف"
      this.MailPatternError = 'برجاء ادخال ايميل صحيح'
      this.placeholderMail = 'البريد الإلكتروني (اختياري)'
      this.PhoneNumberError = "برجاء ادخال رقم الهاتف المسجل"
      this.PhoneNumberPatternError = "برجاء ادخال رقم هاتف صحيح"
      this.RegisterFailedPopUpText = "فشل في تسجيل الحساب , برجاء اعادة المحاولة"
      this.LoginFailedPopUpText = " ! فشل تسجيل الدخول , يرجى التحقق من رقم الهاتف الذي أدخلته"
      this.NameMinLengthPatternError = "الاسم الذي ادخلته اقل من ثلاثه حروف ";
      this.NameMaxLengthPatternError = "الاسم الذي ادخلته اكثر من عشرون حروف ";
      this.switchMode = "ar"
     

     
    }
    else if (this.lang === 'en') {

      this.dir = 'ltr'
      this.head1 = 'Welcome'
      this.ConfirmLabel = 'Confirm'
      this.placeholderName = "Name"
      this.head2 = 'Create an account'
      this.placeholderMail = "Email (Optional)"
      this.NameError = "Please enter your name"
      this.placeholderPhoneNumber = "Phone number"
      this.PhoneNumberError = "Please enter your number"
      this.MailPatternError = 'Please enter a valid email address'
      this.PhoneNumberPatternError = "Please enter a valid mobile number"
      this.NamePatternError = "Only arabic and english letters are allowed"
      this.RegisterFailedPopUpText = "Registration failed , this number is already registered"
      this.LoginFailedPopUpText = "Login failed , kindly check the phone number you have entered !"
      this.NameMinLengthPatternError = "Name letters must be more than 3 letters";
      this.NameMaxLengthPatternError = "Name letters must be less than 20 letters ";
      this.switchMode = "en"
    
    }

 
  }

  AddNewCustomer() {

    const customer: AddCustomerModel = {
      Name: this.CustomerRegister.value.name,
      PhoneNumber: this.CustomerRegister.value.phoneNumber,
      Email: this.CustomerRegister.value.mail
    }

    this.customerService.AddNewCustomer(customer).subscribe(response => {
      if (response.succeeded) {

        this.newCustomer = response.data;
        console.log(this.newCustomer);

        localStorage.setItem('CustomerId', this.newCustomer.id.toString());

        this.router.navigate(["Login/BarberSelection"]);

      }
    }, error => {
      const err: ApiResponse = error.error;
      this.display = true;
      console.log(err);
    });

  }

  displayFalse($event) {
    this.display = false;
    this.onInputChange(event);
  
  }
  // keyboard function
  keybordInit() {

    document.getElementById("keyboard1").classList.add('simple-keyboard1');
    document.getElementById("keyboard2").classList.add('simple-keyboard2');
    document.getElementById("keyboard3").classList.add('simple-keyboard3');
    document.getElementById("keyboard4").classList.add('simple-keyboard4');


    this.Keyboard_numbers = new Keyboard(".simple-keyboard2", {
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),

      preventMouseDownDefault: true,
      layout: {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 {tab} {bksp}"],
        shift: []
      },
      theme: "hg-theme-default hg-layout-numeric numeric-theme",
      mergeDisplay: true , 
      display:
      {
        '{bksp}': '<i class="fas fa-backspace"></i>',
        '{tab}': '<i class="fas fa-exchange-alt"></i>'

      }
    });

    this.Keyboard_name_en = new Keyboard(".simple-keyboard1", {
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default testingTheme",
      mergeDisplay: true, 
      layout: this.english_name,
      preventMouseDownDefault: true,
      display:
      {
        '{enter}': '<i class="fas fa-globe"> </i>',
        '{bksp}': '<i class="fas fa-backspace"></i>',
        '{tab}': '<i class="fas fa-exchange-alt"></i>'

      }

    });

    this.Keyboard_name_ar = new Keyboard(".simple-keyboard4", {

      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      mergeDisplay: true, 
      layout: this.arabic_name,
      preventMouseDownDefault: true,
      rtl: true,
      display:
      {
        '{enter}': '<i class="fas fa-globe"> </i>',
        '{bksp}': '<i class="fas fa-backspace"></i>',
        '{tab}':'<i class="fas fa-exchange-alt"></i>'
      }
    });

    this.keyboard_mail = new Keyboard(".simple-keyboard3", {
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      mergeDisplay: true, 
      layout: this.english,
      preventMouseDownDefault: true,
      display:
      {
        '{enter}': '<i class="fas fa-globe"> </i>',
        '{bksp}': '<i class="fas fa-backspace"></i>',
        '{tab}': '<i class="fas fa-exchange-alt"></i>'

      }

    });


    document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard3')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')

    this.initializeKeyboardPosition()

  }

  onChange = (input: string) => {
    this.CustomerRegister.controls.name.setValue(this.nameValue)
    this.CustomerRegister.controls.phoneNumber.setValue(this.numberValue)
    this.CustomerRegister.controls.mail.setValue(this.mailValue)

    let activeElement = document.activeElement.id
    if (this.lang == 'ar' && activeElement == "t1" && this.switchMode=='ar')
    {
      input = input.slice(1, -1);
    }
    if (activeElement == "t1")
    {
      this.nameValue = input;
      this.CustomerRegister.controls.name.setValue(this.nameValue)
   
      
    }
    else if (activeElement == "t2") {
      this.numberValue = input;  
      this.CustomerRegister.controls.phoneNumber.setValue(this.nameValue) 
    }
    else if (activeElement == "t3")
    {
      this.mailValue = input;  
      this.CustomerRegister.controls.mail.setValue(this.nameValue) 
    }
    this.CustomerRegister.controls.name.setValue(this.nameValue)
    this.CustomerRegister.controls.phoneNumber.setValue(this.numberValue)
    this.CustomerRegister.controls.mail.setValue(this.mailValue)
    //console.log("Input changed", input);
  };
  onKeyPress = (button: string) => {
    if (button === "{tab}")
    {

      if (!this.nameTabFlag || !this.numberTabFlag)
      {  
        this.changeFocusFromInput()
        console.log("change")
      }
      
      
      

      
      
      
      
   
      
        
        
     }
    if (button === "{shift}" || button === "{lock}") this.handleShift();
   else if (button === "{enter}") this.changeLanguageKeyboard();
    
  };
  onInputChange = (event: any) => {

    let activeElement = document.activeElement.id
    console.log(event.target.value)
    if (activeElement == "t1") {
      this.Keyboard_name_ar.setInput(event.target.value);
      this.Keyboard_name_en.setInput(event.target.value);
    }
    else if (activeElement == "t2") {
      this.Keyboard_numbers.setInput(event.target.value);
    }
    else if (activeElement == "t3")
    {
      this.keyboard_mail.setInput(event.target.value);
    }

  };
  handleShift = () =>
{
    let activeElement = document.activeElement.id
    if (activeElement == "t1")
    { 
      let currentLayout = this.Keyboard_name_en.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.Keyboard_name_en.setOptions({
        layoutName: shiftToggle
      });
    }
    else if (activeElement == 't3')
    {
      let currentLayout = this.keyboard_mail.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";
      this.keyboard_mail.setOptions({
        layoutName: shiftToggle
      });
    }

    this.initializeKeyboardPosition()
    
  };
  clickinput(mode: any)
  {
    document.getElementById('msform').classList.add('swipeUp');
    document.getElementById('logoShrink').classList.add('swipelogo');
   
    if (mode == 'name')
    {
     
      
      if (this.switchMode == 'ar')
      {
        document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
        document.getElementsByClassName('simple-keyboard4')[0].classList.remove('hide-keyboard')
      }
      else if (this.switchMode == 'en')
      {
        document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
        document.getElementsByClassName('simple-keyboard1')[0].classList.remove('hide-keyboard')
      }
      document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard3')[0].classList.add('hide-keyboard')
      if (this.nameTabFlag && this.numberTabFlag)
      {
        this.Keyboard_name_en.setInput(this.nameValue)
        this.Keyboard_name_ar.setInput(this.nameValue)
      }
      this.Keyboard_name_ar.setInput(this.nameValue)
      this.Keyboard_name_en.setInput(this.nameValue)
 
     
    }
    else if (mode == 'number')
    {
     console.log(this.tabstate , "tab state")

      if (this.tabstate >= 0 && this.numberValue!="") 
      {
            let input = document.getElementsByTagName('input')
          input[1].defaultValue = this.numberValue
        
        this.Keyboard_numbers.setInput(this.numberValue)
        console.log("number Value ", this.numberValue )
      }
      document.getElementsByClassName('simple-keyboard2')[0].classList.remove('hide-keyboard')

      document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard3')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
      
     }
    else if (mode == 'mail')
    {
           
      if (this.tabstate >= 1 && this.mailValue!="")
     {
        
       this.keyboard_mail.setInput(this.mailValue)
       
        
      }
      document.getElementsByClassName('simple-keyboard3')[0].classList.remove('hide-keyboard')

      document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
      document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
    }

  }
  changeLanguageKeyboard()
  {
    let activeElement = document.activeElement.id
   // console.log(activeElement)

    if (activeElement == 't1')
    {
      this.nameValue = ''
      if (this.lang == 'ar' )
      {
        if (this.switchMode == 'ar')
        {
        
          document.getElementsByClassName('simple-keyboard1')[0].classList.remove('hide-keyboard')
          document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
          this.switchMode = 'en'
          this.Keyboard_name_ar.clearInput()

        }
        else if (this.switchMode == 'en')
        {
         
          document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
          document.getElementsByClassName('simple-keyboard4')[0].classList.remove('hide-keyboard')
          this.switchMode = 'ar'
          this.Keyboard_name_en.clearInput()
        }
       
      }
      else if (this.lang == 'en')
      {
        
        if (this.switchMode == 'ar')
        {

          document.getElementsByClassName('simple-keyboard1')[0].classList.remove('hide-keyboard')
          document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
          this.switchMode = 'en'
          this.Keyboard_name_ar.clearInput()
         
        }

        else if (this.switchMode == 'en')
        {
          document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
          document.getElementsByClassName('simple-keyboard4')[0].classList.remove('hide-keyboard')
          this.switchMode = 'ar'
          this.Keyboard_name_en.clearInput()

         
        }
       
      }
    
    }

  }
  changeFocusFromInput()
  {

    let activeElement = document.activeElement.id
    let inputs = document.getElementsByTagName("input")
    if (activeElement === 't1')
    {
      this.Keyboard_name_ar.clearInput()
      this.Keyboard_name_en.clearInput()
      document.getElementById('t2').focus()
      this.nameTabFlag = true
        
    }
    else if (activeElement === 't2')
    {
      this.Keyboard_numbers.clearInput()
      document.getElementById('t3').focus()
      this.numberTabFlag = true
    }

    if (this.numberTabFlag && this.nameTabFlag)
    {
      this.tabs = document.getElementsByClassName('hg-button-tab')
      for (var item of this.tabs)
      {
        item.style.display = 'none';
        console.log(item)
      }
    
       
        
    
      
      //this.clickinput('name')
      //this.clickinput('number')


    }
    
  }
 
  hideInput()
  {
    document.getElementsByClassName('simple-keyboard1')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard3')[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard4')[0].classList.add('hide-keyboard')
  }
  initializeKeyboardPosition()
  {
    document.getElementsByClassName('simple-keyboard1')[0].classList.add('key')
    document.getElementsByClassName('simple-keyboard2')[0].classList.add('number')
    document.getElementsByClassName('simple-keyboard3')[0].classList.add('key')
    document.getElementsByClassName('simple-keyboard4')[0].classList.add('key')

  }
   
} 
