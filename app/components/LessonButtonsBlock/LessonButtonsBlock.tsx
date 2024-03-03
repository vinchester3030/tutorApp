import React from "react";
import { View,Text,TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { RootStackParamList } from "../../types/navigation";
import { ILessonButtonsBlockProps, ILessonButtonsBlockState } from "./LessonButtonsBlock.typings";

import styles from "./LessonButtonsBlock.styles";
import { connect } from "react-redux";
import { Role } from "../../types/commonTypes";

const LessonButtonsBlock = (props: ILessonButtonsBlockProps) =>{

    const {role, lessonId, lessonUrl} = props;

    const navigation: NavigationProp<RootStackParamList>= useNavigation();

    const onTaskButtonPress = () =>{navigation.navigate("TeacherHomework", {lessonUrl, lessonId} )}
    const onHomeworkButtonPress = () =>{navigation.navigate("Solution", {lessonUrl, lessonId})}
    const onCommentsButtonPress = () =>{navigation.navigate("Comment", {lessonUrl});}

    return(
        <>
            <View style = {[styles.card3]}>


                <TouchableOpacity 
                    style = {[styles.card]} 
                    onPress={onTaskButtonPress}
                >
                    <Text style = {[styles.text]}>
                        Задание
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style = {[styles.card]}
                    onPress={onHomeworkButtonPress}
                >
                    <Text style = {[styles.text]}>
                        Решение
                    </Text>
                </TouchableOpacity>

            </View>

            <TouchableOpacity 
            style = {[styles.card2]}
            onPress={onCommentsButtonPress}>
                <Text style = {[styles.text]}>
                    {
                        role === Role.TEACHER ?
                        'Оценить' :
                        'Посмотреть оценку'
                    }
                </Text>
            </TouchableOpacity>

        </>

        
    )
}

const mapStateToProps = (state: ILessonButtonsBlockState) => {
    return {
        role: state.userData.role,
    }
}

export default connect(mapStateToProps, null)(LessonButtonsBlock)