import React, {Component} from 'react';
import {Form, Col, Input} from 'reactstrap';

class SearchOffers extends Component {
    
    constructor(props) {
        super(props);
         this.state = {
            filtered: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
          filtered: this.props.offerData
        });
    }

    handleChange(e) {
        // Variable to hold the original version of the list
        let currentList = [];
        
        // Variable to hold the filtered list before putting into state
        let newList = [];

        // If the search bar isn't empty
        if (e.target.value !== "") {

            // Assign the original list to currentList
            currentList = this.props.offerData.map(function (offer) {
                return offer.Mainline1;
            });

            // Use .filter() to determine which items should be displayed
            // based on the search terms
            newList = currentList.filter(offer => {
                
                if(offer == null ) {
                    return false;
                  }
                // change current item to lowercase
                const lc = offer.toLowerCase();

                // change search term to lowercase
                const filter = e.target.value.toLowerCase();

                // check to see if the current list item includes the search term
                // If it does, it will be added to newList. Using lowercase eliminates
                // issues with capitalization in search terms and search content
                return lc.includes(filter);
            });
        } 
        else {
        // If the search bar is empty, set newList to original task list
        newList = this.props.offerData;
        }

        // Set the filtered state based on what our rules added to newList
        this.setState({
            filtered: newList
        })
    
    }

    render() {
        return(
            <Col className="d-none d-lg-flex justify-content-end">
                <Form inline>
                    <Input type="search" className="mr-3" onChange={this.handleChange} placeholder="Search Weekly" />
                </Form>
            </Col>
        );
    }


}

export default SearchOffers;