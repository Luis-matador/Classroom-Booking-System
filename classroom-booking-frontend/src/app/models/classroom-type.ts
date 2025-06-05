import { Classroom } from './classroom';

export interface ClassroomType {
    id: number;
    nombreTipo: string;
    descripcion?: string;
    aulas?: Classroom[];
}
