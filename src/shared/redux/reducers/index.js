import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import store from './store';
import search from './search';
import common from './common';
import myvendor from './myvendor';
import myaccount from './myaccount';
import mystore from './mystore';
import categories from './categories';

export default combineReducers({
    home,
    login,
    store,
    common,
    search,
    myvendor,
    myaccount,
    mystore,
    categories
});