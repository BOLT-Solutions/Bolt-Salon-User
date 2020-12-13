import { Order } from './Order';

export interface BarberQueue {
  id?: number;
  queueStatus?: string;
  queueWaitingTime: number;
  barberId?: number;
  orders?: Order;
  queueWaitingTimeInMinutes?: number;
  queueWaitingTimeInHours?: number;
}
