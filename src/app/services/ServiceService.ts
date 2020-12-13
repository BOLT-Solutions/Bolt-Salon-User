import { Injectable } from '@angular/core';
import { BaseServcie } from '../services/base-service';
import { API_CONSTANTS } from "../services/api-constants";
import { HttpParams, HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/http-models/api-response';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ServiceService extends BaseServcie {

    constructor(private httpClient: HttpClient) {
        super(httpClient);
    }


  getCurrencies(): Observable<ApiResponse> {
    return this.get(API_CONSTANTS.GET_ALL_SERVICES);
    }



}
