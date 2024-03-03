import React, {useState} from "react";

import { TouchableOpacity, Text, View } from "react-native";
import styles from "./Counter.styles";

export const Counter = () => {
    const [currentValue, setCurrentValue] = useState(0);
    const onButtonPress = () => {
        setCurrentValue(currentValue + 1);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.counterValue}>{currentValue}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={onButtonPress}
            >
                <Text>+</Text>
            </TouchableOpacity>
        </View>
    )
}