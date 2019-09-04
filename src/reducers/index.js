
import { combineReducers } from 'redux';
import omsReducer from './OmsReducer';
import categoryReducer from './CategoryReducer'
import currentOffersReducer from './CurrentOffersReducer';
import AllOffersReducer from './AllOffersReducer';
import filterReducer from './FilterReducer';
import StoreModalReducer from './StoreModalReducer';
import SearchQueryReducer from './SearchQueryReducer';
import StoreReducer from './StoreReducer';

export default combineReducers({
    omsData: omsReducer,
    categories: categoryReducer,
    filters: filterReducer,
    allOffers: AllOffersReducer,
    currentOffers: currentOffersReducer,
    storeModal: StoreModalReducer,
    searchQuery: SearchQueryReducer,
    storeInfo: StoreReducer
});