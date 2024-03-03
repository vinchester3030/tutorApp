import React, {useState, useEffect} from "react";
import { View, FlatList, TouchableOpacity, Text} from 'react-native';
import { ref, onValue } from "firebase/database";
import { connect } from 'react-redux';

import { LessonPreviewCard } from "../../components/LessonPreviewCard/LessonPreviewCard";

import styles from "./HomeScreen.styles";
import { HomeScreenState, IHomeScreenProps, Lesson, RawData, RawLesson } from "./HomeScreen.typings";

import { AddLessonButton } from "../../components/AddLessonButton/AddLessonButton";
import { AddLessonModal } from "../../components/AddLessonModal/AddLessonModal";

import { AddPersonButton } from "../../components/AddPersonButton/AddPersonButton";
import { AddPersonModal } from "../../components/AddPersonModal/AddPersonModal";

import { Role } from "../../types/commonTypes";

import { quit } from '../../redux/actions/userDataActions';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";


const HomeScreen = (props: IHomeScreenProps) => {
    const [isAddLessonModalVisible, setAddLessonModalVisible] = useState(false)
    const [isAddPersonModalVisible, setAddPersonModalVisible] = useState(false)
    const { database, role, name, childName } = props;

    const navigation: NavigationProp<RootStackParamList>= useNavigation();

    const onAddButton = () => {
        setAddLessonModalVisible(true)
    }

    const onAddButton2 = () => {
        setAddPersonModalVisible(true)
    }


    const [lessons, setLessons] = useState<Lesson[]>([])

    const quit = () => {
        props.quit();
        navigation.navigate('Auth');
    }

    useEffect(()=>{
        const lessonRef = ref(database, 'Ученики/');
    
        onValue(lessonRef, (x) => {

            const data:RawData = x.val();
            if (data) {
                let dataArray = Object.entries(data);

                console.log(props)

                if (role === Role.STUDENT) {
                    dataArray = dataArray.filter(el => el[0] === name);
                } else if (role === Role.PARENT) {
                    dataArray = dataArray.filter(el => el[0] === childName);
                }

                const filteredLessons: Array<Lesson[]> = dataArray.map((el)=>{
                    const c = Object.entries(el[1]);
                    const b: Array<Lesson> = c.map((el2)=>{
                        const date = new Date(el2[1].data);
                        const name = el2[1].student;
                        const lesson = el2[1].subject;
                        const id = el2[0];
                        return  {id, date, name, lesson}
                    });
                    
                    return b;
                })
                setLessons(filteredLessons.flat());
            }
           
        });
      }, [role, name, childName])
    return (
        <>
            <View style={styles.container}>
                <FlatList
                    data={lessons}
                    renderItem={({item, index}) => {
                    return(
                        <LessonPreviewCard
                            key={index}
                            {...item}
                        />)
                    }}
                    ListFooterComponent={
                        <>
                        {
                            role === Role.TEACHER ?
                                <View style = {styles.container2}>
                                    <AddLessonButton
                                        onAddLessonButtonPress={onAddButton}
                                    />
                                    <AddPersonButton
                                        onAddPersonButtonPress={onAddButton2}
                                    />
                                </View> :
                                null
                        }
                        <TouchableOpacity
                            style={styles.quitButton}
                            onPress={quit}
                        >
                            <Text style={styles.quitButtonText}>
                                Выйти
                            </Text>
                        </TouchableOpacity>
                        </>
                    }
                /> 
            </View>
            <AddLessonModal
                isVisible={isAddLessonModalVisible}
                setVisible={setAddLessonModalVisible}
            />
            <AddPersonModal
                isVisible={isAddPersonModalVisible}
                setVisible={setAddPersonModalVisible}
            />
        </>
        
    )
}

const mapStateToProps = (state: HomeScreenState) => {
    return {
        name: state.userData.name,
        role: state.userData.role,
        childName: state.userData.childName,
    };
};

const mapDispatchToProps = {
    quit: quit,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);