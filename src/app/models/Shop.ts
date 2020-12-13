import { Barber } from './Barber';
import { Administrator } from './Administrator';

export interface Shop {
  id?: number;
  address?: string;
  barbers?: Barber[];
  administrators?: Administrator[];
}
