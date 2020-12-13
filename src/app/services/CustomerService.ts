import { Injectable } from '@angular/core';
import { BaseServcie } from '../services/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { API_CONSTANTS } from '../services/api-constants';

import { CustomerLoginDTO } from '../models/CustomerLoginDTO';
import { AddCustomerModel } from '../models/AddCustomerModel';
import { AdminLoginModel } from '../models/AdminLoginModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseServcie {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  CustomerLogin(login: CustomerLoginDTO): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.LOGIN, login);
  }

  GuestLogin(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GUEST_LOGIN);
  }


  GetCustomerById(id: string): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GET_CUSTOMER_BY_ID+id);
  }



  AddNewCustomer(customer: AddCustomerModel): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.ADD_NEW_CUTOMER, customer);
  }

  adminLogin(admin: AdminLoginModel): Observable<ApiResponse> {
    return   this.post(API_CONSTANTS.ADMIN_LOGIN , admin);
  }
  
}
