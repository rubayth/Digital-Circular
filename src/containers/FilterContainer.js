import React, {Component} from 'react';
import OfferFilters from "../components/OfferFilters";
import { Row } from 'reactstrap';


class FilterContainer extends Component {
 
  render() {

    return (
      <Row className="py-3">
          <OfferFilters offerData={this.props.offerData} updateOffers={this.props.updateOffers} />
      </Row>
    );
  }

}

export default FilterContainer;
