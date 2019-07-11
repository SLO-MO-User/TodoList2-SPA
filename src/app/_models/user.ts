import { Todo } from './todo';

export interface User {
    id: number;
    username: string;
    createdAtDateTime: Date;
    lastActiveAtDateTime: Date;
    todos?: Todo[];
}
