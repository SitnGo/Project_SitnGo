import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import reducers from './reducers/reducers';
import { Provider } from 'react-redux';
import { Offline, Online } from "react-detect-offline";

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <>
    <Online>
        <Provider store={store}>
            <App />
        </Provider>
    </Online>
    <Offline>No internet connection </Offline>
    </>,
    document.getElementById('root'));

serviceWorker.unregister();
