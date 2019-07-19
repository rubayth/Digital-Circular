import React, {Component} from 'react';
import {Form, Input} from 'reactstrap';

import * as actions from '../actions';
import { connect } from 'react-redux';

class SearchOffers extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        this.props.searchOffers(e.target.value.toLowerCase(), this.props.allOffers)
    }

    render() {
        return(
            <div className="main-search mr-lg-3">
                <Form className="search-form" inline>
                    <button type="submit" className="btn btn-search">
                        <i className="fas fa-search"></i>
                    </button>
                    <Input type="search" className="search-field" onChange={this.handleSearch} placeholder="Search Weekly Ad" />
                </Form>
            </div>
        );
    }
}

function mapStateToProps({ allOffers }) {
    return { allOffers };
  }
export default connect(mapStateToProps, actions)(SearchOffers);