import { combineReducers } from "redux";
import auth from './authReducer';
import blog from './blogReducer';

export default combineReducers({
    auth,
    blog
})