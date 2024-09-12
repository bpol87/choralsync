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

const sectionTracks = (state = [], action) => {
  switch (action.type) {
    case 'SET_SECTION_TRACKS':
      // Replace the current state with the section-specific track list
      return action.payload;

    default:
      return state;
  }
};

const balancedTracks = (state = [], action) => {
  switch (action.type) {
    case 'SET_BALANCED_TRACKS':
      // Replace the current state with the balanced track list
      return action.payload;

    default:
      return state;
  }
};

export default combineReducers({
  concertList,
  activeConcert,
  concertPdfs,
  sectionTracks,
  balancedTracks,
});

