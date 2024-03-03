import React from "react";
import {View, Text, TouchableOpacity} from 'react-native';

import styles from "./AddPersonButton.styles";
import { IAddPersonButtonProps } from "./AddPersonButton.typings"; 

export const AddPersonButton = (props: IAddPersonButtonProps) => {
    
    const {onAddPersonButtonPress} = props;

    return(
        <TouchableOpacity
            style={styles.card}
            onPress={onAddPersonButtonPress}
        >
            
            <Text style={styles.text}>
                +
            </Text>
            
        </TouchableOpacity>

        
    )
};