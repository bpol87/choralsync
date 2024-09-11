import { combineReducers } from "redux";

const concertList = (state = {}, action) => {
  switch (action.type) {
    case "SET_CONCERTS":
      return action.payload;
    default:
      return state;
  }
};

const activeConcert = (state = {}, action) => {
  switch (action.type) {
    case "SET_ACTIVE_CONCERT":
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({
  concertList,
  activeConcert,
});
