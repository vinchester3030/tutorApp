import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    centeredView: {
		width: width,
		height: height,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0, 0, 0.3)',
	},
    modalView: {
		width: width * 0.8,
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 20,
		alignSelf: 'center',
		alignItems: 'center',
		shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
    textB:{
        fontWeight: '500',
        fontSize: 20,
        color: '#fff',
    },
    button: {
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#5363BA'
    },
    close: {
        alignItems: 'flex-start',

    },
    input: {
        padding: 8,
        borderWidth: 1,
        borderColor: '#ececec',
        width: '100%',
        borderRadius: 10,
        margin: 2,
        textAlign: 'center'
    },
    card: {
        width: '100%',
        borderRadius: 20,
        padding: 10,
   
        marginBottom: 10
    },
    text: {
        color: 'black',
        fontSize: 23,
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    
   
})

export default styles;
