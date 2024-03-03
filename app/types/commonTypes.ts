export interface LessonRaw {
    student?: string;
    data?: string;
    lessonTime?: string;
    format?: string;
    place?: string;
    subject?: string;
    markLesson?: string;
    markHomWork?: string;
    commentParent?: string;
    commentStudent?: string;
}

export enum Role {
    STUDENT,
    TEACHER,
    PARENT,
}