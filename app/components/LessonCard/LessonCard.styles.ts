import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: '90%',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#5363BA',
        marginBottom: 20
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },
    text: {
        color: 'white',
        padding: 5,
        fontSize: 23,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    iconsBlock: {
        flexDirection: 'row-reverse',
        width: '100%'
    },
    iconButton: {
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 10,
    }
})

export default styles;
