import React, {Component} from 'react';
import OfferFilters from "../components/OfferFilters";
import { Row, Col } from 'reactstrap';
import SearchOffers from '../components/SearchOffers';
import StoreSelection from '../components/StoreSelection';

class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3 align-items-center">
        <Col xs="12" sm="3"><StoreSelection /></Col>
        <Col xs="6" sm="6"><OfferFilters /></Col>
        <Col xs="6" sm="3"><SearchOffers/></Col>
      </Row>
      
    );
  }

}

export default FilterContainer;
