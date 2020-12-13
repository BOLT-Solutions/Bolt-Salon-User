import { BarberProfilePhoto } from './BarberProfilePhoto';
import { BarberQueue } from './barberQueue';

export interface Barber {
  id?: number;
  nameAR?: string;
  nameEN?: string;

  status?: string;
  numberOfCustomersHandled?: number;
  shopId?: number;
  barberProfilePhoto?: BarberProfilePhoto;
  barberQueue: BarberQueue;
  styleClasses: string;

}
