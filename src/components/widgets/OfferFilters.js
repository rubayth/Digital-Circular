import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem , Button} from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class OfferFilters extends Component {
  constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        dropdownOpen: false,
        checkedCategories:[]
      };
      this.onClearClick = this.onClearClick.bind(this);
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
    
    onClearClick(){
      const emptyArr = [];
      this.setState({
        checkedCategories:[]
      });
      this.toggle();
      this.props.updateOffers(emptyArr);
    }
    
    renderLabels(){
      const filters= _.concat(this.props.offerCategories, this.props.omsData.Bugs);
      return filters.map((filter, index) => { 
          return(
            <Col key={index} className="category__item col-12 col-lg-4">
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
      <div className="category-filter__handle">
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          <DropdownToggle outline color="teal" block caret disabled={Boolean(this.props.searchQuery)}>
            Filter Offers
          </DropdownToggle>
          <DropdownMenu  className="container"
            style={{
              }}>
                  <Container>
                    <Row >
                      <Col className="col-12 text-center">
                        <Button onClick={this.onClearClick} color="teal">Clear All</Button>
                        <DropdownItem divider />
                      </Col>
                    </Row>
                    <Row >
                      {this.renderLabels()}
                    </Row>
                  </Container>
          </DropdownMenu>
        </Dropdown>
      </div>
      
    )
  }
        
    
}  

function mapStateToProps({ categories, allOffers, searchQuery, omsData }) {
  return { 
    offerCategories: categories,
    allOffers,
    searchQuery ,
    omsData
  };
}
export default connect(mapStateToProps, actions)(OfferFilters);