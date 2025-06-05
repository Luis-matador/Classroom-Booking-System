import { ClassroomType } from './classroom-type';
import { Booking } from './booking';
import { Equipment } from './equipment';
import { Availability } from './availability';

export interface Classroom {
    id: number;
    name: string;
    capacity: number;
    location: string;
    type: ClassroomType;
    bookings: Booking[];
    equipments: Equipment[];
    availabilities: Availability[];
}
