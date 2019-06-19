import React, {Component} from 'react';
import OfferFilters from "../components/OfferFilters";
import { Row } from 'reactstrap';


class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3">
          <OfferFilters offerCategories={this.props.offerCategories} updateOffers={this.props.updateOffers} />
      </Row>
    );
  }

}

export default FilterContainer;
