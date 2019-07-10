import React, {Component} from 'react';
import OfferFilters from "../components/OfferFilters";
import { Row, Col } from 'reactstrap';
import SearchOffers from '../components/SearchOffers';
import StoreSelection from '../components/SearchOffers';

class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3">
        <StoreSelection />
        <Col xs="6" sm="6"><OfferFilters offerCategories={this.props.offerCategories} updateOffers={this.props.updateOffers} /></Col>
        <Col xs="6" sm="3"><SearchOffers searchOffers={this.props.searchOffers} /></Col>
      </Row>
      
    );
  }

}

export default FilterContainer;
