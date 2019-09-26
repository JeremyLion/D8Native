import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';

class MyComponent extends Component {
    render() {
        return (
            <View>
                
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps,)(MyComponent);
