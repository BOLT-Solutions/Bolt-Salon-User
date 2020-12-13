import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { CustomerRoutingModule } from '../customer/customer-routing.module';
import { ExistingcustomerComponent } from './existingcustomer/existingcustomer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MatButtonModule } from '@angular/material/button';
 
import { IKeyboardLayouts, keyboardLayouts, MAT_KEYBOARD_LAYOUTS, MatKeyboardModule, KeyboardClassKey, keyboardDeadkeys } from 'angular-onscreen-material-keyboard';
//const customLayouts: IKeyboardLayouts = {
//  ...keyboardLayouts,
//  'Tölles Läyout': {
//    'name': 'Awesome layout',
//    'keys': [
//      [
//        ['1', '!'],
//        ['2', '@'],
//        ['3', '#'] ,

//      ]
//    ],
//    'lang': ['de-CH']
//  

//};
const customLayouts: IKeyboardLayouts = {
  ...keyboardLayouts,
  'Number Pad':
  {
    'name': "Number Pad",
    'keys':
      [
        [["1"], ["2"], ["3"] , ['backspace'] ] ,
        [["4"], ["5"], ["6"]],
        [["7"], ["8"] , ["9"]]
      ],
    'lang':["Number"]
  }
  //'US International': {
  //  'name': "US International",
  //  'keys': [
  //    [["1", "!"], ["2", "@"], ["3", "#"],
  //      ["4", "$"], ["5", "%"], ["6", "^"],
  //      ["7", "&"], ["8", "*"], ["9", "("],
  //      ["0", ")"],["-", "_" ], ["=", "+",] , ["Clear"]],
  //    [["q", "Q"], ["w", "W"],
  //      ["e", "E"], ["r", "R"],
  //      ["t", "T"], ["y", "Y"],
  //      ["u", "U"], ["i", "I"],
  //      ["o", "O"], ["p", "P"]],
  //    [ 
  //      ["a", "A"], ["s", "S"],
  //      ["d", "D"], ["f", "F"],
  //      ["g", "G"], ["h", "H"],
  //      ["j", "J"], ["k", "K"],
  //      ["l", "L"], [";", ":"],
  //      ["'", '"']],
  //    [["Shift", "Shift"], ["z", "Z"],
  //      ["x", "X"],["c", "C"],
  //      ["v", "V"], ["b", "B"],
  //      ["n", "N"], ["m", "M"],
  //      [",", "<"],[".", ">"],
  //      ["/", "?"],["Shift", "Shift"]],
  //    [[" ", " ", " ", " "," "]]
  //  ], 'lang': ["en"]
  //},


  //'Arabic': {
  //  'name': "Arabic",
  //  'keys': [
  //    [["\u0630", "\u0651 "], ["1", "!", "\u00a1", "\u00b9"], ["2", "@", "\u00b2"],
  //    ["3", "#", "\u00b3"], ["4", "$", "\u00a4", "\u00a3"], ["5", "%", "\u20ac"],
  //    ["6", "^", "\u00bc"], ["7", "&", "\u00bd"], ["8", "*", "\u00be"], ["9", "(", "\u2018"],
  //    ["0", ")", "\u2019"], ["-", "_", "\u00a5"], ["=", "+", "\u00d7", "\u00f7"], ["Bksp", "Bksp"]],
  //    [["Tab", "Tab"], ["\u0636", "\u064e"], ["\u0635", "\u064b"], ["\u062b", "\u064f"],
  //    ["\u0642", "\u064c"], ["\u0641", "\u0644"], ["\u063a", "\u0625"], ["\u0639", "\u2018"],
  //    ["\u0647", "\u00f7"], ["\u062e", "\u00d7"], ["\u062d", "\u061b"], ["\u062c", "<"],
  //    ["\u062f", ">"], ["\\", "|"]],
  //    [["Caps", "Caps"], ["\u0634", "\u0650"], ["\u0633", "\u064d"], ["\u064a", "]"],
  //    ["\u0628", "["], ["\u0644", "\u0644"], ["\u0627", "\u0623"], ["\u062a", "\u0640"],
  //    ["\u0646", "\u060c"], ["\u0645", "/"], ["\u0643", ":"], ["\u0637", '"'], ["Enter", "Enter"]],
  //    [["Shift", "Shift"], ["\u0626", "~"], ["\u0621", "\u0652"], ["\u0624", "}"],
  //    ["\u0631", "{"], ["\u0644", "\u0644"], ["\u0649", "\u0622"], ["\u0629", "\u2019"],
  //    ["\u0648", ","], ["\u0632", "."], ["\u0638", "\u061f"], ["Shift", "Shift"]],
  //    [[" ", " ", " ", " "], ["Alt", "Alt"]]
  //  ], 'lang': ["ar"]
  //}
};
 /*
_a[KeyboardClassKey.Bksp] = { name: 'keyboard_backspace' },
    _a[KeyboardClassKey.Caps] = { name: 'keyboard_capslock' },
    _a[KeyboardClassKey.Enter] = { name: 'keyboard_return' },
    _a[KeyboardClassKey.Shift] = { name: 'keyboard_arrow_up' },
    _a[KeyboardClassKey.Space] = { name: ' ' },
    _a[K
    eyboardClassKey.Tab] = { name: 'keyboard_tab' },
    _a);
  */
@NgModule({

  providers: [
    { provide: MAT_KEYBOARD_LAYOUTS, useValue: customLayouts }
  ],
  declarations: [NewcustomerComponent, ExistingcustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule, MatButtonModule, MatKeyboardModule
  ],
 
})
export class CustomerModule { }
