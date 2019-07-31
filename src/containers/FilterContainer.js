import React, {Component} from 'react';
import OfferFilters from "../components/widgets/OfferFilters";
import { Row, Col } from 'reactstrap';
import SearchOffers from '../components/widgets/SearchOffers';
import StoreSelection from '../components/widgets/StoreSelection';

class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3 align-items-top">
        <Col className="col-md-3 d-none d-md-block pr-0"><StoreSelection /></Col>
        <Col className="col__category-filter--handle col-6 col-md-4"><OfferFilters offerCategories={this.props.offerCategories} updateOffers={this.props.updateOffers} /></Col>
        <Col className="col__main-search col-6 col-md-5"><SearchOffers searchOffers={this.props.searchOffers} /></Col>
      </Row>
      
    );
  }
}

export default FilterContainer;
