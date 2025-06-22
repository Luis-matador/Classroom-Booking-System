import { User } from './user';

export interface Rol {
    id: number;
    rolName: string;
    description: string;
    users: User[];
}
