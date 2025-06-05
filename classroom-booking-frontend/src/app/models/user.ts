import { Rol } from './rol';
import { Booking } from './booking';

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    rol: Rol;
    reservations: Booking[];
}
