import { Injectable } from '@angular/core';
import { BaseServcie } from './base-service';
import { API_CONSTANTS } from "./api-constants";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/http-models/api-response';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
    providedIn: 'root'
})
export class ServiceService extends BaseServcie {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

  getAllService(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GET_ALL_SERVICES);
  }
}
