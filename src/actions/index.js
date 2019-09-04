import axios from 'axios';
import { STORE_MODAL, STORE_INFO, FETCH_OMS, UPDATE_FILTERED_CATEGORIES, UPDATE_OFFERS, ALL_OFFERS, SEARCH_QUERY, FETCH_OMS_PENDING, UPDATE_OFFERS_PENDING} from './types';
import _ from 'lodash';

export const toggleStoreModal = ( state ) => dispatch => {
  dispatch({type: STORE_MODAL, payload: !state});
}

export const setStore = ( store ) => dispatch => {
  dispatch({type: STORE_INFO, payload: store})
}

export const fetchOms = ({ store_number, api }) => async dispatch => {
  dispatch({ type: FETCH_OMS_PENDING });
  dispatch({ type: UPDATE_OFFERS_PENDING});

  const res = await axios.get(api);
  
  const storeOffers = _.filter(res.data.Table, {EventId: parseInt(store_number)}
  );
  const bugs = _
    .chain(storeOffers)
    .filter(offer => {return (offer.Bug && offer.Bug !== " ")})
    .map(offer => { 
      if(offer.Bug) return offer.Bug 
      else return null})
    .uniq()
    .value();

  const groupedData = _.groupBy(storeOffers, offer => {
    return offer.PromoType;
  });
  
  const sortHero = _.sortBy(groupedData.Hero, heroOffer => {
    return parseInt(heroOffer.HeroOrder);
  });

  const sortTier3Covers = _.sortBy(groupedData["Tier3 Cover"], category => {
    return parseInt(category.Tier3);
  });

  const sortTier3Offers = _
    .chain(groupedData.Product)
    .sortBy( offer => { return parseInt(offer.Tier3Order) })
    .groupBy( offer => {return _.trim(offer.Category)})
    .value();

  const sortTier2Offers = _
    .chain(storeOffers)
    .filter( offer => { return (offer.Tier2 && offer.PromoType === "Product")})
    .sortBy( offer => parseInt(offer.Tier2Order))
    .value();


  let promoType = groupedData;
  promoType.Product = sortTier3Offers;
  promoType["Tier3 Cover"] = sortTier3Covers;
  promoType.Bugs=bugs;
  promoType.Hero = sortHero;
  promoType.Tier2Offers = sortTier2Offers;
  
  //console.log(promoType)

  dispatch({type:FETCH_OMS, payload:promoType});
  dispatch({type:ALL_OFFERS, payload: storeOffers})
  dispatch({type:UPDATE_OFFERS, payload:promoType.Product});
  dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})
};

export const resetOffers = () => (dispatch, getState) => {
  const { omsData } = getState();
  dispatch({type: UPDATE_OFFERS, payload: omsData.Product});
  dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: []})
}

export const updateOffers = (checkedCategories, checkedBugs) => (dispatch, getState) => {
    const { omsData } = getState();
    if(checkedBugs.length && checkedCategories.length){
      const bugFilter = _.mapValues(omsData.Product, category => {
        return _.filter(category, offer => {
          return _.includes(checkedBugs, offer.Bug)
        })
      });
      const filters = _.concat(checkedCategories, checkedBugs);
      const newState = _.pick(bugFilter, checkedCategories);
      dispatch({type: UPDATE_OFFERS, payload: newState});
      dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: filters})
    }
    else if (checkedBugs.length){
      const bugFilter = _.mapValues(omsData.Product, category => {
        return _.filter(category, offer => {
          return _.includes(checkedBugs, offer.Bug)
        })
      });
      dispatch({type: UPDATE_OFFERS, payload: bugFilter});
      dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: checkedBugs})
  }
    //if there are category filters...
    else{
      const newState = _.pick(omsData.Product, checkedCategories);
      dispatch({type: UPDATE_OFFERS, payload: newState});
      dispatch({type: UPDATE_FILTERED_CATEGORIES, payload: checkedCategories})
    }
}
  
  
export const searchOffers = (query) => (dispatch, getState) => {
  const { omsData } = getState();
  const allOffers = _.flatMap(omsData.Product);
 
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