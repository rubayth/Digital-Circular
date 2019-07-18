import { UPDATE_FILTERED_CATEGORIES } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case UPDATE_FILTERED_CATEGORIES:
            return action.payload || false;
        default: return state;
    }
}