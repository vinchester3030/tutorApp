import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        color: '#8495EC',
    },
    button: {
        width: '50%',
        
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8495EC',
        borderRadius: 20,
        borderWidth: 1,
    },
    container: {
        width: '100%',
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',

        paddingHorizontal: 20,
        paddingVertical: 40,
        backgroundColor: 'white'
    },
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ececec',
        marginVertical: 10,
        width: '70%',
        borderRadius: 10
    },
    container2: {
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius:22,
        backgroundColor: '#C0C0C0',

        flexDirection: 'row',
        paddingBottom:0,
 
    },
    quitButtonText: {
        color: '#00e',
        fontSize: 16
    },
    quitButton: {
        alignSelf: 'center',
        margin: 10,
    }

})


export default styles