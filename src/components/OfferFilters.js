import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';
import _ from 'lodash';

class OfferFilters extends Component {
  constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false,
        checkedCategories:[]
      };

    }
  
    toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }

  
    onInputClick(filter){
      //if state already includes filter, remove it and update offers
      if(this.state.checkedCategories.includes(filter)){
        const removeCategory = _.remove(this.state.checkedCategories, (category) => {
          return !(category === filter);
        })
        this.props.updateOffers(removeCategory);
        this.setState({
          checkedCategories : removeCategory
        })
      }
      //add filter to state and update offers
      else{
        const checkedCategories = this.state.checkedCategories;
        checkedCategories.push(filter);
        this.setState({
          checkedCategories
        });
        this.props.updateOffers(this.state.checkedCategories);
      }
    }
    
    renderLabels(){
      //Get list of categories from offer
      const categories = this.props.offerCategories.map(function (offer) {
        return offer.Category;
      });

      //Filter to categories to remove the duplicates for building filters
      var categoryUnique = categories.filter(function(cat, index){
        return categories.indexOf(cat) >= index;
      });
      
      return categoryUnique.map((filter, index) => { 
        return(
          <Col key={index} sm={4}>
            <FormGroup check>
              <Label check key={index}>
                  <Input 
                    type="checkbox" 
                    name={filter} 
                    onChange={ () => this.onInputClick(filter)} 
                    checked={this.state.checkedCategories.includes(filter)} 
                    />
                    {filter}
                  </Label>
            </FormGroup>
            <DropdownItem divider />
          </Col>
        )
      })
    }

  render () {
    return(
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle outline color="secondary" block caret>
              Filter Offers
            </DropdownToggle>
            <DropdownMenu>
                <Form className="form-check-inline">
                    <Container>
                      <Row>
                        <Col className="text-center">
                          <Button onClick={this.props.updateOffers}>Clear All</Button>
                          <DropdownItem divider />
                        </Col>
                      </Row>
                      <Row>
                        {this.renderLabels()}
                      </Row>
                    </Container>
                </Form> 
            </DropdownMenu>
          </Dropdown>
    )
  }
        
    
}  

export default OfferFilters;