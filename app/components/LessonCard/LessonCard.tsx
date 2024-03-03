import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import { getRusShortDay } from "../../utils/getRusShortDay";
import { getRusShortDate } from "../../utils/getRusShortDate";

import { ILessonCardProps, ILessonCardState } from "./LessonCard.typings";
import styles from "./LessonCard.styles";
import { Role } from "../../types/commonTypes";
import { connect } from "react-redux";

const LessonCard = (props: ILessonCardProps) => {
   
    const {
        date,
        isOnline = false,
        place = '',
        lesson = '',
        time,
        onEdit,
        onDelete,
        role,
    } = props;
    const dated = date ? getRusShortDay(date) + ', ' + getRusShortDate(date) : '';


    return(
        <View style={[styles.card]}>
            {
                role === Role.TEACHER ?
                <View style={styles.iconsBlock}>
                    <TouchableOpacity style={styles.iconButton}>
                        <FontAwesome5
                            name="edit"
                            size={24}
                            color="white"
                            onPress={onEdit}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={onDelete}
                    >
                        <FontAwesome
                            name="trash"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>

                </View> :
                null
            }
            
            <Text style={styles.title}>Общая информация</Text>
            <View style={styles.content}>
                <Text style={styles.text}>Дата</Text>
                <Text style={styles.text}>{dated}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Время</Text>
                <Text style={styles.text}>{ time ?? ''}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Формат</Text>
                <Text style={styles.text}>
                    {isOnline ? 'Онлайн' : 'Очно'}
                </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Место</Text>
                <Text style={styles.text}>{place}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.text}>Урок</Text>
                <Text style={styles.text}>{lesson}</Text>
            </View>
        </View>
    )
};

const mapStateToProps = (state: ILessonCardState) => {
    return {
        role: state.userData.role,
    }
}

export default connect(mapStateToProps, null)(LessonCard);