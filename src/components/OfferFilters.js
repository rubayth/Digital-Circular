import React, {Component} from 'react';
import {Form, FormGroup, Label, Input } from 'reactstrap';


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
        const categories = this.props.offerCategories.map(function (offer) {
          return offer.Category;
        });

        //Filter to categories to remove the duplicates for building filters
        var categoryUnique = categories.filter(function(cat, index){
          return categories.indexOf(cat) >= index;
        });

        //Build my filters now
            return categoryUnique.map((filter, index) => { 
              return(
                <Form key={index} className="form-check-inline">
                    <FormGroup>
                        <Label key={index}>
                            <Input type="checkbox" name={filter} onChange={this.props.updateOffers} />
                                {filter}
                        </Label>
                    </FormGroup>
                </Form>

            )
        })
        
    }
}  

export default OfferFilters;