import React from 'react';
import { connect } from 'react-redux';

const MapView = (props) => {
    return (
        <div>
            MapView
        </div>
    )
}

const mapStateToProps = state =>state;

export default connect(mapStateToProps)(MapView);