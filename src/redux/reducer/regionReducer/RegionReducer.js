import {RegionActions} from '../../action/regionAction/RegionAction';

const InitialState = {
    regionsList:[]
}

const RegionReducer = (state=InitialState, action) => {
    switch(action.type) {
        case RegionActions.UPDATE_REGION_TABLE : console.log('regionReducer=> ',action);return { ...state, regionsList:action.payload};
        default : return state;
    }
}

export default RegionReducer;