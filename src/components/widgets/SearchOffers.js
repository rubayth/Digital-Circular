import React, {Component} from 'react';
import { Input } from 'reactstrap';

import * as actions from '../../actions';
import { connect } from 'react-redux';

class SearchOffers extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.props.searchOffers(e.target.value.toLowerCase())
    }

    render() {
        return(
            <div className="main-search mr-lg-3">
                <i className="btn btn-search fas fa-search"></i>
                <Input type="text" className="search-field" onChange={this.handleSearch} placeholder="Search Weekly Ad" value={this.props.searchQuery} disabled={this.props.omsData === false}/>
            </div>
        );
    }
}

function mapStateToProps({ searchQuery, omsData }) {
    return { 
        searchQuery,
        omsData
     };
  }
export default connect(mapStateToProps, actions)(SearchOffers);