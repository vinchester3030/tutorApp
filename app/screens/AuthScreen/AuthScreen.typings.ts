import type { Database } from "firebase/database";
import { Role } from "../../types/commonTypes";

export interface AuthScreenProps {
    database: Database,
    setKey(key: string): void;
    setName(name: string): void;
    setChildKey(key: string): void;
    setChildName(name: string): void;
    setRole(role: Role): void;
}