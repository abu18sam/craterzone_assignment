import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './mapView.css';

const MapView = (props) => {    

    useEffect(() => {
        console.log('googlemap=> ', window);
        if (window.google) {
            let map = new window.google.maps.Map(document.getElementById('map'), {
                center: { lat: 29.945690, lng: 78.164246 },
                zoom: 4
            });

            global.googleMap=map;
            
            
            // var marker = 
            // new window.google.maps.Marker({
            //     position: { lat: 29.945690, lng: 78.164246 },
            //     map: global.googleMap
            // });

        }

    }, [])


    return (
        <div className="container-fluid" style={{ minHeight: 600, width:'100%', background: 'lightgrey' }}>
            <div id="map" className="col-lg-12 col-md-12 col-sm-12" style={{ background: 'lightgreen' }}></div>
            {/* MapView */}
        </div>
    )
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MapView);