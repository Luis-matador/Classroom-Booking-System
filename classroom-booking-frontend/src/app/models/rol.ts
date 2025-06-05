import { User } from './user';
import { ReservationHistory } from './reservation-history';

export interface Rol {
    id: number;
    rolName: string;
    description: string;
    users: User[];
    reservationHistories: ReservationHistory[];
}
