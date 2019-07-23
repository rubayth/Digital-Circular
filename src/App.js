import React, {Component} from 'react';
import OfferList from './components/offers/OffersList';
import FilterContainer from "./containers/FilterContainer";
import { Container } from 'reactstrap';
import HeroSlider from './components/HeroSlider';

import { connect } from 'react-redux';
import * as actions from './actions';

class App extends Component {

  render() {
    return (
      <Container className="my-5 py-5 circular-container">
        <FilterContainer/>
        <HeroSlider />
        <OfferList/>
      </Container>
    );
  }
}


export default connect(null, actions)(App);