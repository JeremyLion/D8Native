import AsyncStorage from '@react-native-community/async-storage';
import {
    BLOG_SUCCESS,
    BLOG_FAIL,
    BLOG_LIST,
    BLOG_ADD,
    BLOG_ITEM,
    BLOG_CLEAR,
} from '../actions/types';

let INITIAL_STATE = {
    listItems: {},
    listDetail: {},
    isLoading: true
}

const blog = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case BLOG_CLEAR:
            return INITIAL_STATE;
        case BLOG_ADD:
            return { ...state, isLoading:true }
        case BLOG_LIST:
            return {...state, listItems: action.payload, isLoading: false }
        case BLOG_ITEM:
            return {...state, listDetail: action.payload, isLoading: false}
        case BLOG_SUCCESS:
        case BLOG_FAIL:
            return { ...state, payload: action.payload, isLoading: false }
        default:
            return state
    }
}

export default blog;
