
import { combineReducers } from 'redux';
import omsReducer from './OmsReducer';
import categoryReducer from './CategoryReducer'
import currentOffersReducer from './CurrentOffersReducer';
import filterReducer from './FilterReducer';
import StoreModalReducer from './StoreModalReducer';

export default combineReducers({
    allOffers: omsReducer,
    categories: categoryReducer,
    filters: filterReducer,
    currentOffers: currentOffersReducer,
    storeModal: StoreModalReducer
});