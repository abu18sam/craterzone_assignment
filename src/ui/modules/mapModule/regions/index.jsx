import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import RegionTable from './RegionTable';
import { bindActionCreators } from 'redux';

import { addRegion, updateRegion, addCity } from '../../../../redux/action/regionAction/RegionAction';


class Regions extends Component {

    handleInput = (type, e, regionIndex, cityIndex) => {
        // console.log(`type= ${type}, cityIndex= ${cityIndex}, regionIndex= ${regionIndex} event= ${e.target}`);
        let {regionsList} = this.props.RegionReducer;
        this.props.actions.updateRegion(regionsList, type, e, regionIndex, cityIndex)                        
    }

    addCityForRegion = (regionIndex) => {
        let {regionsList} = this.props.RegionReducer;
        this.props.actions.addCity(regionsList, regionIndex);
    }

    render() {

        let {regionsList} = this.props.RegionReducer;

        return (
            <div className="container-fluid">
                <div>
                    <button value="Add Table" onClick={() => this.props.actions.addRegion(regionsList)} className="btn-add-table">Add Table</button>
                </div>

                <div className="region-container row">
                    {
                        regionsList.map((regionData, regionIndex) => {
                            return (
                                <RegionTable
                                    region={regionData}
                                    key={regionData.regionId}
                                    regionIndex={regionIndex}
                                    handleInput={this.handleInput}
                                    addCityForRegion={this.addCityForRegion}
                                />
                            )
                        })
                    }                 
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ addRegion, updateRegion, addCity }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regions)
