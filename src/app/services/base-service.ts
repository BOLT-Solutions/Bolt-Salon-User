import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ApiResponse } from 'src/app/models/http-models/api-response';
import { Observable } from 'rxjs';

export class BaseServcie {

    private apiUrl: string;
    private imageServerUrl: string;
    private httpHeaders: HttpHeaders;
    private httpOptions: {}

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiBaseUrl;
    this.imageServerUrl = environment.imageHandlerServerBaseUrl;
        this.httpHeaders = new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Accept-Language': 'en'
        });
    }

    protected get(url: string, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = { 
            headers: this.httpHeaders,
            params: params,
          withCredentials: false
        };
        return this.http.get<ApiResponse>(this.apiUrl + url, this.httpOptions);
    }

    protected post(url: string, data: any, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = {
            headers: this.httpHeaders,
            params: params,
            withCredentials: false
        };
        return this.http.post<ApiResponse>(this.apiUrl + url, data, this.httpOptions);
    }
    protected put(url: string, data: any, params?: HttpParams) : Observable<ApiResponse> {
        this.httpOptions = {
            headers: this.httpHeaders,
            params: params,
          withCredentials: false
        };
        return this.http.put<ApiResponse>(this.apiUrl + url, data, this.httpOptions);
    }
    protected ImageHandler_Get_Images(url: string, data: any): Observable<object> {
        return this.http.post<object>(this.imageServerUrl, data);
    }
}
