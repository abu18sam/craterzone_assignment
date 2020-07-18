import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import RegionTable from './RegionTable';


class Regions extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <div>
                    <button value="Add Table" className="btn-add-table">Add Table</button>
                </div>

                <div className="region-container row">
                    <RegionTable />
                    <RegionTable />
                    <RegionTable />
                </div>


            </div>
        )
    }

}


const mapStateToProps = state => state;

export default connect(mapStateToProps)(Regions)
