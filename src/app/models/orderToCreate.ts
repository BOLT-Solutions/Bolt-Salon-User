import { OrderService } from './OrderService';

export interface orderToCreate {
  barberQueueId: number;
  customerId: number;
  orderServices: OrderService[];
  DiscountRate:number
}
