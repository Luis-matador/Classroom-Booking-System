import { ClassroomType } from './classroom-type';
import { Booking } from './booking';

export interface Classroom {
    id: number;
    name: string;
    capacity: number;
    location: string;
    type: ClassroomType;
    bookings: Booking[];
}
