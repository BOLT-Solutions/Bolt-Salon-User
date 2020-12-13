
import { OrderService } from './OrderService';

export interface Order {
  id?: number;
  orderTotal?: number;
  finishTime?: Date;
  waitingTimeMinutes?: number;
  orderIdentifier?: number;
  status?: string;
  orderDate?: Date;
  orderServices?: OrderService;
}
