import React, { useEffect, useState } from "react";
import {Modal, TouchableOpacity, Text, View, TextInput, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import {Picker} from '@react-native-picker/picker';

import { IAddLessonModalProps } from "./AddLessonModal.typings";
import styles from './AddLessonModal.styles';

import {initializeApp} from 'firebase/app';
import { getDatabase, ref, set, push, get, DataSnapshot, update, onValue } from "firebase/database";
import { Role } from "../../types/commonTypes";

//TODO: Задизайнить создание в два слайда

const firebaseConfig = {
  apiKey: "AIzaSyAivEwul2qk3jLZkQ2VkEXz0WgYnCBHtHI",
  authDomain: "tutorapp-1a8fc.firebaseapp.com",
  projectId: "tutorapp-1a8fc",
  storageBucket: "tutorapp-1a8fc.appspot.com",
  messagingSenderId: "516220622349",
  appId: "1:516220622349:web:2ba23a253c9ea64828a744",
  measurementId: "G-8L4VST9H40",
  databaseURL: "https://tutorapp-1a8fc-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function createNewLesson(name: string, data: Date, time: Date,
    format: string, place: string,lesson: string,  ) {
    
    const lessonsListRef = ref(database,  `Ученики/${name}` );

    const newPostRef = push(lessonsListRef);

    set(newPostRef, {
      student: name,
      data: data.toDateString(),
      lessonTime: time.toTimeString(),
      format: format,
      place: place,
      subject: lesson,
    });
}


export const AddLessonModal = (props: IAddLessonModalProps) => {
    const [students, setStudents] = useState([])

    const [date,changeDate]= useState<Date>(new Date())
    const [time,changeTime]= useState<Date>(new Date())
    const [format,changeFormat]= useState('');
    const [place,changePlace]= useState('');
    const [lesson,changeLesson]= useState('');
    const [student, setStudent] = useState('');


    const onChangeFormat = (text: string) => {changeFormat(text)}
    const onChangePlace = (text: string) => {changePlace(text)}
    const onChangeLesson = (text: string) => {changeLesson(text)}

    const { isVisible, setVisible, lessonUrl, edit } = props;


    useEffect(() => {
        console.log('#F1', props);
        if (props.date) {
            changeDate(props.date);
        }
        if (props.time) {
            changeTime(props.time);
        }
        if (props.format) {
            changeFormat(props.format);
        }
        if (props.lesson) {
            changeLesson(props.lesson);
        }
        if (props.place) {
            changePlace(props.place);
        }
        if (props.student) {
            setStudent(props.student);
        }
        onValue(ref(database, 'users'),(snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                //Object.values(data).filter(el => el.role === Role.STUDENT).map(el => el.username)
                setStudents(Object.values(data).filter(el => el.role === Role.STUDENT).map(el => el.username))
            } else {
                Alert.alert('Ошибка при получении списка учеников')
            }
        })
    },[])

    useEffect(() => {
        if (props.date) {
            changeDate(props.date);
        }
        if (props.time) {
            changeTime(props.time);
        }
        if (props.format) {
            changeFormat(props.format);
        }
        if (props.lesson) {
            changeLesson(props.lesson);
        }
        if (props.place) {
            changePlace(props.place);
        }
        if (props.student) {
            setStudent(props.student);
        }
    },[
        isVisible
    ])

    const updateLesson = () => {
        const updates: any = {};
        updates[`${lessonUrl}/data`] = date.toDateString();
        updates[`${lessonUrl}/lessonTime`] = time.toTimeString(),
        updates[`${lessonUrl}/format`] = format;
        updates[`${lessonUrl}/place`] = place;
        updates[`${lessonUrl}/subject`] = lesson;
        return update(ref(database), updates);
    };

    return(
        <Modal
            visible={isVisible}
            animationType="fade"
			transparent={true}
			style={{alignSelf: 'center', height: '100%'}}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>         
                        <View style={[styles.card]}>
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Ученик</Text>
                                {/* <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={onChangeStudent}
                                /> */}
                                {
                                    props.edit ? 
                                    <View> 
                                        <Text style={styles.text}>
                                            {student}
                                        </Text>
                                    </View> :
                                    <Picker
                                        style={styles.picker}
                                        itemStyle={{fontSize: 20, height: 120}}
                                        selectedValue={student}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setStudent(itemValue)
                                        }
                                    >
                                        {
                                            students.map(el => (
                                                <Picker.Item label={el} value={el} key={el}/>
                                            ))
                                        }
                                    </Picker>
                                }
                            </View>
                            
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Дата</Text>

                                <DateTimePicker
                                    textColor="black"
                                    locale="ru-RU"
                                    style={styles.datePicker}
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={'date'}
                                    display="spinner"
                                    onChange={(_, date) => {
                                        date  && changeDate(date);
                                    }
                                    }
                                />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Время</Text>
                                <DateTimePicker
                                    textColor="black"
                                    locale="ru-RU"
                                    style={styles.timePicker}
                                    testID="dateTimePicker"
                                    value={time}
                                    mode={'time'}
                                    display="spinner"
                                    onChange={(_, time) => {
                                        time && changeTime(time);
                                    }
                                    }
                                />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Формат</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={onChangeFormat}
                                    value={format}
                                />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Место</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={onChangePlace}
                                    value={place}
                                />
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.titleText}>Урок</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder=""
                                    onChangeText={onChangeLesson}
                                    value={lesson}
                                />
                            </View>
                        </View>


                        <View style = {styles.content}> 
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                edit ?
                                    updateLesson() : 
                                    createNewLesson(student,date,time,format,place,lesson)
                                setVisible(false)
                            }}
                        >
                            <Text style={styles.textB}>Сохранить и выйти</Text>
                        </TouchableOpacity>
                        


                        <TouchableOpacity
                            style={styles.button}
                                onPress={()=>{
                                    setVisible(false)
                                }}
                            >
                                <Text style={styles.textB}>Выйти</Text>
                            

                        </TouchableOpacity>
                        </View>

                    </View>


                
            </View>
        </Modal>
    )

}