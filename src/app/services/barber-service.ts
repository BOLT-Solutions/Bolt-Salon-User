import { Injectable } from '@angular/core';
import { BaseServcie } from './base-service';
import { API_CONSTANTS } from "./api-constants";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/http-models/api-response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BarberService extends BaseServcie {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }

    getAvailableBarbers(): Observable<ApiResponse> {
      return this.get(API_CONSTANTS.GET_ALL_AVAILABLE_BARBERS);
  }
  setBarberQueueWaitingTime(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.SET_BARBER_QUEUE_WAITING_TIME);
  }
}
