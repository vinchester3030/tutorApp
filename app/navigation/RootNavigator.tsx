import React from "react";

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { connect } from "react-redux";

import { RootStackParamList } from '../types/navigation';

import AuthScreen from '../screens/AuthScreen/AuthScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import { LessonScreen } from '../screens/LessonScreen/LessonScreen';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import TeacherHomeworkScreen from '../screens/TeacherHomeworkScreen/TeacherHomeworkScreen';

import { RootNavigatorState, RootNavigatorProps } from "./RootNavigator.typings";
import SolutionScreen from "../screens/SolutionScreen/SolutionScreen";
import { ImageViewer } from "../screens/ImageViewer/ImageViewer";

const RootNavigator = (props: RootNavigatorProps) => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const {storage, database} = props;
    return (
    <NavigationContainer >
        <Stack.Navigator initialRouteName={props.role === undefined ? 'Auth' : 'Home'}>
        <Stack.Screen
            name="Auth"
            options={{headerShown: false,}}
        >
            {() => {
            return (
                <AuthScreen
                    database={database}
                />
            );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="Home"
            options={{headerShown: false, title: 'Все занятия'}}
        >
            {() => {
            return (
                <HomeScreen
                    database={database}
                />
            );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="Lesson"
            options={{title: 'Занятие'}}
        >
            {(props) => {
            return (
                <LessonScreen
                    database={database}
                    {...props}
                />
            );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="TeacherHomework"
            options={{title: 'Задание'}}
        >
            {(props) => {
            return (
                <TeacherHomeworkScreen
                    storage={storage}
                    database={database}
                    {...props}
                />
            );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="Comment"
        >
            {(props) => {
                return (
                    <CommentScreen
                        {...props}
                        database={database}
                    />
                );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="Solution"
            options={{title: 'Решение'}}
        >
            {(props) => {
                return (
                    <SolutionScreen
                        {...props}
                        database={database}
                        storage={storage}
                    />
                );
            }}
        </Stack.Screen>
        <Stack.Screen
            name="ImageViewer"
            options={{title: ''}}
        >
            {(props) => {
                return (
                    <ImageViewer
                        {...props}
                    />
                );
            }}
        </Stack.Screen>
        </Stack.Navigator>

    </NavigationContainer>
    );
}

const mapStateToProps = (state: RootNavigatorState) => {
	return {
		role: state.userData.role,
	};
};

export default connect(mapStateToProps, null)(RootNavigator);