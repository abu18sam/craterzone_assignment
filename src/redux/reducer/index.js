import {combineReducers} from 'redux';

import LoaderReducer from './loaderReducer/LoaderReducer';

const RootReducer = combineReducers({
    LoaderReducer,
})

export default RootReducer;