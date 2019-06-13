import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class OfferFilters extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render () {

        //Get list of categories from offer
        const categories = this.props.offerData.map(function (offer) {
          return offer.Category;
        });

        //Filter to categories to remove the duplicates for building filters
        var categoryUnique = categories.filter(function(cat, index){
          return categories.indexOf(cat) >= index;
        });

        //Build my filters now
        const filterData = categoryUnique.map((filter, index) => {
            return (
                <Form key={index} className="form-check-inline">
                    <FormGroup check>
                        <Label check>
                            <Input type="checkbox" />{' '}
                                {filter}
                        </Label>
                    </FormGroup>
                </Form>

            )
        })

        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle className="font-weight-bold">
                Filter Options
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                      {filterData}
                  </DropdownItem>
                </DropdownMenu>
            </Dropdown>
          );

    }
}  

export default OfferFilters;