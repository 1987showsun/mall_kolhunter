import { combineReducers }             from "redux";

//Reducers
import home from './home';
import login from './login';
import inc from './inc';

export default combineReducers({
    home,
    login,
    inc
});