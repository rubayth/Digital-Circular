import { STORE_INFO } from "../actions/types";

const store = {
  store_number: "",
  name: "",
  api: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: ""
  }
};

export default function(state = store, action) {
  switch (action.type) {
    case STORE_INFO:
      return action.payload || false;
    default:
      return state;
  }
}
