import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, SearchBar } from "react-native-elements";
import { connect } from 'react-redux';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        };
    }
    updateSearch = search => {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
                <SearchBar
                    lightTheme
                    placeholder="Type Here..."
                    onChangeText={this.updateSearch}
                    value={search}
                />
        );
    }
}

const mapStateToProps = state => {
    return {}
}

export default connect(mapStateToProps)(Search);