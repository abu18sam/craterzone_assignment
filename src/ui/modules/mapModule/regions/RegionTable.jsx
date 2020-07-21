import React from 'react';

import AddCityIcon from '../../../../assets/images/plus_green.svg';

const RegionTable = (props) => {
    console.log('regionProps=> ', props);

    return (
        <div className="region col-md-12 col-sm-12 col-xs-12">

            {/* to represent region container header */}
            <div className="region-header row">
                <input type="text" id="region-name-input"
                    value={props.region.regionName}
                    name="regionName"
                    onChange={e => props.handleInput('regionName', e, props.regionIndex)} />

                <button type="button">Delete Selected</button>
            </div>

            <table className="table-region">
                <thead>
                    <tr>
                        <th>Disabled</th>
                        <th>Name</th>
                        <th>Latitude/lngitude</th>
                        <th>Volume</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.region && props.region.cities && props.region.cities[0] ?
                            props.region.cities.map((cityData, cityIndex) => {
                                return (
                                    <tr key={cityData.cityId}>
                                        <td><input type="checkbox" name="disable-city" checked={cityData.isDisabled} onChange={e => props.handleInput('isDisabled', e, props.regionIndex, cityIndex)} /></td>
                                        <td><input type="text" name="cityName" value={cityData.cityName} onChange={e => props.handleInput('cityName', e, props.regionIndex, cityIndex)} /></td>
                                        <td>
                                            <div className="lat-lng-input-container">
                                                <input type="number" maxLength="2" name="lat" value={cityData.lat} onChange={e => props.handleInput('lat', e, props.regionIndex, cityIndex)} />
                                                <input type="number" style={{ marginLeft: '15px' }} name="lng" value={cityData.lng} onChange={e => props.handleInput('lng', e, props.regionIndex, cityIndex)} />
                                            </div>
                                        </td>
                                        <td><input type="text" name="volume" volume={cityData.volume} onChange={e => props.handleInput('volume', e, props.regionIndex, cityIndex)} /></td>
                                    </tr>
                                )
                            })
                            : null
                    }
                    <tr>
                        <td colSpan="4" style={{ textAlign: 'center' }}>
                            <img src={AddCityIcon} alt="Add City"
                                onClick={e => props.addCityForRegion(props.regionIndex)}
                                style={{ height: '30px', cursor: 'pointer' }} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default RegionTable;