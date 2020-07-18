//redux imports
import { createStore, applyMiddleware, compose } from "redux";

//middleware import
import Thunk from 'redux-thunk';

//redux persist imports
import { persistStore, persistReducer } from "redux-persist";

import storage from 'redux-persist/lib/storage';

//reducer
import RootReducer from '../reducer';

const persistConfig = {
    key: 'root',
    storage,
    // whiteList:["LoaderReducer"]
}

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(
    persistedReducer, {},
    compose(applyMiddleware(Thunk))
);

const persistor = persistStore(store);

export { persistor, store };