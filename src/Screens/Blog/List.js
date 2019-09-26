import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Card, Text, Image, Header } from "react-native-elements";
import config from '../../Config';
import { connect } from 'react-redux';
import { listPost } from '../../actions/blogActions'
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";

class List extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.props.listPost('article?include=field_image');
    }

    renderList = () => {
        const { lists } = this.props
        if(lists) {
            return (lists.data.map(el => {
                return (
                    <TouchableOpacity
                        key={el.id}
                        onPress={ () => this.props.navigation.navigate('PostItem', { title: el.attributes.title, nid: el.id }) }>
                        {lists.included.map(el_img => {
                            if(el.relationships.field_image.data.id === el_img.id) {
                                return (
                                    <Card
                                        key={el.id}
                                        containerStyle={ styles.containerWrapper }
                                        image={{ uri: config.base + el_img.attributes.uri.url }}
                                        imageProps={{ 'PlaceholderContent': <ActivityIndicator /> }}>
                                        <Text>{el.attributes.title}</Text>
                                    </Card>
                                )}
                            })
                        }
                    </TouchableOpacity>
                )}
            ))
        }
    }

    render() {

        if(this.props.isLoading === true) {
            return (
                <Card>
                    <ActivityIndicator/>
                </Card>
            )
        }

        return (
            <ScrollView>
                { this.renderList() }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
        padding:0
    }
});

const mapStateToProps = (state) => {
    return {
        lists: state.blog.payload,
        isLoading: state.blog.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);