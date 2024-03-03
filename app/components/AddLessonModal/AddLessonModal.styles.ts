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
        color: 'white'
    },
    button: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#8495EC',
        padding: 10,
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
        textAlign: 'center',
    },
    card: {
        width: '100%',
        borderRadius: 20,
    },
    titleText: {
        color: 'black',
        fontSize: 23,
        fontWeight: 'bold'
    },
    text: {
        color: 'black',
        fontSize: 20,
    },
    content: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',

    },
    
    datePicker: {
		alignSelf: 'center',
		width: '100%',
		height: 100,
        justifyContent: 'center'
	},

    timePicker: {
		alignSelf: 'center',
		width: '100%',
        maxHeight: 100,
		//height: 100,
        justifyContent: 'center',
	},
    picker: {
		width: '100%',
	},
})

export default styles;
