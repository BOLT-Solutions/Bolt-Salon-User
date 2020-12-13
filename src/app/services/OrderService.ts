import { Injectable } from '@angular/core';
import { BaseServcie } from '../services/base-service';
import { API_CONSTANTS } from "../services/api-constants";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/http-models/api-response';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';
import { orderToCreate } from '../models/orderToCreate';


@Injectable({
    providedIn: 'root'
})
export class OrderServiceService extends BaseServcie {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }


  addOrder(order: orderToCreate): Observable<ApiResponse> {
    return this.post(API_CONSTANTS.ADD_ORDER_TO_QUEUE,order);
    }



}
