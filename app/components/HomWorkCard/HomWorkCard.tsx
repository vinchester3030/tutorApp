import React from "react";
import { View,Text } from "react-native";
import { getRusShortDate } from '../../utils/getRusShortDate';
import { getRusShortDay } from '../../utils/getRusShortDay';
import { getTime } from "../../utils/getTime";
import {IHomWorkCard} from './HomWorkCard.typings'
import styles from "./HomWorkCard.styles";

export const HomWorkCard = (props: IHomWorkCard) =>{
    const {date,Hwork} = props;
    const dated = getRusShortDay(date)+', '+ getRusShortDate(date);
    return(
        <View style = {[styles.card]}>
            <Text style ={styles.title} >Домашнее задание</Text>
            <View style = {[styles.content]}>
                <Text style = {[styles.text]}>Срок сдачи</Text>
                <Text style = {[styles.text]}>{dated} </Text>
            </View>
            <View style = {[styles.content2]}>
                <Text style = {[styles.text2]}>{Hwork}</Text>
            </View>
            <Text style = {[styles.text]}>Просмотреть отправленное</Text>
            <Text style = {[styles.text]}>Отправить задание</Text>
        </View>
    )
}