export const MapActions = {
    "UPDATE_MARKERS_LIST": "UPDATE_MARKERS_LIST",
    "ADD_MARKER": "ADD_MARKER"
};

// add new marker to the map
export const addMarker = (markerData) => (dispatch, getState) => {
    // console.log('regionList=> ', state, 'NewmarkerData=> ', markerData);
    // let markers = [];
    // markers=markersList;

    // let position = {
    //     lat: Number(markerData['lat']),
    //     lng: Number(markerData['lng']),
    //     cityName: markerData['cityName'],
    //     cityId: markerData['cityId'],
    //     regionName: markerData['regionName'],
    //     regionId: markerData['regionId'],
    //     volume: markerData['volume']
    // };

    // const state = getState();

    // console.log('state==>>>>>> ', state);



    if (window.google) {
        // let marker = new window.google.maps.Marker({ position: position, map: global.googleMap });
        // let m = { ...marker, markerId: `${markerData['cityId']}${markerData['regionId']}` }

        // let contentString = `<div><span>Region Name:${position.regionName}</span><br/><span>City Name:${position.cityName}</span><br/><span>Volume:${position.volume}</span><br/></div>`;

        // let contentString = "<div>Info Window</div>"

        // let infowindow = new window.google.maps.InfoWindow({
        //     content: contentString
        //   });        


        //   marker.addListener('mouseover', function() {
        //     infowindow.open(global.googleMap, marker);
        // });

        // // to hide the infowindow when user mouses-out
        // marker.addListener('mouseout', function() {
        //     infowindow.close();
        // });

        // dispatch({ type: MapActions.ADD_MARKER, payload: m });
    }


}


// remove old markers and new markers
export const updateMarkersList = () => (dispatch, getState) => {

    let markers = [];

    const state = getState();    

    if (state.MapReducer.markersList && state.MapReducer.markersList[0]) {
        let markersList = state.MapReducer.markersList;

        for (let i = 0; i < markersList.length; i++) {
            markersList[i].setMap(null)
        }
    }

    // debugger;

    dispatch({ type: MapActions.UPDATE_MARKERS_LIST, payload: [] });

    let regionsList = state.RegionReducer.regionsList;

    if (regionsList && regionsList[0]) {
        for (let i = 0; i < regionsList.length; i++) {
            let region = regionsList[i];

            let cities = region['cities'];            

            if (cities && cities[0]) {
                for (let j = 0; j < cities.length; j++) {
                    let city = cities[j];

                    if (!city.isDisabled) {
                        let position = { lat: Number(city.lat), lng: Number(city.lng) };

                        let marker = new window.google.maps.Marker({
                            position: position,
                            animation: window.google.maps.Animation.DROP,
                            map: global.googleMap
                        });
    
                        // debugger;
    
                        markers.push(marker);
                    }                    
                    
                    // debugger;

                    if (i === (regionsList.length - 1) && j === (cities.length - 1)) {

                        setTimeout(() => {
                            dispatch({ type: MapActions.UPDATE_MARKERS_LIST, payload: markers });
                        }, 100);

                    }
                }
            }
        }
    }

}