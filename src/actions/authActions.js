import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import config from "../config";
import QueryString from 'query-string';
import {
    LOGIN_USER,
    AUTH_CHECK,
    AUTH_USER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER
} from "./types";

export const authLogout = () => {
    return {
        type: LOGOUT_USER,
    }
}

export const loginUser = (credentials) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        axios.post(config.base + '/oauth/token', QueryString.stringify({
            username: credentials.username,
            password: credentials.password,
            grant_type: config.oauth.grant_type,
            client_id: config.oauth.client_id,
            client_secret: config.oauth.client_secret,
        }))
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS, payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL, payload: err.response
            })
        })
    };
}

export const fetchUser = () => {
    return (dispatch) => {
        dispatch({ type: AUTH_CHECK });
        axios.get('/user', QueryString.stringify({
            header: {
                'Authorization': 'Bearer ' + AsyncStorage.getItem('access_token')
            }
        })
        .then(res => {
            dispatch({ type: AUTH_USER, payload: res.data })
        })
        .catch(err => {
            dispatch({ type: LOGIN_FAIL, payload: err.response });
        })
    )}
}
