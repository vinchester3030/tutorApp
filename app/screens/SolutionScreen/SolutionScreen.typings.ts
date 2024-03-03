import { Database } from "firebase/database"
import { FirebaseStorage } from "firebase/storage"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Role } from "../../types/commonTypes"
import { RootStackParamList } from "../../types/navigation"

export interface ISolutionScreenProps extends NativeStackScreenProps<RootStackParamList, "Solution">{
    storage: FirebaseStorage,
    database: Database,
    role: Role,
}

export interface ISolutionScreenState {
    userData: {
        role: Role,
    }
}