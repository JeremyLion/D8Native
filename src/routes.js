import * as React from 'react';
import { View } from 'react-native';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Header, Icon } from 'react-native-elements';

import Login from './screens/login';
import MainScreen from './screens/main';
import Search from './screens/search';
import PostScreen from './screens/blog/list';
import listDetail from './screens/blog/listDetail';
import AddPost from './screens/blog/form';
import Account from './screens/account';

const ScreenConfig = navigation => {
    console.log('navigation', navigation);

    return {
        header: props => (
            <Header
                containerStyle={{ backgroundColor: '#fff', borderBottomWidth: 0, borderColor: '#000', paddingRight:20, paddingLeft: 20 }}
                leftComponent={{ icon: 'menu', color: '#000', type: 'feather', size: 18 }}
                centerComponent={{ text: navigation, style: { color: '#000'}}}
                rightComponent={{ icon: 'bell-o', color: '#000', type: 'font-awesome', size: 18 }}
            />
        )
    }
};

/**
 * Login screen after importing login component
 */
export const AuthNavigator = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions:{
            headerTitle: 'Login',
        },
    },
},
    {
        headerMode: 'none',
    }
);

export const PostNavigator = createStackNavigator({
    PostItem: {
        screen: listDetail,
        navigationOptions : {
            gesturesEnabled: true,
        },
    },
    navigationOptions: navigation => {
        const { routeName } = navigation.state.routes[navigation.state.index];
        return ScreenConfig(routeName);
    },
},{
    headerMode: 'none',
});

/**
 * Menu Screen with bottom navigation tabs
 */
export const SignedIn = createBottomTabNavigator({
    Main: {
        screen: PostScreen,
        navigationOptions: {
            headerTitle: 'Drupal Blog',
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="ionicon" name="ios-home" color={ tintColor } />
            ),
        },
    },
    Search: {
        screen: Search,
        navigationOptions: {
            headerTitle: 'Search',
            tabBarLabel: 'Search',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="font-awesome" name="search" color={ tintColor } />
            ),
        },
    },
    Post: {
        screen: AddPost,
        navigationOptions: {
            Title: 'Add Post',
            tabBarLabel: 'Add Post',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="material" name="add" color={ tintColor } />
            ),
        },
    },
    Account: {
        screen: Account,
        navigationOptions:{
            Title: 'My Account',
            tabBarLabel: 'My Account',
            tabBarIcon: ({ tintColor }) => (
                <Icon type="font-awesome" name="user" color={ tintColor } />
            ),
        },
    },
},
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index];
            let nameSource;

            switch (routeName) {
                case 'Main':
                    nameSource = 'Drupal Blog';
                    break;
                default:
                    nameSource = '';
            }
            return ScreenConfig(nameSource);
        },
        tabBarOptions: {
            showLabel: true,
            tabStyle:{
                //paddingVertical: 10
            },
            style: {
                backgroundColor: '#fff',
                borderTopWidth: 0.5,
            },
            labelStyle: {
                color: '#000',
            },
            activeTintColor: '#000',
            inactiveColor: '#454545',
        },
        iconStyle: {

        },
    },
);

/**
 * Wrapper for bottom tabs
 * @type {any}
 */
const MainContainer = createStackNavigator({ SignedIn });

/**
 * Route Controller.
 * @param loggedin
 * @return initialRouteName
 */
export const createRootNavigator = (loggedin) => {
    return createAppContainer(createSwitchNavigator(
        {
            SignedOut: AuthNavigator,
            SignedIn:  MainContainer,
            PostNavigator,
        },
        {
            initialRouteName: loggedin ? 'SignedIn' : 'SignedOut'
        }
    ));
};