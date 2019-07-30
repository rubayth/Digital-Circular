
import axios from 'axios';
import { STORE_MODAL, FETCH_OMS, FETCH_OMS_CATEGORY, UPDATE_FILTERED_CATEGORIES, UPDATE_OFFERS, SEARCH_QUERY, FETCH_OMS_PENDING} from './types';
import _ from 'lodash';

export const toggleStoreModal = ( state ) => dispatch => {
  dispatch({type: STORE_MODAL, payload: !state});
}
export const fetchOms = (store_number) => async dispatch => {
  dispatch({ type: FETCH_OMS_PENDING });
  const res = await axios.get('https://promo-api-dev.azurewebsites.net/api/selectp?method=hugos_get_weekly_ad_offers');

  //Get list of categories from offer
  const categories = res.data.Table.map(function (offer) {
      const categoryTrim = _.trimEnd(offer.Category); //remove ending whitespace
      return categoryTrim;
  });
  //Filter to categories to remove the duplicates for building filters
  const categoryUnique = categories.filter(function(cat, index){
      return categories.indexOf(cat) >= index;
  });
  const storeOffers = _.filter(res.data.Table, {EventId: parseInt(store_number)}
  )

  dispatch({type:FETCH_OMS, payload:storeOffers});
  dispatch({type:UPDATE_OFFERS, payload:storeOffers});
  dispatch({type:FETCH_OMS_CATEGORY, payload: categoryUnique});
  dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})
};

export const updateOffers = (checkedCategories) => (dispatch, getState) => {
    const { allOffers } = getState();
    //if there are filters...
    if(checkedCategories.length) {
      const newState = _.filter(allOffers, (offer) => {
        return (checkedCategories.includes(offer.Category));
      });
      dispatch({type: UPDATE_OFFERS, payload: newState});
      dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: checkedCategories})
  }
    //if no filters, reset offer data and clear filteredCategories state
    else {
        dispatch({type: UPDATE_OFFERS, payload: allOffers});
        dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})

    }
  }

export const searchOffers = (query) => (dispatch, getState) => {
  const { allOffers } = getState();

  const offerFilter = allOffers.filter((offer) => {

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
    dispatch({type: UPDATE_OFFERS, payload: offerFilter});
    dispatch({type: SEARCH_QUERY, payload: query})
}

/*
export const fetchGeocode = (zipcode) => async dispatch => {
    const res = await axios.get('https://www.mapquestapi.com/geocoding/v1/address', {
        params: {
            key: keys.mapquestKey,
            location: zipcode,
        }
    });
    const origin = res.results[0].locations[0].latLng
    dispatch({type:FETCH_GEOCODE, payload:origin});
};
*/