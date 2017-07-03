import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loggedInText: {
        textAlign: 'center',
        marginBottom: 40
    },
    button: {
        height: 40,
        width: 140,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00ADEF',
        borderRadius: 20,
        backgroundColor: 'white',
    },
    buttonText: {
        color: '#00ADEF',
        backgroundColor: 'transparent'
    },
});