export const MapActions = {
    "UPDATE_MARKERS_LIST": "UPDATE_MARKERS_LIST",
    "ADD_MARKER": "ADD_MARKER"
};

// add new marker to the map
export const addMarker = (markerData) => (dispatch, getState) => {

    let position = {
        lat: Number(markerData['lat']),
        lng: Number(markerData['lng']),
    };

    const state = getState();


    let markers = [];
    markers = state.MapReducer.markersList;

    if (window.google) {

        try {
            let markerId = `${markerData['cityId']}${markerData['regionId']}`; //create unique markerId by combining region Id with city id

            let markerIndex = markers.findIndex(x => x.markerId === markerId); // to find if the current marker already exist in the google map.

            if (markerIndex > -1) {
                if (markerData.isDisabled) {
                    // if marker exist then remove marker from map and also from the list.
                    // markers[markerIndex].setMap(null);
                    // markers.splice(markerIndex,1);
                }
                else {
                    //if marker already exist the change the position
                    let latlng = new window.google.maps.LatLng(position.lat, position.lng);
                    markers[markerIndex].setPosition(latlng);
                }
            }
            else if (!markerData.isDisabled) {
                let marker = new window.google.maps.Marker({
                    position: position,
                    animation: window.google.maps.Animation.DROP,
                    map: global.googleMap
                });

                marker['markerId'] = markerId;

                markers.push(marker);
            }
        
            dispatch({ type: MapActions.UPDATE_MARKERS_LIST, payload: markers });

        }
        catch (error) {
            console.log("marker_error=> ", error);
        }


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


// remove all old markers and new markers
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