import { nanoid } from 'nanoid'; // to create a unique id for each city and region

import {addMarker, updateMarkersList} from '../mapActions/MapActions';

export const RegionActions = {
    "UPDATE_REGION_TABLE": "UPDATE_REGION_TABLE",
}

export const addRegion = state => dispatch => {
    let city = {
        cityId: nanoid(6),
        isDisabled: true,
        cityName: '',
        lat: '',
        lng: '',
        volume: ''
    }

    let regionData = {
        regionId: nanoid(6),
        regionName: '',
        cities: [{ ...city }]
    }

    let regionsList = state;
    regionsList.push(regionData);
    // console.log("addTable_action=> ",state, regionData, regionsList);

    // dispatch({ type: RegionActions.UPDATE_REGION_TABLE, payload: regionsList });
    dispatch(dispatchUpdateRegionAction(regionsList));
}

export const addCity = (state, regionIndex) => dispatch => {

    let city = {
        cityId: nanoid(6),
        isDisabled: true,
        cityName: '',
        lat: '',
        lng: '',
        volume: ''
    }

    let regionsList = state;
    regionsList[regionIndex]['cities'].push(city);

    // console.log("addTable_action=> ",state, regionData, regionsList);

    // dispatch({ type: RegionActions.UPDATE_REGION_TABLE, payload: regionsList });
    dispatch(dispatchUpdateRegionAction(regionsList));
}

export const updateRegion = (state, type, e, regionIndex, cityIndex) => dispatch => {

    // console.log("UpdateRegion=> ",state, type);
    let regionsList = state;

    let updateStore = false; // variable to control call to reducer only if the list if updated

    // let regexpNumber = /^[0-9]+([.]|[0-9]+)?$/g; // to only allow integers or decimal values
    // let regexpNumber = /^[\d.]+([\d])*$/;  // for decimal or integer value both
    let regeexpName = /^[a-zA-Z]+([\s]|[a-zA-Z])*$/g; //to only allow alphabets    

    let city;

    if(cityIndex || cityIndex===0) {
        city = regionsList[regionIndex]['cities'][cityIndex];
    }

     

    if (type === 'regionName' && ( e.target.value==='' || regeexpName.test(e.target.value) ) ) {
        regionsList[regionIndex]['regionName'] = e.target.value;
        updateStore = true;
    }
    else if (type === "isDisabled" ) {
        regionsList[regionIndex]['cities'][cityIndex][type] = e.target.checked;
        updateStore = true;
    }
    else if ((type === 'lat' || type === 'lng')) {
        regionsList[regionIndex]['cities'][cityIndex][type] = e.target.value;
        updateStore = true;
    }
    else if (type === 'cityName' && ( e.target.value==='' || regeexpName.test(e.target.value) ) ) {
        regionsList[regionIndex]['cities'][cityIndex][type] = e.target.value;
        updateStore = true;
    }
    else if (type === 'volume') {
        regionsList[regionIndex]['cities'][cityIndex][type] = e.target.value;
        updateStore = true;
    }    

    if (updateStore) {
        dispatch(dispatchUpdateRegionAction(regionsList));
    }
    

    if (city && city['lat'] && city['lng'] && !city['isDisabled']) {
        
        let markerData = {
            lat: city['lat'],
            lng: city['lng'],
            cityName: city['cityName'],
            volume: city['volume'],
            cityId: city['cityId'],
            regionName: regionsList[regionIndex]['regionName'],
            regionId: regionsList[regionIndex]['regionId'],            
        }

        dispatch(addMarker(markerData));

        dispatch(updateMarkersList());

    }

    

}



export const dispatchUpdateRegionAction = regionsList => dispatch => {
    dispatch({ type: RegionActions.UPDATE_REGION_TABLE, payload: regionsList })
}

