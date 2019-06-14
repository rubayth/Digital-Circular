import React, {Component} from 'react';
import {Form, Col, Input} from 'reactstrap';

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
            <Col className="d-none d-lg-flex justify-content-end">
                <Form inline>
                    <Input type="search" className="mr-3" onChange={this.handleSearch} placeholder="Search Weekly" />
                </Form>
            </Col>
        );
    }


}

export default SearchOffers;