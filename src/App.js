import React, {Component} from 'react';
import OfferList from './components/Offers';
import FilterContainer from "./containers/FilterContainer";
import { Container } from 'reactstrap';
import {omsUrl} from './components/getOmsOfferData';
import _ from 'lodash';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      allOffers: [],
      offerCategories: [],
      defaultData: []
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
        offerCategories: data.Table,
        defaultData: data.Table
      })
    })
    .catch(err => {
      console.log('======failure=======');
      console.log(err);
    });
  }
    
  searchOffers(query){

    let offerFilter = this.state.allOffers.filter((offer) => {

      if (offer.Mainline1 != null) {
        // change current item to lowercase
      const lc = offer.Mainline1.toLowerCase();
      
      // check to see if the current list item includes the search term
      // If it does, it will be added to newList. Using lowercase eliminates
      // issues with capitalization in search terms and search content
      return lc.includes(query);
      }

      // Continue filters through null values
      else {
        return false;
      }
    });
    this.setState({offers: offerFilter})
  }

  //before logic - accounted only for 1 filter
  //new logic - can have multiple filters
  updateOffers(checkedCategories) {
    if(checkedCategories.length) {
      const newState = _.filter(this.state.defaultData, (offer) => {
        return (checkedCategories.includes(offer.Category));
      })
      this.setState({ offers: newState });
  }
    else this.setState({offers: this.state.defaultData})
  }
  


  render() {

    return (
      <Container className="my-5 py-5 circular-container">
        <FilterContainer offerCategories={this.state.offerCategories} updateOffers={this.updateOffers} searchOffers={this.searchOffers} offerData={this.state.offers}/>
        <OfferList offerData={this.state.offers} />
      </Container>
    );
  }

}

export default App;
