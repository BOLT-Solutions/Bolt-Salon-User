import { Injectable } from '@angular/core';
import { BaseServcie } from '../services/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/http-models/api-response';
import { API_CONSTANTS } from '../services/api-constants';

import { CustomerLoginDTO } from '../models/CustomerLoginDTO';
import { AddCustomerModel } from '../models/AddCustomerModel';
import { PromoCodeModel } from '../models/promocodeModel';

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService extends BaseServcie {
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  ApplyPromoCode(PromoCodeModel: PromoCodeModel): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.APPLY_PROMOCODE, PromoCodeModel);
  }


  
}
