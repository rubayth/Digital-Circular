import React, {Component} from 'react';
import OfferList from './components/Offers';
import FilterContainer from "./containers/FilterContainer";
import Header from './containers/Header';
import { Container } from 'reactstrap';
import {omsUrl} from './components/getOmsOfferData';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: []
    }
  }
// Below method checks if we got OMS Data before continuing on
  componentDidMount(){
    let url = `${omsUrl}`;
    // Below method gets OMS Data
    fetch(url)
    .then(data => data.json())
    .then(data => {
      this.setState({
        offers: data.Table
        
      })
    })
    .catch(err => {
      console.log('======failure=======');
      console.log(err);
    });
  }
    
  

  render() {

    return (
      <Container className="my-5 py-5">
        <Header offerData={this.state.offers} />
        <FilterContainer offerData={this.state.offers} />
        <OfferList offerData={this.state.offers} />
      </Container>
    );
  }

}

export default App;
