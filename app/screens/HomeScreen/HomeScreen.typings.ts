import { Database } from "firebase/database";
import { Role } from "../../types/commonTypes";

export interface IHomeScreenProps {
    database: Database,
    name: string,
    role: Role,
    childName: string,
    quit(): void,
}

export interface HomeScreenState {
    userData: {
        name: string,
        role: Role,
        childName: string,
    }
}
export interface RawData {
    [name: string]: {
        [key: string]: RawLesson,
    }
}
export interface RawLesson {
    data: string,
    subject: string,
    student: string,
}

export interface Lesson {
    date: Date,
    id: string,
    lesson: string,
    name: string,
}