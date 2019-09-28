import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';
import axios from 'axios';
import {
    BLOG_SUCCESS,
    BLOG_FAIL,
    BLOG_LIST,
    BLOG_ADD,
    BLOG_ITEM,
    BLOG_CLEAR
} from "./types";

export const listPost = (contentType) => {
    return (dispatch) => {
        dispatch({ type: BLOG_CLEAR })
        axios.get(config.base + '/api/node/' + contentType)
        .then(res => {
            dispatch({ type: BLOG_LIST, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: BLOG_FAIL, payload: err.response});
        })
    }
}

export const loadPost = (contentType, id) => {
    return (dispatch) => {
        dispatch({ type: BLOG_CLEAR })
        axios.get( config.base + '/api/node/' + contentType + '/' + id)
        .then(res => {
            dispatch({ type: BLOG_ITEM, payload: res.data });
        })
        .catch(err => {
            dispatch({ type: BLOG_FAIL, payload: err.response});
        })
    }
}

export const addPost = (attributes, contentType) => {
    return (dispatch) => {
        axios.post(config.base + '/api/node/' + contentType,
        {
            data: {
                    attributes,
                    type: "node--" + contentType
                }
            },
        {
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json",
                "Authorization": "",
            }
        },
        ).then(res => {
            console.log(res)
            dispatch({ type: BLOG_ADD, payload: res.data });
        }).catch(err => {
            console.log(err.response)
            dispatch({ type: BLOG_FAIL })
        })
    }
}