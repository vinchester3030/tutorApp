import React, {useEffect, useState} from "react";
import {
    Button,
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Text,
    ImageBackground,
} from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import { ref as sRef, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ref as refDB, push, set, onValue, update, get, DataSnapshot, remove } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';

import { ITeacherHomeworkScreenProps, ITeacherHomeworkScreenState } from "./TeacherHomeworkScreen.typings";

import styles from './TeacherHomeworkScreen.styles';
import { connect } from "react-redux";
import { Role } from "../../types/commonTypes";


const TeacherHomeworkScreen = (props: ITeacherHomeworkScreenProps) => {

    const {lessonUrl, lessonId} = props.route.params;

    const {role, database, navigation, storage} = props;

    const [images, setImages] = useState<Array<{uri: string, id: string}>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadedImages, setLoadedImages] = useState(0);
    const [task, setTask] = useState('');

    const imagesRef = refDB(database,  `${lessonUrl}/task/photos` );
    
    useEffect(()=>{
        if (loadedImages < images.length){
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loadedImages])

    useEffect(() => {
        onValue(imagesRef, (snapshot)=> {
            const data = snapshot.val();
            if (data){
                setImages(Object.entries(data).map(
                    el => {
                        return {
                            uri: el[1] as string,
                            id: el[0],
                        }
                    }
                ));
            }
        })

        get(refDB(database, `${lessonUrl}/task/textTask`)).then(
            (data:  DataSnapshot) =>{
                if (data.exists() && data.val()){
                    setTask(data.val())
                }
            })
    },[])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        });

        if (!result.canceled) {
            setIsLoading(true);
            Promise.all(result.assets.map(
                (el, index) => uploadImageAsync(el.uri, index)
            )).then(()=> {
                setIsLoading(false);
            })
        }
    };

    const showFullscreen = (uri: string) => {
        navigation.navigate("ImageViewer", {url: uri})
    }

    const save = () => {
        const updates: any = {};
        updates[`${lessonUrl}/task/textTask`] = task;
        return update(refDB(database), updates);
    }

    async function uploadImageAsync(uri: string, index: number) {
        setIsLoading(true);
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        

        const metadata = {
            contentType: 'image/jpeg'
        };

        try {
            const storageImagesRef = sRef(props.storage, `tasks/${lessonId}/${images.length + index}.jpg`);

            const uploadTask = uploadBytesResumable(storageImagesRef, blob, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
            (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                switch (snapshot.state) {
                    case 'paused':
                    console.log('Upload is paused');
                    break;
                    case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
            // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(url => {                    
                    const newTaskPhotoRef = push(imagesRef);

                    set(newTaskPhotoRef, url);
                    // url && push(refDB(props.dat
                })
            }
            );

        } catch (e){
            console.log('upload task error', e);
        }
    }

    const removePhoto = (item: {uri: string, id: string}) => {
        deleteObject(sRef(storage, item.uri));
        remove(refDB(database,`${lessonUrl}/task/photos/${item.id}`));
    }

    return (
        <View style={styles.mainContainer}>
            <Spinner
                visible={isLoading}
                textContent={'Загружаем фото...'}
                textStyle={styles.spinnerTextStyle}
            />
            { role === Role.TEACHER ?
                <>
                    <TextInput 
                        multiline
                        value={task}
                        style={styles.input}
                        onChangeText={(text) => setTask(text)}
                        placeholder="Задание"
                    />
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={save}
                    >
                        <Text style={styles.saveButtonText}>
                            Сохранить
                        </Text>
                    </TouchableOpacity>
                </> :
                <View style={styles.taskContainer}>
                    <Text
                        style={styles.taskText}
                    >
                        {task}
                    </Text>
                </View>
            }
            { 
                role === Role.TEACHER ? 
                    <Button title="Добавить фото" onPress={pickImage} /> :
                    null
            }
            <FlatList 
                data={images}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => showFullscreen(item.uri)} style={styles.imageContainer} key={index}>
                            <ImageBackground
                                source={{ uri: item.uri }}
                                style={styles.image} 
                                borderRadius={30}
                                onLoadStart={()=>setIsLoading(true)}
                                onLoadEnd={() => setLoadedImages(prev => prev + 1)}
                            >
                                { 
                                    role === Role.TEACHER ?
                                        <TouchableOpacity
                                            style={styles.deleteButton}
                                            onPress={() => removePhoto(item)}
                                        >
                                            <FontAwesome
                                                name="trash"
                                                size={24}
                                                color="white"
                                            />
                                        </TouchableOpacity> :
                                        null
                                }
                            </ImageBackground>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const mapStateToProps = (state: ITeacherHomeworkScreenState) => {
    return {
        role: state.userData.role,
    }
}

export default connect(mapStateToProps, null)(TeacherHomeworkScreen);