import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        width: '100%',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#8495EC',
        marginBottom: 20
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },
    name: {
        color: 'white',
        fontSize: 25,
    }, 
    lesson: {
        color: 'white',
        fontSize: 25,
    },
    content: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    }
})

export default styles;
