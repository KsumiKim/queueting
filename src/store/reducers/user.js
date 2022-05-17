import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        error: null,
        loading: true,
        loggedOut: false
      }
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
      }
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        redirectPath: "/",
        loggedOut: true
      }
    case actionTypes.FETCH_USER_START:
        return {
          ...state
      }
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        name: action.name,
        error: null,
        loading: false,
        redirectPath: "/home"
      }
    case actionTypes.FETCH_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;