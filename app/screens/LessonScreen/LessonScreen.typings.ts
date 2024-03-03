import { RouteProp, ParamListBase } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Database } from "firebase/database"
import { RootStackParamList } from "../../types/navigation"


export interface LessonScreenProps extends NativeStackScreenProps<RootStackParamList, "Lesson">{
    database: Database,
}