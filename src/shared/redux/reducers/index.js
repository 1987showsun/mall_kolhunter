import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import store from './store';
import search from './search';
import common from './common';
import vendor from './vendor';
import account from './account';
import categories from './categories';

export default combineReducers({
    home,
    login,
    store,
    common,
    search,
    vendor,
    account,
    categories
});