import * as React from 'react';
import { View } from 'react-native'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Header, Icon } from 'react-native-elements';

import Login from './Screens/Login';
import MainScreen from './Screens/Main';
import ShopPlans from './Screens/ShopPlans';
import PostScreen from "./Screens/Blog/List";
import listDetail from './Screens/Blog/listDetail'
import AddPost from './Screens/Blog/Form';
import Account from "./Screens/Account";

const ScreenConfig = navigation => {
    console.log(navigation);
    return {
        header: props => (
            <Header
                containerStyle={{ backgroundColor: '#fff', borderBottomWidth: 1, borderColor: '#000' }}
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
            headerTitle: "Login"
        }
    }
},
    {
        headerMode: 'none'
    }
);

export const PostNavigator = createStackNavigator({
    PostItem: {
        screen: listDetail,
        navigationOptions: ({ navigation }) => ({
            //title: navigation.state.params.name
        })
    },
});

/**
 * Menu Screen with bottom navigation tabs
 */
export const SignedIn = createBottomTabNavigator({
    Main: {
        screen: PostScreen,
        navigationOptions: {
            headerTitle: "Main",
            tabBarLabel: "Main",
            tabBarIcon: ({ tintColor }) => (
                <Icon type="font-awesome" name="home" color={ tintColor } />
            ),
        }
    },
    Shop: {
        screen: ShopPlans,
        navigationOptions: {
            headerTitle: "Main",
            tabBarLabel: "Main",
            tabBarIcon: ({ tintColor }) => (
                <Icon type="antdesign" name="home" color={ tintColor } />
            )
        }
    },
    Post: {
        screen: AddPost,
        navigationOptions: {
            Title: "Add Post",
            tabBarLabel: "Add Post",
            tabBarIcon: ({ tintColor }) => (
                <Icon type="font-awesome" name="search" color={ tintColor } />
            )
        }
    },
    Account: {
        screen: Account,
        navigationOptions:{
            Title: "My Account",
            tabBarLabel: "My Account",
            tabBarIcon: ({ tintColor }) => (
                <Icon type="font-awesome" name="user" color={ tintColor } />
            )
        }
    }
},
    {
        navigationOptions: ({ navigation }) => {
            const { routeName } = navigation.state.routes[navigation.state.index]
            return ScreenConfig(routeName)
        },
        tabBarOptions: {
            showLabel: true,
            style: {
                backgroundColor: '#fff',
                borderTopWidth: 0.5,
//              paddingTop: 10
            },
            labelStyle: {
                color: "#ccc",
            },
            activeTintColor: '#ff0000',
            inactiveColor: '#454545'
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
            PostNavigator
        },
        {
            initialRouteName: loggedin ? "SignedIn" : "SignedOut"
        }
    ));
};