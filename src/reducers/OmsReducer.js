import { FETCH_OMS } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_OMS:
            return action.payload || false;
        default: return state;
    }
}