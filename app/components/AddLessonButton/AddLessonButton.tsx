import React from "react";
import {Text, TouchableOpacity} from 'react-native';


import { IAddLessonButtonProps } from "./AddLessonButton.typings";
import styles from "./AddLessonButton.styles";



export const AddLessonButton = (props: IAddLessonButtonProps) => {
    
    const {onAddLessonButtonPress} = props;

    return(
        <TouchableOpacity
            style={styles.card}
            onPress={onAddLessonButtonPress}
        >
            
            <Text style={styles.text}>
                Новое занятие
            </Text>
            
        </TouchableOpacity>

        
    )
};