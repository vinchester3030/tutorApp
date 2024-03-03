import { Role } from "../../types/commonTypes";

export interface ILessonButtonsBlockProps {
    lessonId: string,
    lessonUrl: string,
    role: Role,
}

export interface ILessonButtonsBlockState {
    userData: {
        role: Role,
    }
}