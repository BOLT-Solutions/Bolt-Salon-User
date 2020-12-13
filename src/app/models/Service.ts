import { ServiceFeedbackQuestion } from './ServiceFeedbackQuestion';

export interface Service {
  id: number;
  nameAR: string;
  nameEN: string;
  price: any;
  time: any;
  adminPath: string;
  userPath: string;
  feedBackQuestions: ServiceFeedbackQuestion[];
  styleClasses: string;
  serviceTimeInHrs;
}
