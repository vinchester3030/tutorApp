export interface IAddLessonModalProps {
    isVisible: boolean,
    setVisible(value: boolean): void,
    edit?: boolean,
    date?: Date,
    time?: Date,
    student?: string,
    format?: string,
    place?: string,
    lesson?: string,
    lessonUrl?: string,
}