import { FETCH_OMS, FETCH_OMS_PENDING } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_OMS:
            return action.payload || false;
        case FETCH_OMS_PENDING:
            return false;
        default: return state;
    }
}