import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-community/async-storage';
import Root from "./src/root";
import { store, persistor } from "./src/store";

class App extends Component {

    componentDidMount() {
    }

    renderLoading = () => (
        <View>
            <ActivityIndicator/>
        </View>
    );

    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor} loading={this.renderLoading()}>
                    <Root/>
                </PersistGate>
            </Provider>
        );
    }
};

export default App;
