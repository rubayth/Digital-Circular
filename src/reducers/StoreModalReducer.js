import { STORE_MODAL} from '../actions/types';

export default function(state = false, action) {
    switch (action.type) {
        case STORE_MODAL:
            return action.payload || false;
        default: return state;
    }
}