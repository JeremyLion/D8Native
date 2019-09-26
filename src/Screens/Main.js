import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Header } from "react-native-elements";
import { connect } from 'react-redux';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Text>Home Tab</Text>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Main);