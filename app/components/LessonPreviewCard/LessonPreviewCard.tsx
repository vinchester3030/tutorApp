import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { getRusShortDay } from "../../utils/getRusShortDay";
import { getRusShortDate } from "../../utils/getRusShortDate";
import { ILessonPreviewCardProps } from "./LessonPreviewCard.typings";

import styles from "./LessonPreviewCard.styles";
import { getStudentColor } from "./utils/getStudentColor";


export const LessonPreviewCard = (props: ILessonPreviewCardProps) => {
    const navigation = useNavigation()
    const {date, name, lesson, id} = props;
    
    const title = getRusShortDay(date) + ', ' + getRusShortDate(date);
    const onCardPress = () =>{
        navigation.navigate("Lesson", {id, name});
    }
    
    return(
        <TouchableOpacity
            style={[styles.card, {backgroundColor: getStudentColor(name)}]}
            onPress={onCardPress}
        >
            <Text style={styles.title}>{title}</Text>
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.lesson}>{lesson}</Text>
            </View>
        </TouchableOpacity>
    )
};

// export const Les = () => {
//     return <Text>HELLO</Text>
// }
