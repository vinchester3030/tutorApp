import React, {useState,useEffect} from "react";
import {Text, View, TextInput, TouchableOpacity, Alert} from "react-native"

import { NavigationProp, useNavigation } from "@react-navigation/native";
import {initializeApp} from 'firebase/app';
import { ref, get, update, DataSnapshot } from "firebase/database";

import { ICommentDataSnapshot, ICommentScreenProps, ICommentScreenState } from "./CommentScreen.typings";
import { RootStackParamList } from "../../types/navigation";

import styles from "./CommentScreen.styles";
import { connect } from "react-redux";
import { Role } from "../../types/commonTypes";

const CommentScreen =(props: ICommentScreenProps) =>{

    const { lessonUrl } = props.route.params;

    const { database, role } = props;

    const [parentComment, setParentComment] =  useState('');
    const [studentComment, setStudentComment] =  useState('');
    const [lessonGrade, setLessonGrade] = useState('');
    const [homeworkGrade, setHomeworkGrade] = useState('');

    const navigation: NavigationProp<RootStackParamList>= useNavigation();

    const updateData = () => {
        const updates: any = {};
        updates[`${lessonUrl}/parentComment`] = parentComment || '';
        updates[`${lessonUrl}/studentComment`] = studentComment || '';
        updates[`${lessonUrl}/lessonGrade`] = lessonGrade || '';
        updates[`${lessonUrl}/homeworkGrade`] = homeworkGrade || '';
        return update(ref(database), updates);
    }

    const saveAndQuit = () => {
        updateData().then(
            () => {
                updateData();
                navigation.goBack()
            }
        ).catch(
            () => {
                Alert.alert('Не удалось сохранить изменения')
            }
        )
    }

    useEffect(()=>{
        const lessonRef = ref(database, lessonUrl);
    
        get(lessonRef).then((data: DataSnapshot) => {
            if (data.exists() && data.val()){
                const commentData:ICommentDataSnapshot = data.val();
                setParentComment(commentData.parentComment);
                setStudentComment(commentData.studentComment);
                setLessonGrade(commentData.lessonGrade);
                setHomeworkGrade(commentData.homeworkGrade);
            }
        })
    },
        []
    )

    return(

        <View style = {styles.container}>            
            {
                role === Role.TEACHER ?
                <>
                    <TextInput
                        style = {styles.input}
                        multiline
                        placeholder="Оставить комментарий родителю"
                        numberOfLines={4}
                        onChangeText={(text)=>setParentComment(text)}
                        value={parentComment}
                    /> 
                    <TextInput
                        style = {styles.input}
                        multiline
                        placeholder="Оставить комментарий ученику"
                        numberOfLines={4}
                        onChangeText={(text)=>setStudentComment(text)}
                        value={studentComment}
                    />
                </>
                :
                null
            }
            {
                role === Role.STUDENT ?
                    <View style={styles.commentCard}>
                        <Text
                            style = {styles.commentText}
                        >
                            {studentComment}
                        </Text>
                    </View> : null
            }

            {
                role === Role.PARENT ?
                    <View style={styles.commentCard}>
                        <Text
                            style = {styles.commentText}
                        >
                            {parentComment}
                        </Text>
                    </View> : null
            }

            <View style = {styles.box}>
                <Text style = {styles.text}>Оценка за занятие: </Text>
                {
                    role === Role.TEACHER ?
                    <TextInput
                        style = {styles.input2}
                        onChangeText={(text)=>setLessonGrade(text)}
                        value={lessonGrade}
                    /> :
                    <View style={styles.gradeView}>
                        <Text style={styles.gradeText}>
                            {lessonGrade}
                        </Text>
                    </View>
                }
            </View>

            <View style = {styles.box}>
                <Text style = {styles.text}>Оценка за дз: </Text>

                {
                    role === Role.TEACHER ?
                    <TextInput
                        style = {styles.input2}
                        onChangeText={(text)=>setHomeworkGrade(text)}
                        value={homeworkGrade}
                    /> :
                    <View style={styles.gradeView}>
                        <Text style={styles.gradeText}>
                            {homeworkGrade}
                        </Text>
                    </View>
                }
            </View>
            {
                role === Role.TEACHER ?
                    <TouchableOpacity style = {styles.escape} onPress={saveAndQuit}>
                        <Text style={styles.buttonText}>Сохранить и выйти</Text>
                    </TouchableOpacity> :
                    null
            }
            

        </View> 
    )
}

const mapStateToProps = (state: ICommentScreenState) => {
    return ({
        role: state.userData.role,
    })
}

export default connect(mapStateToProps, null)(CommentScreen);