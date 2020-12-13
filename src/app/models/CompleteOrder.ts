import { OrderFeedback } from './OrderFeedback';

export interface CompleteOrder {
  id?: number;
  barberId?: number;
  orderTotalAmount?: number;
  customerWaitingTimeInMinutes?: number;
  status?: string;
  orderServicesList?: string;
  orderDateTime?: Date;
  orderFinishTime?: Date;
  customerId?: number;
  orderFeedback?: OrderFeedback;
}
