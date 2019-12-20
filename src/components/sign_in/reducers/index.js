import counterReducer from './counter';
import loggedReducer from './isLoged';
import openSignInReducer from './openSignIn';
import {combineReducers} from 'redux'; 

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    openSignIn: openSignInReducer,
})
export default allReducers;