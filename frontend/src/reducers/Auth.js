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
        user: action.user
      };
    default:
      return { ...state };
  }
};
