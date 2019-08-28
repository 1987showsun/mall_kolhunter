import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import store from './store';
import search from './search';
import common from './common';
import approach from './approach';
import myvendor from './myvendor';
import myaccount from './myaccount';
import mystore from './mystore';
import categories from './categories';

export default combineReducers({
    home,
    login,
    store,
    search,
    common,
    approach,
    myvendor,
    myaccount,
    mystore,
    categories
});