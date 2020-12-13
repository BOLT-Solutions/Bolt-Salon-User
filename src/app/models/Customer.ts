import { CompleteOrder } from './CompleteOrder';

export interface Customer {
  id?: number;
  name?: string;
  phone?: string;
  email?: string;
  uniqueCode?: string;
  lastBarberId?: number;
  lastVisitDate?: Date;
  totalNumberOfVisits?: number;
  completeOrders?: CompleteOrder[];
}
