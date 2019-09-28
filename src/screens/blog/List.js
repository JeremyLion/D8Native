import React, { Component } from "react";
import { StyleSheet, ActivityIndicator, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from "react-native";
import { Card, Text, ButtonGroup } from "react-native-elements";
import config from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as Actions from "../../actions";
import { Block } from '../../components'

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 1
        }

    }

    componentDidMount() {
        this.props.listPost('article?include=field_image');
    }

    renderList = () => {
        const { lists } = this.props;
        if(lists) {
            return (lists.data.map(el => {
                return (
                    <TouchableOpacity
                        key={el.id}
                        onPress={ () => this.props.navigation.navigate({routeName: 'PostItem', key:'postItem_' + el.id, params: { nid: el.id }})}>
                        {lists.included.map(el_img => {
                            if(el.relationships.field_image.data.id === el_img.id) {
                                return (
                                    <Card
                                        key={el.id}
                                        image={{ uri: config.base + el_img.attributes.uri.url }}
                                        imageProps={{ 'PlaceholderContent': <ActivityIndicator /> }}>
                                        <Text>{el.attributes.title}</Text>
                                        <Text></Text>
                                    </Card>
                                )}
                            })
                        }
                    </TouchableOpacity>
                )}
            ))
        }
    }

    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }

    render() {
        const component1 = () => <Text>Latest</Text>
        const component2 = () => <Text>Most Visited</Text>
        const component3 = () => <Text>Top Rated</Text>

        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const { selectedIndex } = this.state

        if(this.props.isLoading === true) {
            return (
                <Card>
                    <ActivityIndicator/>
                </Card>
            )
        }

        return (
            <Block>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{ height: 30, marginLeft:15, marginRight:15 }} />
                { this.renderList() }
            </Block>
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
        lists: state.blog.listItems,
        isLoading: state.blog.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);