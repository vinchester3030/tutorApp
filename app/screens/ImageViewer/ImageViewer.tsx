import React, {useState} from "react";

import { Image } from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';

import { styles } from "./ImageViewer.styles";
import { IImageViewerProps } from "./ImageViewer.typings";

export const ImageViewer = (props: IImageViewerProps) => {
    const {url} = props.route.params;

    const [isLoading, setIsLoading] = useState(false)
    return(
        <>
            <Spinner
                visible={isLoading}
            />
            <Image
                source={{ uri: url }}
                style={styles.image}
                resizeMode={'contain'}
                onLoadStart={()=>setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
            />
        </>
    )
}