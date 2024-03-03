import React, {useState, useEffect} from "react";
import {
    View,
    Button,
    TouchableOpacity,
    FlatList,
    ImageBackground,
} from 'react-native';

import { connect } from "react-redux";

import { ref as sRef, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { ref as refDB, push, set, onValue, remove } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesome } from '@expo/vector-icons';

import styles from "./SolutionScreen.styles";
import { ISolutionScreenProps, ISolutionScreenState } from "./SolutionScreen.typings";
import { Role } from "../../types/commonTypes";

const SolutionScreen = (props: ISolutionScreenProps) => {
    const {lessonUrl, lessonId} = props.route.params;

    const {role, database, navigation, storage} = props;

    const [images, setImages] = useState<Array<{uri: string, id: string}>>([]);
    const [loadedImages, setLoadedImages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const imagesRef = refDB(database,  `${lessonUrl}/solution/photos` );
    
    useEffect(() => {
        onValue(imagesRef, (snapshot)=> {
            if (snapshot.exists()){
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
            }
        })
    },[])

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
        }).then(result => {
            if (!result.canceled) {
                setIsLoading(true);
                Promise.all(result.assets.map(
                    (el, index) => uploadImageAsync(el.uri, index)
                )).then(()=> {
                    setIsLoading(false);
                })
            }
        }).catch((e) => {
            console.log(e)
        })
    }


    const showFullscreen = (uri: string) => {
        navigation.navigate("ImageViewer", {url: uri})
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

        //console.log(sRef(props.storage, 'tasks/1.jpg'));
        try {
            const storageImagesRef = sRef(props.storage, `solution/${lessonId}/${images.length + index}.jpg`);

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
                    console.log(url);
                    
                    const newTaskPhotoRef = push(imagesRef);

                    set(newTaskPhotoRef, url);
                })
            }
            );

        } catch (e){
            console.log('upload task error', e);
        }
    }

    const removePhoto = (item: {uri: string, id: string}) => {
        deleteObject(sRef(storage, item.uri));
        remove(refDB(database,`${lessonUrl}/solution/photos/${item.id}`));
    }

    useEffect(()=>{
        if (loadedImages < images.length){
            setIsLoading(true);
        } else {
            setIsLoading(false);
        }
    }, [loadedImages])
    return (
        <View style={styles.mainContainer}>
            <Spinner
                visible={isLoading}
                textContent={'Загружаем фото...'}
                textStyle={styles.spinnerTextStyle}
            />
            { 
                role === Role.STUDENT ?
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
                                    role === Role.STUDENT ?
                                    <TouchableOpacity
                                        style={styles.deleteButton}
                                        onPress={() => removePhoto(item)}
                                    >
                                        <FontAwesome
                                            name="trash"
                                            size={24}
                                            color="white"
                                        />
                                    </TouchableOpacity>:
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

const mapStateToProps = (state: ISolutionScreenState) => {
    return {
        role: state.userData.role,
    }
}

export default connect(mapStateToProps, null)(SolutionScreen);
