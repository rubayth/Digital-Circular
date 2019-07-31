import axios from 'axios';
import { STORE_MODAL, FETCH_OMS, FETCH_OMS_CATEGORY, UPDATE_FILTERED_CATEGORIES, UPDATE_OFFERS, ALL_OFFERS, SEARCH_QUERY, FETCH_OMS_PENDING} from './types';
import _ from 'lodash';

export const toggleStoreModal = ( state ) => dispatch => {
  dispatch({type: STORE_MODAL, payload: !state});
}
export const fetchOms = (store_number) => async dispatch => {
  dispatch({ type: FETCH_OMS_PENDING });
  const res = await axios.get('https://promo-api-dev.azurewebsites.net/api/selectp?method=hugos_get_weekly_ad_offers');

  const storeOffers = _.filter(res.data.Table, {EventId: parseInt(store_number)}
  );

  const groupedData = _.groupBy(storeOffers, offer => {
    return offer.PromoType;
  });
  
  const sortTier3Covers = _.sortBy(groupedData["Tier3 Cover"], category => {
    return parseInt(category.Tier3);
  });

  const groupedProducts = _.groupBy(groupedData.Product, offer =>{
    return _.trim(offer.Category);
  });

  /*
  Seems to already be in order...
  Use this to sort Tier2 Offers
  const sortTier2Offers = _.map(groupedProducts, category => {
    return _.sortBy(category, offer => {
      return parseInt(offer.Tier2Order);
    })
  })
  console.log(sortTier2Offers)
*/

  let promoType = groupedData;
  promoType.Product = groupedProducts;
  promoType["Tier3 Cover"] = sortTier3Covers;

  const categories = _.map(groupedData["Tier3 Cover"], (type) => {
    return type.Category
  });

  dispatch({type:FETCH_OMS, payload:promoType});
  dispatch({type:ALL_OFFERS, payload: storeOffers})
  dispatch({type:UPDATE_OFFERS, payload:promoType.Product});
  dispatch({type:FETCH_OMS_CATEGORY, payload: categories});
  dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})
};

export const updateOffers = (checkedCategories) => (dispatch, getState) => {
    const { omsData } = getState();
    //if there are filters...
    if(checkedCategories.length) {
      const newState = _.pick(omsData.Product, checkedCategories);
        //return (checkedCategories.includes(offer.Category));
      
      dispatch({type: UPDATE_OFFERS, payload: newState});
      dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: checkedCategories})
    }
    //if no filters, reset offer data and clear filteredCategories state
    else {
        dispatch({type: UPDATE_OFFERS, payload: omsData.Product});
        dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})
    }
  }
  
export const searchOffers = (query) => (dispatch, getState) => {
  const { omsData } = getState();
  const allOffers = _.flatMap(omsData.Product)
 
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
    dispatch({type: ALL_OFFERS, payload: offerFilter});
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