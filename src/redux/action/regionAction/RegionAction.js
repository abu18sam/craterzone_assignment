import { nanoid } from 'nanoid'; // to create a unique id for each city and region

import { addMarker, MapActions } from '../mapActions/MapActions';

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

    if (cityIndex || cityIndex === 0) {
        city = regionsList[regionIndex]['cities'][cityIndex];
    }



    if (type === 'regionName' && (e.target.value === '' || regeexpName.test(e.target.value))) {
        regionsList[regionIndex]['regionName'] = e.target.value;
        updateStore = true;
    }
    else if (type === "isDisabled") {
        if (city && city.lat && city.lng) {
            regionsList[regionIndex]['cities'][cityIndex][type] = e.target.checked;
            updateStore = true;
        }
    }
    else if ((type === 'lat' || type === 'lng')) {
        regionsList[regionIndex]['cities'][cityIndex][type] = e.target.value;
        updateStore = true;
    }
    else if (type === 'cityName' && (e.target.value === '' || regeexpName.test(e.target.value))) {
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


    if (city && city['lat'] && city['lng']) {

        let markerData = {
            isDisabled: city['isDisabled'],
            lat: city['lat'],
            lng: city['lng'],
            cityName: city['cityName'],
            volume: city['volume'],
            cityId: city['cityId'],
            regionName: regionsList[regionIndex]['regionName'],
            regionId: regionsList[regionIndex]['regionId'],
        }

        dispatch(addMarker(markerData));

        // dispatch(updateMarkersList());

    }



}



export const dispatchUpdateRegionAction = regionsList => dispatch => {
    dispatch({ type: RegionActions.UPDATE_REGION_TABLE, payload: regionsList })
}


// to delete  selected city
export const deleteSelectedCity = () => (dispatch, getState) => {

    const state = getState();

    let regionsList = state.RegionReducer.regionsList;

    let markers = state.MapReducer.markersList;

    if (regionsList && regionsList[0]) {
        for (let i = 0; i < regionsList.length; i++) {
            let region = regionsList[i];

            let cities = region['cities'];

            if (cities && cities[0]) {
                for (let j = 0; j < cities.length; j++) {
                    let city = cities[j];

                    if (city.isDisabled) {
                        let markerId = `${city['cityId']}${region['regionId']}`; //create unique markerId by combining region Id with city id


                        let markerIndex = markers.findIndex(x => x.markerId === markerId); // to find if the current marker already exist in the google map.

                        if (markerIndex > -1) {
                            markers[markerIndex].setMap(null);
                            markers.splice(markerIndex, 1);
                        }

                        cities.splice(j,1);
                    
                        if (i === (regionsList.length - 1) && j === ( cities.length>0? cities.length - 1 :0 )) {

                            setTimeout(() => {
                                dispatch(dispatchUpdateRegionAction(regionsList));
                                dispatch({ type: MapActions.UPDATE_MARKERS_LIST, payload: markers });
                            }, 100);

                        }
                    }
                }
            }
        }

    }
}

