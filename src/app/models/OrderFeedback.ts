import { OrderFeedbackQuestion } from "./OrderFeedbackQuestion";

export interface OrderFeedback {
  id?: number;
  comment?: string;
  date?: Date;
  isSubmitted?: boolean;
  completeOrderId?: number;
  orderFeedbackQuestions?: OrderFeedbackQuestion[];
}
