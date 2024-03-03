import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Database } from "firebase/database";
import { RootStackParamList } from "../../types/navigation";
import { Role } from "../../types/commonTypes";

export interface ICommentScreenProps extends NativeStackScreenProps<RootStackParamList, "Comment">{
    database: Database,
    role: Role,
}

export interface ICommentDataSnapshot {
    parentComment: string,
    studentComment: string,
    homeworkGrade: string,
    lessonGrade: string,
}

export interface ICommentScreenState {
    userData: {
        role: Role,
    }
}