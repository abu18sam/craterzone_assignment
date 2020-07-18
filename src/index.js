import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import store
import { persistor, store } from './redux/store/Store';

//import Provider
import { Provider } from 'react-redux';

//persistGate
import {PersistGate} from 'redux-persist/lib/integration/react';


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <PersistGate
        // loading={<Loader/>}
        persistor={persistor}>            
            <App/>       
    </PersistGate>
</Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
