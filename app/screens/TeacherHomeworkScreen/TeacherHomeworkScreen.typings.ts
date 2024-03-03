import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Database } from "firebase/database";
import { FirebaseStorage } from "firebase/storage";
import { RootStackParamList } from "../../types/navigation";
import { Role } from "../../types/commonTypes";

export interface ITeacherHomeworkScreenProps extends NativeStackScreenProps<RootStackParamList, "TeacherHomework">{
    storage: FirebaseStorage,
    database: Database,
    role: Role,
}

export interface ITeacherHomeworkScreenState {
    userData: {
        role: Role,
    }
}