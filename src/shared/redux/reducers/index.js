import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import vendor from './vendor';

export default combineReducers({
    home,
    login,
    vendor
});