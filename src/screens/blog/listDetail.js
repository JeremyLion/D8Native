import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Button, Dimensions } from 'react-native';
import HTML from 'react-native-render-html';
import { Card, Text } from 'react-native-elements';
import config from '../../config/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';

class listDetail extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const nid = navigation.getParam('nid', null);

        if (nid) {
            this.props.loadPost('article', nid + '?include=field_image')
        }
    }

    renderPost = () => {
        const  { postDetail } = this.props;
        if (postDetail.data) {
            return (
                <Card
                    key={ postDetail.id }
                    image={{ uri: config.base + postDetail.included[0].attributes.uri.url }}
                    imageProps={{ 'PlaceholderContent': <ActivityIndicator /> }}>
                    <Text>{ postDetail.data.attributes.title }</Text>
                    <HTML html={ postDetail.data.attributes.body.value } imagesMaxWidth={Dimensions.get('window').width} />
                </Card>
            );
        }
    }

    render() {
        if (this.props.isLoading === true) {
            return (
                <View>
                    <ActivityIndicator/>
                </View>
            );
        }

        return (
            <View>
                <Button title="Back" onPress={() => this.props.navigation.goBack(`PostItem_${this.props.navigation.state.params.nid}`)} />
                { this.renderPost() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
        padding:0
    },
});

const mapStateToProps = (state) => {
    return {
        postDetail: state.blog.listDetail,
        isLoading: state.blog.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(listDetail);