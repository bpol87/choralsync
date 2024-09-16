import { combineReducers } from "redux";

const membersCards = (state = [], action) => {
  switch (action.type) {
    case "SET_MEMBER_CARDS":
      return action.payload;
    case "UNSET_MEMBER_CARDS":
      return {};
    default:
      return state;
  }
};

const memberProfile = (state = {}, action) => {
  switch (action.type) {
    case "SET_MEMBER":
      return action.payload;
    case "UNSET_MEMBER":
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user

export default combineReducers({
  membersCards,
  memberProfile,
});