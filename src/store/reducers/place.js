import * as actionTypes from "../actions/actionTypes";

const initialState = {
  places: null,
  loading: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PLACES_START:
      return {
        ...state,
        places: []
      }
    case actionTypes.FETCH_PLACES_SUCCESS:
      return {
        ...state,
        places: [...state.places.concat(action.places)]
      }
    case actionTypes.FETCH_PLACES_FAIL:
      return {
      ...state,
      error: action.error
    }
    case actionTypes.CREATE_PLACE_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CREATE_PLACE_SUCCESS:
      return {
        ...state,
        loading: null
    }
    case actionTypes.CREATE_PLACE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: null
    }
    case actionTypes.DELETE_PLACE_START:
      return {
        ...state
      }
    case actionTypes.DELETE_PLACE_SUCCESS:
      const filteredPlaces = state.places.filter(place => place.placeId !== action.placeId);

      return {
        ...state,
        places: filteredPlaces
    }
    case actionTypes.DELETE_PLACE_FAIL:
      return {
        ...state,
        error: action.error
    }
    case actionTypes.UPDATE_PLACE_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_PLACE_SUCCESS:
      const oldPlaceIdx = state.places.findIndex(place => place.placeId === action.placeId);
      let newPlaces = [...state.places];
      newPlaces[oldPlaceIdx] = action.updatedPlace;

      return {
        ...state,
        places: newPlaces,
        loading: null
    }
    case actionTypes.UPDATE_PLACE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: null
    }
    default:
      return state;
  }
}

export default reducer;