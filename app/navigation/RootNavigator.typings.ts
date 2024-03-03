import { Database } from "firebase/database"
import { Role } from "../types/commonTypes"
import { FirebaseStorage } from "firebase/storage"

export interface RootNavigatorState {
    userData: {
        role: Role
    }
}

export interface RootNavigatorProps {
    role: Role, 
    database: Database,
    storage: FirebaseStorage,
}