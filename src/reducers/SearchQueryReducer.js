import { SEARCH_QUERY } from '../actions/types';

export default function(state = "", action) {
    switch (action.type) {
        case SEARCH_QUERY:
            return action.payload || "";
        default: return state;
    }
}