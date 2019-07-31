import { UPDATE_OFFERS, UPDATE_OFFERS_PENDING } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case UPDATE_OFFERS:
            return action.payload || false;
        case UPDATE_OFFERS_PENDING:
            return false
        default: return state;
    }
}