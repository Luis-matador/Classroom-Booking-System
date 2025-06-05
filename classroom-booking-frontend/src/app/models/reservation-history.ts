import { User } from './user';
import { Booking } from './booking';
import { Rol } from './rol';

export interface ReservationHistory {
    id: number;
    state: string;
    date: string;
    user: User;
    booking: Booking;
    rol: Rol;
}
