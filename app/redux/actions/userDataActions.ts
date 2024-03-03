import { createAction } from '@reduxjs/toolkit';
import {
    SET_KEY,
    SET_NAME,
    SET_ROLE,
    SET_CHILD_KEY,
    SET_CHILD_NAME,
    QUIT
} from '../types/userDataTypes';
import { Role } from '../../types/commonTypes';

export const setKey = createAction<string>(SET_KEY);
export const setName = createAction<string>(SET_NAME);
export const setChildKey = createAction<string>(SET_CHILD_KEY);
export const setChildName = createAction<string>(SET_CHILD_NAME);
export const setRole = createAction<Role>(SET_ROLE);
export const quit = createAction(QUIT);