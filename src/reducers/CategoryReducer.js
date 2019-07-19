import { FETCH_OMS_CATEGORY } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_OMS_CATEGORY:
            return action.payload || false;
        default: return state;
    }
}