import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
		width: width,
		height: height,
		alignSelf: 'center',
		justifyContent: 'center',
		alignItems: 'center',
	},
    fullscreenImage: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        width: width - 20,
        height: width*0.56,
        borderRadius: 30,
        marginBottom: 20,
        shadowColor: 'black',
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        //height: '100%',
        borderRadius: 30,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    input: {
        //borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        width: width - 20,
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
    taskContainer: {
        padding: 10,
        margin: 10,
        width: width - 20,
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
        borderRadius: 10,
    },
    taskText: {
        fontSize: 20,
    },
    saveButton: {
        backgroundColor: '#5363BA',
        borderRadius: 20,
        padding: 10,
    },
    saveButtonText: {
        fontSize: 16,
        color: '#fff'
    },
    deleteButton: {
        position: 'relative',
        top: 10,
        left: 10
    }
});

export default styles;