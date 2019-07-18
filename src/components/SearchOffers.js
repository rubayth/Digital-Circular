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
            <Form className="float-right" inline>
                <Input type="search" className="mr-3" onChange={this.handleSearch} placeholder="Search Weekly" />
            </Form>
        );
    }
}

function mapStateToProps({ allOffers }) {
    return { allOffers };
  }
export default connect(mapStateToProps, actions)(SearchOffers);