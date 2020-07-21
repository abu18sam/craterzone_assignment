import React, { Component } from 'react';

import Regions from '../mapModule/regions';
import MapView from '../mapModule/mapView/MapView';
import { connect } from 'react-redux';

class MapScreen extends Component {

    render(){

        console.log("store_on_map_screen=> ",this.props)

        return (
            <div className="">
                <MapView />
                <Regions/>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MapScreen);