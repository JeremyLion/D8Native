import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Card, Text, Image, Header } from "react-native-elements";
import config from '../../config/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from "../../actions";

class listDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPost('article', this.props.navigation.state.params.nid + '?include=field_image')
    }

    renderPost = () => {
        const {postDetail} = this.props

        return (postDetail.data.map(el => {
                return (
                    postDetail.included.map(el_img => {
                        if (el.relationships.field_image.data.id === el_img.id) {
                            return (
                                <Card
                                    key={el.id}
                                    containerStyle={styles.containerWrapper}
                                    image={{uri: config.base + el_img.attributes.uri.url}}
                                    imageProps={{'PlaceholderContent': <ActivityIndicator/>}}>
                                    <Text>{el.attributes.title}</Text>
                                </Card>
                            )
                        }
                    })
                )
            }
        ))
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
            <Card>
                { this.renderPost() }
            </Card>
        )
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
        postDetail: state.blog.payload,
        isLoading: state.blog.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(listDetail);