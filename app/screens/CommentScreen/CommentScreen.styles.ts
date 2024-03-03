import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    box: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '65%',
    },
    escape: {
        //width: '%',
        marginTop: 20,
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        borderRadius: 20,
        backgroundColor: '#8495EC',
        paddingHorizontal: 10,
    },
    text:{
        fontSize:20,
        marginVertical:10,   
    },
    text2:{
        fontWeight: '500',
        fontSize: 30,
        
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        padding: 10,
    },
    input: {
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: '85%',
        minHeight: 200,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
    },
    input2: {
        borderRadius: 10,
        padding: 10,
        width: 40,
        textAlign: 'center',
        backgroundColor: '#fff',
        shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
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
    },
    commentCard: {
        width: '100%',
        backgroundColor: '#fff',
        shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
        padding: 10,
        borderRadius: 20,
        minHeight: 100,
    },
    commentText: {
        fontSize: 16,
    },
    gradeView: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 40,
        alignItems: 'center',
        shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
    },
    gradeText: {
        fontSize: 16
    },


})
export default styles