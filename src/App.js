import React, {Component} from 'react';
import OfferList from './components/offers/OffersList';
import PromotionalOffers from './components/offers/PromotionalOffers';
import FilterContainer from "./containers/FilterContainer";
import { Container } from 'reactstrap';
import HeroSlider from './components/HeroSlider';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {

  componentDidMount(){
    this.props.fetchOms();
  }
    
  render() {
    return (
      <Container className="my-5 py-5 circular-container">
        <FilterContainer/>
        <HeroSlider />
        <PromotionalOffers />
        <OfferList/>
      </Container>
    );
  }
}


export default connect(null, actions)(App);