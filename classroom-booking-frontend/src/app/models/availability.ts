import { Classroom } from './classroom';

export interface Availability {
    id: number;
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    classroom: Classroom;
}
