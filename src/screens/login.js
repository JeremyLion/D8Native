import React, { Component } from "react";
import { Image, StyleSheet, Dimensions, StatusBar } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import Block from "../components/Block"
const { width } = Dimensions.get('window');

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            credentials: {
                username: '',
                password: ''
            },
            loading: false,
        }
    }

    handleChange(name, value) {
        this.setState({
            credentials: { ...this.state.credentials, [name]: value }
        })
    }

    submitHandler(e) {
        const { credentials } = this.state;
        this.props.dispatch(loginUser(credentials))
    }

    render() {
        return (
            <Block
                enabled
                behavior="padding"
                style={{ flex: 1 }}>
                <StatusBar barStyle="light-content" translucent={true} />
                <Block center middle>
                    <Block center style={{ marginTop: 100, height: 200, width: 200 }}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ height: 227, width: 239, resizeMode: 'stretch'}}
                        />

                    </Block>
                    <Block flex={ 1.5 } style={{ ...styles.container }}>
                        <Block center style={{ ...styles.container, marginTop: 20 }}>
                            <Input
                                label="Username"
                                containerStyle={ styles.inputContainer }
                                labelStyle={ styles.labelStyle }
                                inputStyle={ styles.inputStyle }
                                onChangeText={ (txt) => this.handleChange("username", txt) }
                                value={ this.state.credentials.username }
                            />
                            <Input
                                label="Password"
                                secureTextEntry={ true }
                                labelStyle={ styles.labelStyle }
                                containerStyle={ styles.inputContainer }
                                inputStyle={ styles.inputStyle }
                                onChangeText={ (txt) => this.handleChange("password", txt) }
                                value={ this.state.credentials.password }
                            />
                            <Text
                                style={{ ...styles.textBtns, ...styles.forgotBtn }}>Forgot password?</Text>
                            <Button
                                title="Login"
                                type="outline"
                                titleStyle={{ color: '#000' }}
                                buttonStyle={ styles.loginBtn }
                                onPress={ this.submitHandler.bind(this) }
                            />
                            <Block center>
                                <Text style={ styles.textBtns }>
                                    Don't have an account? <Text
                                        height={ 18 }
                                        color="blue"
                                        onPress={ () => navigation.navigate('Register') } >
                                          Sign up
                                    </Text>
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50

    },
    inputContainer: {
        marginTop: 20,
        width: '100%',
    },
    inputStyle: {
        color: '#000'
    },
    labelStyle: {
        color: '#000',
        fontSize: 14,
    },
    textBtns: {
        color: '#000',
        marginTop: 30,
    },
    forgotBtn: {
        marginTop: 20,
        marginBottom: 20,
        width: width - 70,
        color: '#666666',
        textAlign:'right'
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#eee',
        shadowColor: 'rgba(0,0,0, .1)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 1,
        shadowRadius: 1,
        width: width - 70
    }
});


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Login);