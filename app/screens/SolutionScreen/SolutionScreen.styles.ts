import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    container:{
        width: '100%',
        height: '100%',

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'red'
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
        borderRadius: 30,
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    deleteButton: {
        position: 'relative',
        top: 10,
        left: 10
    }
});

export default styles;