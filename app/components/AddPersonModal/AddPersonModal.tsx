import React, { useState } from "react";

import {Modal, TouchableOpacity, Text, View, TextInput} from 'react-native';
import { IAddPersonModalProps } from "./AddPersonModal.typings";
import styles from './AddPersonModal.styles';

import {initializeApp} from 'firebase/app';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { Role } from "../../types/commonTypes";


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

function createNewPerson(name: string, key: string, parentKey: string){
    //TODO: добавить вариан для родителя
    set(ref(database, 'users/' + key), {
      username: name,
      key:key,
      role: Role.STUDENT,
    });

    set(ref(database, 'users/' + parentKey), {
        childName: name,
        childKey: key,
        role: Role.PARENT,
      });
}


export const AddPersonModal = (props: IAddPersonModalProps) => {
    const [person,setPerson]= useState('');
    const [key,changeKey]= useState('');
    const [parentKey, setParentKey]= useState('');
    
    const onChangePerson = (text: string) => {setPerson(text)}
    const onChangeKey = (text: string) => {changeKey(text)}
    //const onChangeParentKey = (text: string) => {setP(text)}

    const { isVisible, setVisible} = props;
    return(
        <Modal
            visible={isVisible}
            animationType="fade"
			transparent={true}
			style={{alignSelf: 'center', height: '100%'}}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>                    
                    <View style={styles.card}>
                        <View style={styles.content}>
                            <Text style={styles.text}>Пользователь</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                onChangeText={onChangePerson}
                            />
                        </View>
                        
                        <View style={styles.content}>
                            <Text style={styles.text}>Ключ для ученика</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                onChangeText={onChangeKey}
                            />
                        </View>
                        <View style={styles.content}>
                            <Text style={styles.text}>Ключ для родителя</Text>
                            <TextInput
                                style={styles.input}
                                placeholder=""
                                onChangeText={setParentKey}
                            />
                        </View>
                    </View>
                    <View style = {styles.content}> 
                        <TouchableOpacity
                            style={styles.button}
                            onPress={()=>{
                                createNewPerson(person,key, parentKey)
                                setVisible(false);
                            }}
                        >
                        <Text style={styles.textB}>Сохранить и выйти</Text>
                    </TouchableOpacity>
                    


                    <TouchableOpacity
                        style={styles.button}
                            onPress={()=>{
                                setVisible(false);
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