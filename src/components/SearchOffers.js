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
            <div class="main-search mr-lg-3">
                <Form className="search-form" inline>
                    <button type="submit" class="btn btn-search">
                        <i class="fas fa-search"></i>
                    </button>
                    <Input type="search" className="search-field" onChange={this.handleSearch} placeholder="Search Weekly Ad" />
                </Form>
            </div>
        );
    }


}

export default SearchOffers;