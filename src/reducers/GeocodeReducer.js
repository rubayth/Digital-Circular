import { FETCH_GEOCODE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_GEOCODE:
            return action.payload || false;
        default: return state;
    }
}