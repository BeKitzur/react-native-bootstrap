import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    checkingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        marginTop: 100,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    button: {
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#00ADEF',
        borderRadius: 20,
        backgroundColor: '#00ADEF',
    },
    buttonText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    inputContainer: {
        height: 36,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 20
    },
    input: {
        height: 36,
        fontSize: 18,
        color: '#00ADEF'
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20
    }
});