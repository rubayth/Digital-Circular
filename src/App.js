import React, {Component} from 'react';
import OfferList from './components/offers/OffersList';
import FilterContainer from "./containers/FilterContainer";
import { Container } from 'reactstrap';
import {omsUrl} from './components/getOmsOfferData';
import _ from 'lodash';
import HeroSlider from './components/HeroSlider';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offers: [],
      allOffers: [],
      offerCategories: [],
      defaultData: [],
      filteredCategories: [],
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
      //Get list of categories from offer
      const categories = data.Table.map(function (offer) {
        return offer.Category;
      });
      //Filter to categories to remove the duplicates for building filters
      const categoryUnique = categories.filter(function(cat, index){
        return categories.indexOf(cat) >= index;
      });
      this.setState({
        offers: data.Table,
        allOffers: data.Table,
        defaultData: data.Table,
        offerCategories: categoryUnique,
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
    //if there are filters...
    if(checkedCategories.length) {
      const newState = _.filter(this.state.defaultData, (offer) => {
        return (checkedCategories.includes(offer.Category));
      })
      this.setState({ 
        offers: newState, 
        filteredCategories: checkedCategories
      });
  }
    //if no filters, reset offer data and clear filteredCategories state
    else this.setState({
      offers: this.state.defaultData,
      filteredCategories:[],
    })
  }
  


  render() {

    return (
      <Container className="my-5 py-5 circular-container">
        <FilterContainer offerCategories={this.state.offerCategories} updateOffers={this.updateOffers} searchOffers={this.searchOffers} />
        <HeroSlider />
        <OfferList 
          offerData={this.state.offers} 
          filteredCategories={this.state.filteredCategories} 
          offerCategories={this.state.offerCategories}/>
      </Container>
    );
  }

}

export default App;
