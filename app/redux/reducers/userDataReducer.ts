import {createReducer} from '@reduxjs/toolkit';

import {
	setKey,
	setName,
	setRole,
	setChildKey,
	setChildName,
	quit
} from '../actions/userDataActions';
import { Role } from '../../types/commonTypes';

interface UserData {
    role?: Role, 
    name?: string,
    key?: string,
	childName?: string,
	childKey?: string,
}
const initialState: UserData = {
    role: undefined,
    name: undefined,
    key: undefined,
	childName: undefined,
	childKey: undefined,
}

export const userDataReducer = createReducer(initialState, builder => {
	builder
		.addCase(setName, (state, action) => {
			state.name = action.payload;
		})
        .addCase(setKey, (state, action) => {
			state.key = action.payload;
		})
        .addCase(setRole, (state, action) => {
			state.role = action.payload;
		})
        .addCase(quit, (state) => {
			state = initialState;
		})
		.addCase(setChildKey, (state, action) => {
			state.childKey = action.payload;
		})
		.addCase(setChildName, (state, action) => {
			state.childName = action.payload;
		})
});