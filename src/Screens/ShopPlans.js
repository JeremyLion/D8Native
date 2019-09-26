import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-elements";
import { connect } from 'react-redux';

class ShopPlans extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <Text>Shop Plans</Text>
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(ShopPlans);