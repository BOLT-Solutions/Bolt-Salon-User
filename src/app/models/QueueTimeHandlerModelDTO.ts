import { OrderFeedbackQuestion } from "./OrderFeedbackQuestion";
import { Order } from './Order';

export interface QueueTimeHandlerModelDTO {
  queueId: number;
  queueEstimatedFinishTime: Date;
  queueEstimatedWaitingTime: number;
  orders: Order[];
}
