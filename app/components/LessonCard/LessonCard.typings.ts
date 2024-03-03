import { Role } from "../../types/commonTypes";

export interface ILessonCardProps {
    date?: Date,
    isOnline?: boolean,
    place?: string,
    lesson?: string,
    time?: string, 
    onEdit(): void;
    onDelete(): void,
    role: Role,
}

export interface ILessonCardState {
    userData: {
        role: Role,
    }
}