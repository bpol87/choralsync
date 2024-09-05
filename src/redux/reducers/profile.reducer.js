const profileReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_USER_PROFILE':
        return action.payload;
      case 'UNSET_USER_PROFILE':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default profileReducer;
  