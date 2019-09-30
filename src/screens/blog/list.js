import React, { Component } from 'react';
import { Card, Text, ButtonGroup, Icon } from 'react-native-elements';
import {
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    View } from 'react-native';
import config from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions';
import { Block } from '../../components';
import Moment from 'react-moment';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
        }
        this.updateIndex = this.updateIndex.bind(this)
    }

    componentDidMount() {
        this.props.listPost('article' +
            '?fields[node--article]=title,body,field_image,created,field_tags' +
            '&include=field_image,uid,field_tags' +
            '&fields[taxonomy_term--tags]=name'
        );
    }

    renderTags = (tag_id) => {
        return (this.props.lists.included.map(val => {
            if (val.type === 'taxonomy_term--tags') {
                if (tag_id === val.id) {
                    return ( val.attributes.name );
                }
            }
        }));
    }

    renderList = (val) => {
        const { lists } = this.props;
        if (lists) {
            return (
                lists.data.map(el => {
                    return (
                        <TouchableOpacity
                            key={el.id}
                            onPress={ () => this.props.navigation.navigate({routeName: 'PostItem', key:'postItem_' + el.id, params: { nid: el.id }})}>
                            {lists.included.map(el_img => {
                                if (el.relationships.field_image.data.id === el_img.id) {
                                    return (
                                        <View>
                                            {el.relationships.field_tags.data.map(tag => {
                                                return (
                                                    <View style={styles.termWrapper}>
                                                        <Block row space="between" >
                                                            <Text style={styles.term}>{ this.renderTags(tag.id) }</Text>
                                                            <View style={{ flexDirection:'row', marginTop: 10}}>
                                                                <Icon type={'material'} name={'access-time'} size={16} iconStyle={ styles.created }/>
                                                                <Moment style={ styles.created } element={Text} fromNow>{ el.attributes.created }</Moment>
                                                            </View>
                                                        </Block>
                                                    </View>
                                                )
                                            })}

                                            <Card
                                                key={el.id}
                                                titleStyle={ styles.term }
                                                image={{ uri: config.base + el_img.attributes.uri.url }}
                                                imageProps={{ 'PlaceholderContent': <ActivityIndicator /> }}
                                                containerStyle={ styles.flatCard }
                                                wrapperStyle={{ padding: 0 }}>
                                                <View style={ styles.titleWrapper }>
                                                    <Text style={ styles.title }>{ el.attributes.title }</Text>
                                                    <Icon type={'font-awesome'} name={'bookmark-o'} />
                                                </View>
                                                <Text>{el.attributes.body.summary}</Text>
                                            </Card>
                                        </View>
                                    )}
                                })
                            }
                        </TouchableOpacity>
                    )}
                )
            )
        }
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex});
    }

    render() {
        const buttons = [ 'Latest', 'Most Visited', 'Top Rated' ];
        const { selectedIndex } = this.state;

        if (this.props.isLoading === true) {
            return (
                <Card>
                    <ActivityIndicator/>
                </Card>
            );
        }

        return (
            <Block>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={ selectedIndex }
                    buttons={ buttons }
                    containerStyle={ styles.btnGroupWrapper }
                    innerBorderStyle={{ color: '#fff' }}
                    selectedButtonStyle={ styles.buttonActive }
                    selectedTextStyle={ styles.textActive }
                    buttonStyle={ styles.buttonStyle }
                    textStyle={ styles.textStyle } />
                <ScrollView>
                    { this.renderList() }
                </ScrollView>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
    },
    btnGroupWrapper: {
        backgroundColor: 'transparent',
        marginLeft:0,
        marginRight:0,
        marginBottom: 15,
        marginTop: 0,
        borderWidth: 0,
    },
    buttonActive: {
        backgroundColor: '#fff',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    textActive: {
        color: '#000',
        borderWidth: 0,
        lineHeight: 22,
    },
    textStyle: {
        fontSize: 16,
        color: '#b2b2b2',
    },
    titleWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    title:{
        fontWeight: 'bold',
        marginBottom: 3,
    },
    termWrapper: {
        marginLeft: 15,
        marginRight: 15,
    },
    term: {
        textAlign: 'left',
        fontSize: 24,
    },
    created:{
        paddingLeft: 5,
        color: '#666666',
    },
    flatCard: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderWidth: 0,
        backgroundColor: 0,
        borderBottomWidth: 1,
        paddingBottom: 20,
        marginBottom: 20,
        marginTop: 10
    },
    iconWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10,
        paddingTop: 5,
        borderColor: '#eee',
        borderTopWidth: 1
    }
});

const mapStateToProps = (state) => {
    return {
        lists: state.blog.listItems,
        isLoading: state.blog.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);