import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontWeight: '300',
        fontSize: 20,


    },
    text2:{
        fontWeight: '500',
        fontSize: 30,
    },
    button: {
        backgroundColor: 'red',
        position: 'absolute',
        top: 40,
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
    }



})


export default styles