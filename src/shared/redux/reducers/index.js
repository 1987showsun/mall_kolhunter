import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import vendor from './vendor';
import account from './account';

export default combineReducers({
    home,
    login,
    vendor,
    account
});