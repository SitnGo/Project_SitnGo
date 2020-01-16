import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import allReducer from './components/sign_in/reducers';
import reducers from "./components/sign_in/reducers/reducers"
import { CookiesProvider } from 'react-cookie';

import {Provider} from 'react-redux';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
<Provider store = {store}>
    <CookiesProvider>
    <App/>
    </CookiesProvider>
    </Provider>,
document.getElementById('root'));

serviceWorker.unregister();
