import { combineReducers } from "redux";

const concertList = (state = [], action) => {
  switch (action.type) {
      case "SET_CONCERTS":
          return action.payload;
      default:
          return state;
  }
};

const activeConcert = (state = [], action) => {
  switch (action.type) {
      case "SET_ACTIVE_CONCERT":
          return action.payload;
      default:
          return state;
  }
};

const concertPdfs = (state = [], action) => {
  switch (action.type) {
    case "SET_PDFS":
      // Directly set the list of PDFs
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  concertList,
  activeConcert,
  concertPdfs,
});

