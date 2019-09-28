import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TextInput, View } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';
import { addPost } from "../../actions/blogActions";

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                title: '',
                body: '',
                slug: ''
            },
            loading: false,
        }
    }

    handleChange(name, value) {
        this.setState({
            form: { ...this.state.form, [name]: value }
        })
    }

    submitHandler(e) {
        const { form } = this.state
        this.props.dispatch(addPost(form, 'article'))
    }

    render() {
        return (
            <Card containerStyle={ styles.containerWrapper }>
                <Input
                    label="Title"
                    containerStyle={ styles.inputField }
                    onChangeText={ (txt) => this.handleChange("title", txt) }
                    value={ this.state.form.title }

                />
                <Input
                    label="Body"
                    multiline={ true }
                    numberOfLines={ 20 }
                    containerStyle={[ styles.inputField, styles.inputTextArea ]}
                    onChangeText={ (txt) => this.handleChange("body", txt) }
                    value={ this.state.form.body }
                />
                <Button
                    small
                    iconRight
                    title={"Submit"}
                    containerStyle={{ margin: 10 }}
                    icon={{ name: 'add', color: '#fff' }}
                    onPress={ this.submitHandler.bind(this) }
                />
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        marginLeft: 0,
        marginRight: 0,
        padding:0,
        borderWidth: 0
    },
    inputField: {
        marginTop: 20
    },
    inputTextArea:{
    }
})

export default connect()(Form);
