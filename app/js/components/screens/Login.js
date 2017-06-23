import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import appFirebase from '../../firebase';
import { NavigationActions } from 'react-navigation';

const isIOS = Platform.OS === 'ios';

class WrappedInput extends Component {
    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    {...this.props}
                    style={styles.input}
                />
            </View>
        );
    }
}

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'admin@admin.com',
            password: 'adminadmin',
            error: null,
            doingLogin: false,
            checkingIsAuthenticated: false
        };
        this.doLogin = this.doLogin.bind(this);
        this.goToAcoountScreen = this.goToAcoountScreen.bind(this);
    }

    static navigationOptions = {
        title: 'Log In'
    };

    goToAcoountScreen() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'account'})
            ]
        });

        this.props.navigation.dispatch(resetAction);
    }

    doLogin() {
        if (this.state.doingLogin) return;

        this.setState({ doingLogin: true });
        appFirebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                user = {
                    uid: user.uid,
                    email: user.email,
                    refreshToken: user.refreshToken
                };

                this.setState({ doingLogin: false });
                AsyncStorage.setItem('user', JSON.stringify(user));

                this.goToAcoountScreen();
            })
            .catch((err) => {
                this.setState({ doingLogin: false });
            });
    }

    componentDidMount() {
        this.setState({ checkingIsAuthenticated: true });

        AsyncStorage.getItem('user').then((user) => {
            this.setState({ checkingIsAuthenticated: false });

            if (user) this.goToAcoountScreen();
        });
    }

    render() {
        if (this.state.checkingIsAuthenticated) {
            return (
                <View style={styles.checkingContainer}>
                    <ActivityIndicator color="#00ADEF" size="large" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.form}>
                        <WrappedInput
                            value={this.state.email}
                            placeholder="Email address"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={(value) => this.setState({ email: value })}
                        />

                        <WrappedInput
                            value={this.state.password}
                            placeholder="Password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(value) => this.setState({ password: value })}
                        />

                        <TouchableOpacity
                            onPress={this.doLogin}
                            style={styles.button}>
                            {
                                this.state.doingLogin ?
                                    <ActivityIndicator color="white" /> :
                                    <Text style={styles.buttonText}>Log In</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    checkingContainer: {
        flex: 1,
        backgroundColor: 'white',
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
        fontSize: 14,
        color: 'white',
        backgroundColor: 'transparent'
    },
    inputContainer: {
        height: 36,
        paddingHorizontal: isIOS ? 10 : 0,
        borderBottomWidth: isIOS ? 1 : 0,
        borderBottomColor: '#ddd',
        marginBottom: 20
    },
    input: {
        height: 36,
        fontSize: 14,
        color: '#00ADEF'
    }
});