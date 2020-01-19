import actionTypes from "./actionTypes";

export const postReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.loadingAction:
      return { ...state, isLoading: true, isError: false };
    case actionTypes.postSuccess:
      return {
        ...state,
        isLoading: false,
        isError: false,
        payload: action.payload
      };
    case actionTypes.postFailure:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.error
      };

    case actionTypes.logoutUser:
      return {
        ...state,
        payload: {}
      }
    default:
      return { ...state };
  }
};