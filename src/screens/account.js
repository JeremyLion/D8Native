import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-elements";
import { connect } from 'react-redux';
import { authLogout } from "../actions/authActions";

class ShopPlans extends Component {
    constructor(props) {
        super(props);
    }

    submitHandler(e){
        this.props.dispatch(authLogout())
    }

    render() {
        return (
            <Card>
                <Button onPress={ this.submitHandler.bind(this) } title={"Logout"} />
            </Card>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(ShopPlans);