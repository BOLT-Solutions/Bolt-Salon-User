import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrderService } from '../models/OrderService';
@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private userId = new BehaviorSubject(0); // default value
  private barberId = new BehaviorSubject(0);
  private orderService = new BehaviorSubject<any>(0);
  private barberName = new BehaviorSubject('Default Name');
  private waitingTime = new BehaviorSubject(0);
  private lang = new BehaviorSubject<string>('ar');
  private loginRefresh = new BehaviorSubject<boolean>(false);

  currentUserId = this.userId.asObservable();
  currentBarberId = this.barberId.asObservable();
  currentOrder = this.orderService.asObservable();
  currentBarberName = this.barberName.asObservable();
  currentLang = this.lang.asObservable();
  currentWaitingTime = this.waitingTime.asObservable();
  currentLoginRefresh = this.loginRefresh.asObservable();
  constructor() {
  }

  setNavigatingUser(userId: number) {
    this.userId.next(userId);
  }

  setNavigatingBarber(barberId: number, barberName: string) {
    this.barberId.next(barberId);
    this.barberName.next(barberName);
  }
  setNavigatingLanguage(lang: string) {
    this.lang.next(lang);
  }
  addOrderService(orderService: OrderService[]) {
    this.orderService.next(orderService);
  }
  setWaitingTime(waitingTime: number) {
    this.waitingTime.next(waitingTime);
  }
  setLoginRefresh(status: boolean) {
    this.loginRefresh.next(status);
  }
}
