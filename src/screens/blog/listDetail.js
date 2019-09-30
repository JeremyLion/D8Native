import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Dimensions, ScrollView, SafeAreaView, ImageBackground, StatusBar, TouchableOpacity} from 'react-native';
import HTML from 'react-native-render-html';
import { Card, Text, Icon, Button } from 'react-native-elements';
import Moment  from 'react-moment';
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
            this.props.loadPost('article', nid + '' +
            '?include=field_image' +
            '&include=field_image,uid,field_tags' +
            '&fields[taxonomy_term--tags]=name')
        }
    }

    renderTags = () => {
        const { postDetail } = this.props
        return (postDetail.included.map(type => {
            if (type.type === 'taxonomy_term--tags') {
                return (
                    <Button
                        type="clear"
                        style={ styles.tags }
                        buttonStyle={ styles.tagsBtn }
                        title={ type.attributes.name }
                        titleStyle={ styles.tags }
                    />
                );
            }
        }))
    }

    renderPost = () => {
        const  { postDetail } = this.props;
        if (postDetail.data) {
            return (
                    <ScrollView>
                        <Block middle style={ styles.containerWrapper }>
                            <View style={{ flex: 1}}>
                                <ImageBackground
                                    source={{ uri: config.base + postDetail.included[0].attributes.uri.url }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    resizeMode={'cover'}
                                    style={{ width, height: width }}>
                                    <TouchableOpacity
                                        style={ styles.button }
                                        onPress={ () => this.props.navigation.navigate('SignedIn') }>
                                        <Icon type={'font-awesome'} name={'chevron-left'} color={'#fff'} containerStyle={{ ...styles.backBtn, left: 20 }} />
                                        <Icon type={'font-awesome'} name={'bookmark-o'} color={'#fff'} containerStyle={{...styles.backBtn, right: 20 }} />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </View>
                            <View style={ styles.contentWrapper }>
                                <Block row>
                                    { this.renderTags() }
                                </Block>
                                <Text style={ styles.title }>{ postDetail.data.attributes.title }</Text>
                                <HTML
                                    html={ postDetail.data.attributes.body.value }
                                    tagsStyles={{ 'rawtext': { ...styles.content }, 'p': {fontSize: 14}}}
                                    imagesMaxWidth={{ width: width }} />
                            </View>
                        </Block>
                    </ScrollView>
            );
        }
    }

    render() {

        return (
            <View>
                <StatusBar backgroundColor="blue" barStyle="light-content" />
                { this.renderPost() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerWrapper: {
        backgroundColor: '#000',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 5,
        padding:0,
        borderRadius: 20,
        borderWidth: 2,
        overflow: 'hidden'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20
    },
    contentWrapper:{
        paddingTop: 30,
        padding: 10,
        borderWidth: 0.5,
        borderBottomWidth: 0,
        borderLeftWidth: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderLeftColor: '#fff',
        borderRightColor: '#fff',
    },
    content: {
        marginTop: 10,
        fontSize: 14,
        lineHeight: 22,
        color: '#666666'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    tagsBtn: {
        padding:5
    },
    tags: {
        backgroundColor: '#f2f2f2',
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: 10,
        borderColor: '#fff',
        fontSize: 14,
        color: '#000'
    },
    backBtn: {
        width:30,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        overflow:'hidden',
        borderRadius:20,
        position:'absolute',
        top:40,
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