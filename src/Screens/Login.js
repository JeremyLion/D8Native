import React, { Component } from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import Block from "../Components/Block"
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
        const { credentials } = this.state
        this.props.dispatch(loginUser(credentials))
    }

    render() {
        return (
            <Block
                enabled
                behavior="padding"
                style={{ flex: 1 }}>
                <Block center middle style={{ backgroundColor: '#0c0a1c'}}>
                    <Block center style={{ marginTop: 100, height: 200, width: 200 }}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={{ height: 220, width: 215, resizeMode: 'stretch'}}
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
                            <Text style={{ ...styles.textBtns, marginTop: 20, width: width - 70, textAlign:'right' }}>Forgot password?</Text>
                            <Button
                                title="Login"
                                buttonStyle={ styles.loginBtn }
                                titleStyle={{ color: '#0c0a1c' }}
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
        color: '#fff'
    },
    labelStyle: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold'
    },
    textBtns: {
        color: '#fff',
        marginTop: 30,
    },
    loginBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#fff',
        width: width - 70,
    }
})


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps)(Login);