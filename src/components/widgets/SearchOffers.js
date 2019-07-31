import React, {Component} from 'react';
import {Form, Input} from 'reactstrap';

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
                <Form className="search-form" inline>
                    <i className="btn fas fa-search"></i>
                    <Input type="search" className="search-field" onChange={this.handleSearch} placeholder="Search Weekly Ad" value={this.props.searchQuery}/>
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ searchQuery }) {
    return { searchQuery };
  }
export default connect(mapStateToProps, actions)(SearchOffers);