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
      offers: [],
      allOffers: [],
      offerCategories: []
    }

    this.searchOffers = this.searchOffers.bind(this);
    this.updateOffers = this.updateOffers.bind(this);
  }
// Below method checks if we got OMS Data before continuing on
  componentDidMount(){
    let url = `${omsUrl}`;
    // Below method gets OMS Data
    fetch(url)
    .then(data => data.json())
    .then(data => {
      this.setState({
        offers: data.Table,
        allOffers: data.Table,
        offerCategories: data.Table
      })
    })
    .catch(err => {
      console.log('======failure=======');
      console.log(err);
    });
  }
    
  searchOffers(query){

    let offerFilter = this.state.allOffers.filter((offer) => {
      // change current item to lowercase
      const lc = offer.Category.toLowerCase();
      
      // check to see if the current list item includes the search term
      // If it does, it will be added to newList. Using lowercase eliminates
      // issues with capitalization in search terms and search content
      return lc.includes(query);
    });
    this.setState({offers: offerFilter})
  }

  updateOffers(e) {
    if (e.target.checked) {
      const currState = this.state.offers;
      const newState = currState.filter(offers => offers.Category.includes(e.target.name));
        this.setState({
            offers: newState
        });
        console.log(newState);
    }
    else {
      console.log('Not checked');
    }
  }


  render() {

    return (
      <Container className="my-5 py-5">
        <Header searchOffers={this.searchOffers} />
        <FilterContainer offerCategories={this.state.offerCategories} updateOffers={this.updateOffers} />
        <OfferList offerData={this.state.offers} />
      </Container>
    );
  }

}

export default App;
