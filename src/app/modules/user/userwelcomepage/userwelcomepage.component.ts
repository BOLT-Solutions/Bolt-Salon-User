import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service';
import { CustomerService } from '../../../services/CustomerService';
import Keyboard from "simple-keyboard";
import englishlayout from "simple-keyboard-layouts/build/layouts/english";
@Component({
  selector: 'app-userwelcomepage',
  templateUrl: './userwelcomepage.component.html',
  styleUrls: ['./userwelcomepage.component.scss']
})
export class UserwelcomepageComponent implements OnInit {
  loginErrorBoolean: boolean = false;
  loginErrorText: string;
  lang: string;
  guestButtonStyle: string;
  constructor(private router: Router, private sharedData: SharedService  ,private CustomerService: CustomerService) { }
  guestButtonPath = 'guest.png';
  existingCustomerButtonPath = 'ExistingCustomerEN.png';
  newCustomerButtonPath = 'NewCustomerEN.png';
  display: boolean = false;
  adminPassword: any;
  adminPass;
  DialogHeaderByLang: string;
  dialogInputPlaceholder: string;
  dialogSubmitButton: any;
  logoutbtnPath = 'logout.png';
  submitImage = 'ApplyEn.png';
  keyboard_pwd: Keyboard
  root: any;
  english = {
    default: ["1 2 3 4 5 6 7 8 9 0 {bksp}", "q w e r t y u i o p", "a s d f g h j k l ", "{shift} z x c v b n m {shift}", ".com @ {space}"],
    shift: ["~ ! @ # $ % ^ & * ( ) _ + {bksp}", "Q W E R T Y U I O P", "A S D F G H J K L ", "{shift} Z X C V B N M {shift}", ".com @ {space}"]
  };
  ngOnInit(): void {
    this.sharedData.currentLoginRefresh.subscribe(res => {
      if (res == true) {
        window.location.reload();
      }
      else {
        //do nothing.
      }
    });
 
   // console.log(this.sharedData.currentLoginRefresh)
    this.adminPass = '';
    this.adminPassword = localStorage.getItem('adminPassword');
   

    console.log(this.adminPassword, 'adminpass');
    if (this.adminPassword == null) {
      this.router.navigate(["Welcome"]);
    }
    
    localStorage.removeItem('BarberbName');
    localStorage.removeItem('BarberQueueId');
    localStorage.removeItem('CustomerId');
    localStorage.removeItem('OrderServices');
    localStorage.removeItem('BarberId');
    localStorage.removeItem('barberStatus');
    localStorage.removeItem('Barber');


    localStorage.setItem('Language', 'en');

    this.lang = localStorage.getItem('Language')

    if (this.lang === 'ar') {
      console.log(this.lang);
      this.guestButtonPath = 'guest-ar.png';
      this.newCustomerButtonPath = 'NewCustomerAR.png';
      this.existingCustomerButtonPath = 'ExistingCustomerAR.png';
      this.guestButtonStyle = 'ArabicGuestButton';
      this.DialogHeaderByLang = 'الرقم السري';
      this.dialogInputPlaceholder = 'الرقم السري';
      this.dialogSubmitButton = "تأكيد";
;
    }
    else if (this.lang === 'en')
    {
      this.guestButtonPath = 'guest.png';
      this.newCustomerButtonPath = 'NewCustomerEN.png';
      this.existingCustomerButtonPath = 'ExistingCustomerEN.png';
      this.guestButtonStyle = 'EnglishGuestButton';
      this.DialogHeaderByLang = 'Enter Your Password';
      this.dialogInputPlaceholder = "Enter Your Password";
      this.dialogSubmitButton = "Submit";
      this.logoutbtnPath = 'logout.png';
      this.submitImage = 'ApplyEn.png';
      console.log(this.lang);
    }

    this.keyboard_pwd = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "simple-keyboard hg-theme-default hg-layout-default",
      layout: this.english,
      preventMouseDownDefault: true,
    });
    document.getElementsByClassName("simple-keyboard")[0].classList.add('hide-keyboard')
    document.getElementsByClassName('simple-keyboard')[0].classList.add('key')
    this.root = document.getElementsByClassName('hg-button-bksp');
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }
  }
  

  RouteToPage(page: any) {
    localStorage.removeItem('Barber');
    localStorage.removeItem('OrderServices');

   // this.sharedData.setLoginRefresh(true)
    if (page == "Guest") {
      (async () => {
        if (this.lang == 'en') {
          this.guestButtonPath = 'GuestClicked.png';
        }
        else {
          this.guestButtonPath = 'GuestClickedAR.png'
        }
        this.router.navigateByUrl("Selection");
        //await this.delay(100);

        this.CustomerService.GuestLogin().subscribe(response => {
          if (response.succeeded) {

            var id = response.data.id;

            localStorage.setItem('CustomerId', id.toString());
         
            this.router.navigateByUrl("Selection");

          }
        }, error => {
     
          console.log(error);
         

        });


      })();
    }
    else if (page == "ExistingCustomer") {
     
      (async () => {
        if (this.lang == 'en') {
          this.existingCustomerButtonPath = 'ExistingCustomerClickedEN.png';
        }
        else {
          this.existingCustomerButtonPath = 'ExistingCustomerClickedAR.png';
        }
        await this.delay(100);
     
         
        this.router.navigateByUrl("Login//ExistingCustomer");
      })();
    }
    else if (page == "NewCustomer") {
      (async () => {
        if (this.lang == 'en') {
          this.newCustomerButtonPath = 'NewCustomerClickedEN.png';
        }
        else {
          this.newCustomerButtonPath = 'NewCustomerClickedAR.png'
        }
        await this.delay(100);
        this.router.navigateByUrl("Login/NewCustomer");
      })();
    }
  }
  delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
  }
  translateToEnglish() {
    localStorage.setItem('Language', 'en');

    //this.sharedData.setNavigatingLanguage('en');
    this.lang = 'en';
    this.guestButtonPath = 'guest.png';
    this.existingCustomerButtonPath = 'ExistingCustomerEN.png';
    this.newCustomerButtonPath = 'NewCustomerEN.png';
    this.guestButtonStyle = 'EnglishGuestButton';
   }
  translateToArabic()
  {
    localStorage.setItem('Language', 'ar');

    //this.sharedData.setNavigatingLanguage('ar'); 
    this.lang = 'ar';
    this.guestButtonPath = 'guest-ar.png';
    this.existingCustomerButtonPath = 'ExistingCustomerAR.png';
    this.newCustomerButtonPath = 'NewCustomerAR.png';
    this.guestButtonStyle = 'ArabicGuestButton';
  }
  logout() {
    
    this.display = true;
    document.getElementById("back").classList.add('notice-wrap');
  }
  submitLogout() {
    console.log("clicked");
    console.log(this.adminPass);
    console.log(this.adminPassword);
    if (this.adminPass === this.adminPassword) {
      console.log("true");
      localStorage.removeItem('adminPassword');
      this.sharedData.setLoginRefresh(true);
      this.router.navigate(["Welcome"]);

    }
    else {
      this.loginErrorBoolean = true;
      this.loginErrorText = "Wrong Password";
    }
    
  }
  closeDialog() {
    this.display = false;
    this.loginErrorBoolean = false;
    this.adminPass = null;
    document.getElementById("back").classList.remove('notice-wrap');
    document.getElementsByClassName("simple-keyboard")[0].classList.add('hide-keyboard')

  }
  ///

  onChange = (input: string) => {
    this.adminPass = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard_pwd.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard_pwd.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard_pwd.setOptions({
      layoutName: shiftToggle
    });


    document.getElementsByClassName('simple-keyboard')[0].classList.add('key')
    this.root = document.getElementsByClassName('hg-button-bksp');
    for (let item of this.root) {
      item = item.innerHTML = '<i class="fas fa-backspace"></i>'
    }
  };


  clickinput()
  {
    document.getElementsByClassName("simple-keyboard")[0].classList.remove('hide-keyboard')
    document.getElementsByClassName("simple-keyboard")[0].classList.add('key')
  }
  hideInput()
  {
    document.getElementsByClassName('simple-keyboard')[0].classList.add('hide-keyboard')
   
  }



}

