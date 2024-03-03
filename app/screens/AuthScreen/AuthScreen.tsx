import React, {useState, useEffect} from "react";

import { TouchableOpacity, Text, View, TextInput, Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ref, get, DataSnapshot } from "firebase/database";
import { connect } from 'react-redux';

import { AuthScreenProps } from "./AuthScreen.typings";

import {
    setKey,
    setName,
    setRole,
    setChildKey,
    setChildName,
} from '../../redux/actions/userDataActions';
import { RootStackParamList } from "../../types/navigation";

import styles from "./AuthScreen.styles";
import { Role } from "../../types/commonTypes";

const AuthScreen = (props: AuthScreenProps) => {
    const navigation: NavigationProp<RootStackParamList>= useNavigation();
    const [key, setKey] = useState('');

    const onButtonPress = () => {
        get(ref(props.database, `users/${key}`)).then((snapshot: DataSnapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                Promise.all([
                    props.setRole(data.role),
                    data.role === Role.PARENT ?
                        props.setChildName(data.childName) :
                        props.setName(data.username),
                    data.role === Role.PARENT ?
                        props.setChildKey(data.childKey) :
                        props.setKey(data.key),

                ]).then(() => {
                    navigation?.navigate('Home');
                })
                
            } else {
                Alert.alert('Неверный ключ')
            }
        })
    }

    const onChangeKey = (text: string) => {
        setKey(text)
    }




    return(
        <View style={styles.container}>
            <Text style={styles.title}>Авторизация</Text>
            <TextInput
                style={styles.input}
                placeholder="Ключ доступа"
                onChangeText={onChangeKey}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={onButtonPress}
                
            >
                <Text style={styles.buttonText}>Войти</Text>

            </TouchableOpacity>
        </View>
    )
}

const mapDispatchToProps = {
	setKey: setKey,
    setName: setName,
    setChildKey: setChildKey,
    setChildName: setChildName,
    setRole: setRole,
};

export default connect(null, mapDispatchToProps)(AuthScreen);