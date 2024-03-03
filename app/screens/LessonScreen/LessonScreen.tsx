import React, {useEffect, useState} from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import styles from "./LessonScreen.styles";
import LessonCard from "../../components/LessonCard/LessonCard";
import LessonButtonsBlock from "../../components/LessonButtonsBlock/LessonButtonsBlock";
import { LessonScreenProps } from "./LessonScreen.typings";
import { onValue, ref, remove } from "firebase/database";
import { AddLessonModal } from "../../components/AddLessonModal/AddLessonModal";

export const LessonScreen = (props: LessonScreenProps) => {
    const [lessonCard, setLessonCard] = useState({})
    const [modalProps, setModalProps] = useState({})
    const [isModalVisible, setIsModalVisible] = useState(false)

    const params = props?.route?.params;
    const {database} = props;

    const timeStrToDate = (timeStr: string) => {
        return new Date(new Date().toISOString().split('T')[0]+'T'+timeStr.split(' ')[0])
    }

    useEffect(()=>{
        const lessonRef = ref(props.database, `Ученики/${params?.name}/${params?.id}`);
    
        onValue(lessonRef, (x) => {
            const data = x.val();
            if (data) {
                setLessonCard({
                    name: data?.student,
                    lesson: data?.subject,
                    isOnline: data?.format === 'Онлайн',
                    date: new Date(data?.data),
                    time: data?.lessonTime?.split(':').splice(0, 2).join(':'),
                    place: data?.place
                });
                setModalProps({
                    student: data?.student,
                    lesson: data?.subject,
                    format: data?.format,
                    date: new Date(data?.data),
                    time: timeStrToDate(data?.lessonTime),
                    place: data?.place
                });
            }
           
        });
      }, [])
    const navigation = useNavigation()

    const deleteLesson = () => {
        remove(ref(database, `Ученики/${params?.name}/${params?.id}`))
        navigation.goBack()
    }
    
    return(
        <>
            <View style={[styles.container]}>
                {lessonCard ? 
                <LessonCard
                    {...lessonCard}
                    onEdit={()=>setIsModalVisible(true)}
                    onDelete={deleteLesson}

                />: null}
                <LessonButtonsBlock
                    lessonUrl={`Ученики/${params?.name}/${params?.id}`}
                    lessonId={params?.id}
                />

            </View>
            <AddLessonModal
                isVisible={isModalVisible}
                setVisible={setIsModalVisible}
                edit={true}
                lessonUrl={`Ученики/${params?.name}/${params?.id}`}
                {...modalProps}
            />
        </>
    )
};