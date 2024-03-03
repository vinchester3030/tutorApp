import { ImageViewer } from '../screens/ImageViewer/ImageViewer';
export type RootStackParamList = {
    Auth: undefined;
    Home: undefined;
    Comment: {lessonUrl: string},
    Lesson: {name: string, id: string},
    TeacherHomework: { lessonId: string, lessonUrl: string},
    Solution: { lessonId: string, lessonUrl: string},
    ImageViewer: {url: string}
  };