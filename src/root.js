import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginSuccess } from './actions';
import { createRootNavigator } from './routes';

/**
 * Root component connecting routes together
 * @class Root
 */
class Root extends Component {
    render(){
        const Router = createRootNavigator(this.props.isAuthenticated);
        return <Router />
    }
}

/**
 * Mapping states to props
 * @param state
 */
const mapPropsToState = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    }
};

export default connect(mapPropsToState, { loginSuccess })(Root);

