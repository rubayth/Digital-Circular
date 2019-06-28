import React, {Component} from 'react';
import {Form, Input} from 'reactstrap';

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
                <Form className="float-right" inline>
                    <Input type="search" className="mr-3" onChange={this.handleSearch} placeholder="Search Weekly" />
                </Form>
        );
    }


}

export default SearchOffers;