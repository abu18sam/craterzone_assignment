import {combineReducers} from 'redux';

import LoaderReducer from './loaderReducer/LoaderReducer';
import RegionReducer from './regionReducer/RegionReducer';
import MapReducer from './mapReducer/MapReducer';

const RootReducer = combineReducers({
    LoaderReducer,
    RegionReducer,
    MapReducer
})

export default RootReducer;