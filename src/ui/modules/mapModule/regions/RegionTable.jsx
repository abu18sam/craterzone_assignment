import React from 'react';

const RegionTable = (props) => {
    return (
        <div className="region col-md-12 col-sm-12 col-xs-12">

            {/* to represent region container header */}
            <div className="region-header row">
                <input type="text" id="region-name-input" />

                <button type="button">Delete Selected</button>
            </div>

            <table className="table-region">
                <thead>
                    <tr>
                        <th>Disabled</th>
                        <th>Name</th>
                        <th>Latitude/Longitude</th>
                        <th>Volume</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td><input type="checkbox" name="disable-city" /></td>
                        <td><input type="text" name="city" /></td>
                        <td>
                            <div className="lat-long-input-container">
                                <input type="text" name="latitude" />
                                <input type="text" style={{ marginLeft: '15px' }} name="longitude" />
                            </div>
                        </td>
                        <td><input type="text" name="volume" /></td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default RegionTable;