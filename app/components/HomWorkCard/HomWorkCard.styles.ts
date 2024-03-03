import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    card:{
        width: '90%',
        backgroundColor: 'white',
        borderColor: 'red',
        borderWidth: 2,
        padding: 10,
        borderRadius: 20
    },
    title:{
        color: '#5363BA',
        fontSize: 28,
        fontWeight: 'bold'
    },
    text:{
        color: '#5363BA',
        fontSize: 20,
    },
    text2:{
        color: '#15161B',
        fontSize: 20,
        fontStyle: 'italic',
    },
    content:{
        flexDirection: 'row',
        width:'100%',
        justifyContent: 'space-between'
    },
    content2:{
        flexDirection: 'column',
        width:'100%',
        justifyContent: 'center',
        alignItems: 'center',
    }

})


export default styles