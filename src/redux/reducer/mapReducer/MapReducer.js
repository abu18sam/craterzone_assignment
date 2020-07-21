import {MapActions} from '../../action/mapActions/MapActions';

const InitialState = {
    markersList : [],
}

const MapReducer = (state=InitialState, action) => {
    switch(action.type){
        case MapActions.ADD_MARKER : 
            console.log('state_on_mapReducer=> ', state, action);
            let  markersList=state.markersList;
            markersList.push(action.payload);
        return {...state, markersList:markersList};
        case MapActions.UPDATE_MARKER : return { ...state, markersList:action.payload};
        default : return state;
    }
}

export default MapReducer;