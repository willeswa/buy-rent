import actionTypes from "./actionTypes";

export const postReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.authSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        user: action.user
      };

    case actionTypes.logoutUser:
      return {
        ...state,
        user: action.user,
        isLoggedIn: false
      };
    case actionTypes.userLogin:
      return {
        ...state,
        isLoggedIn: true
      }
    default:
      return { ...state };
  }
};
