import React, {Component} from 'react';
import OfferFilters from "../components/OfferFilters";
import { Row, Col } from 'reactstrap';
import SearchOffers from '../components/SearchOffers';
import StoreSelection from '../components/stores/StoreSelection';

class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3 align-items-top">
        <Col xs="12" sm="3"><StoreSelection /></Col>
        <Col xs="6" sm="4"><OfferFilters offerCategories={this.props.offerCategories} updateOffers={this.props.updateOffers} /></Col>
        <Col className="col__main-search col-6 col-md-5"><SearchOffers searchOffers={this.props.searchOffers} /></Col>
      </Row>
      
    );
  }

}

export default FilterContainer;
