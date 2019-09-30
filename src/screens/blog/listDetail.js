import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import HTML from 'react-native-render-html';
import { Card, Text, Image } from 'react-native-elements';
import config from '../../config/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions';
import Block from '../../components/Block';
const { width } = Dimensions.get('window');


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
                    <ScrollView>
                        <Block middle>
                            <View style={{ flex: 1}}>
                                <Image
                                    source={{ uri: config.base + postDetail.included[0].attributes.uri.url }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    style={{ flex:1, width: width, height: 200 }}
                                />
                                <View style={ styles.overlay }/>
                            </View>
                            <View style={ styles.contentWrapper }>
                                <Text style={ styles.title }>{ postDetail.data.attributes.title }</Text>
                                <HTML containerStyle={ styles.content } html={ postDetail.data.attributes.body.value } imagesMaxWidth={{ height:100, width: 500 }} />
                            </View>
                        </Block>
                    </ScrollView>
            );
        }
    }

    render() {

        return (
            <View>
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
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    contentWrapper:{
        padding: 20,

    },
    content: {
        borderTopWidth: 0.5,
        marginTop: 10,
        borderColor: '#ccc'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
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