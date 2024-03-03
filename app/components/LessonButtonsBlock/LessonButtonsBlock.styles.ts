import { StyleSheet, Dimensions } from "react-native"
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    card: {
        width: (width - 50)/2,
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#5363BA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    card2: {
        width: '90%',
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#5363BA',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    card3: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    text: {
        color: 'white',
        fontSize: 20,
        
    },

})
export default styles