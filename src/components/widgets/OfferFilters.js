import React, {Component} from 'react';
import {FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
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
        const removeFilter = _.remove(this.state.checkedCategories, (category) => {
          return !(category === filter);
        })
        if(removeFilter.length > 0){
          const checkedBugs = _.filter(removeFilter, filter => {
            return _.includes(this.props.omsData.Bugs, filter)
          });
          const checkedCat = _.filter(removeFilter, filter => {
            return !(_.includes(this.props.omsData.Bugs, filter));
          });
          //this.props.updateOffersWithBugs(checkedBugs);
          this.props.updateOffers(checkedCat, checkedBugs);
        }
        else{
          this.props.resetOffers();
        }
        this.setState({
          checkedCategories : removeFilter
        })
      }
      //add filter to state and update offers
      else{
        const checkedCategories = this.state.checkedCategories;
        checkedCategories.push(filter);
        this.setState({
          checkedCategories
        });
        const checkedBugs = _.filter(checkedCategories, filter => {
          return _.includes(this.props.omsData.Bugs, filter)
        });
        const checkedCat = _.filter(checkedCategories, filter => {
          return !(_.includes(this.props.omsData.Bugs, filter));
        });
        //this.props.updateOffersWithBugs(checkedBugs);
        this.props.updateOffers(checkedCat, checkedBugs);
      }
    }
    
    onClearClick(){
      this.setState({
        checkedCategories:[]
      });
      this.toggle();
      this.props.resetOffers();
    }
    
    renderLabels(){
      const categories = _.map(this.props.omsData["Tier3 Cover"], (type) => {
        return type.Category
      });
      const filters= _.concat(categories, this.props.omsData.Bugs);
      return filters.map((filter, index) => { 
          return(
            <Col key={index} className="category__item col-12">
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
          <DropdownToggle outline color="grey" block caret disabled={Boolean(this.props.searchQuery) || this.props.omsData === false}>
            Filter Offers
          </DropdownToggle>
          <DropdownMenu  className="container col__category-filter container"
            style={{
              position: "absolute"
              }}>
                  <Container>
                    <Row >
                      <Col className="col-12 text-center">
                        <Button onClick={this.onClearClick} color="blue">Clear All</Button>
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