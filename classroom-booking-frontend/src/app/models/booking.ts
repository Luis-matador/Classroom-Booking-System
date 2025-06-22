import { User } from './user';
import { Classroom } from './classroom';

export interface Booking {
    id: number;
    startDate: string;
    endDate: string;
    state: string;
    reason: string;
    user: User;
    classroom: Classroom;
}
