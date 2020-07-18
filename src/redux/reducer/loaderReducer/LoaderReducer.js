import {LoaderAction} from '../../action/loaderActions/LoaderActions';

const InitialState = {
    isLoading : false,
}

const LoaderReducer = (state=InitialState, action) => {
    switch (action.type) {
        case LoaderAction.LOADER_START : return { ...state, isLoading:true};
        case LoaderAction.LOADER_STOP : return { ...state, isLoading:false};
        default : return state;
    }
}

export default LoaderReducer;