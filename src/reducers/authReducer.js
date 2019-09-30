import AsyncStorage from '@react-native-community/async-storage';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_CHECK,
} from '../actions/types';

let INITIAL_STATE = {
    username: '',
    password: '',
    error: '',
    isLoading: false,
    isAuthenticated: false,
};

const auth = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_CHECK:
            return checkAuth(state);
        case LOGIN_USER:
            return { ...state, isLoading: true };
        case LOGIN_SUCCESS:
            return login({...state, payload: action.payload});
        case LOGIN_FAIL:
            return { ...state, payload: action.payload, isLoading: false };
        case LOGOUT_USER:
            return logout(state);
        default:
            return state;
    }
};

function login(state, data) {

//    AsyncStorage.setItem('access_token', 'dummy token set');
    AsyncStorage.setItem('access_token', state.payload['access_token']);
    return {
        ...state, isAuthenticated: true, isLoading: false
    }
}

function logout(state) {
    AsyncStorage.removeItem('access_token');
    return {
        ...state, isAuthenticated: false
    }
}

function checkAuth(state) {
    state = Object.assign({}, state, {
        isAuthenticated: !!AsyncStorage.getItem('access_token')
    });

    return state;
}

export default auth