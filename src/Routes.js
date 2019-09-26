import * as React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import Login from './Screens/Login';
import MainScreen from './Screens/Main';
import ShopPlans from './Screens/ShopPlans';
import PostScreen from "./Screens/Blog/List";
import listItem from './Screens/Blog/listItem'
import AddPost from './Screens/Blog/Form';
import Account from "./Screens/Account";

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
        screen: listItem,
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
            tabBarIcon: ({ tintColor} : any ) => {

            }
        }
    },
    Shop: {
        screen: ShopPlans,
    },
    Post: {
        screen: AddPost,
        navigationOptions: {
            Title: "Add Post",
            tabBarLabel: "Add Post"
        }
    },
    Account: {
        screen: Account,
        navigationOptions:{
            Title: "My Account",
            tabBarLabel: "My Account"
        }
    }
},
    /*{
        defaultNavigationOptions: ({ navigation }) => ({
            // eslint-disable-next-line react/prop-types
            tabBarIcon: ({ focused }) => {
                const { routeName } = navigation.state;
                let iconSource;
                switch (routeName) {
                    case 'Home':
                        iconSource = iconHome;
                        break;
                    case 'Calendar':
                        iconSource = iconCalendar;
                        break;
                    case 'Grids':
                        iconSource = iconGrids;
                        break;
                    case 'Pages':
                        iconSource = iconPages;
                        break;
                    case 'Components':
                        iconSource = iconComponents;
                        break;
                    default:
                        iconSource = iconComponents;
                }
                return (
                    <View style={styles.tabBarItemContainer}>
                        <Image
                            resizeMode="contain"
                            source={iconSource}
                            style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                        />
                    </View>
                );
            },
        }),
        tabBarPosition: 'bottom',
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            showLabel: true,
            style: {
                backgroundColor: theme.white,
                borderTopWidth: 0.5,
                borderTopColor: '#d6d6d6',
            },
            labelStyle: {
                color: theme.grey,
            },
        },
    },*/
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