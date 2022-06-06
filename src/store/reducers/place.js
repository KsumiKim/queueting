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
    case actionTypes.UPDATE_ROOM_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_ROOM_SUCCESS:
      const placeIdx = state.places.findIndex(place => place.placeId === action.placeId);
      const place = state.places[placeIdx];
      const oldRoomIdx = place.rooms.findIndex(room => room.roomId === action.roomId);

      let newRooms = [...state.places[placeIdx].rooms];
      newRooms[oldRoomIdx] = action.updatedRoom;
      place.rooms = newRooms;

      let places = [...state.places];
      places[placeIdx].rooms = newRooms;
      console.log(places);
      return {
        ...state,
        places: places,
        loading: null
    }
    case actionTypes.UPDATE_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: null
    }

    case actionTypes.CREATE_ROOM_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.CREATE_ROOM_SUCCESS:
      const originalPlaces = [...state.places];
      const updatedPlaceIdx = state.places.findIndex(place => place.placeId === action.placeId);
      originalPlaces[updatedPlaceIdx].rooms.push(action.createdRoom);

      return {
        ...state,
        places: originalPlaces,
        loading: null
      }
    case actionTypes.CREATE_ROOM_FAIL:
      return {
        ...state,
        error: action.error,
        loading: null
      }
    case actionTypes.DELETE_ROOM_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DELETE_ROOM_SUCCESS:
      const original = [...state.places];
      const targetPlaceIdx = state.places.findIndex(place => place.placeId === action.placeId);
      const filteredRooms = original[targetPlaceIdx].rooms.filter(room => room.roomId !== action.roomId);;
      original[targetPlaceIdx].rooms = filteredRooms;

      return {
        ...state,
        places: original,
        loading: null
      }
    case actionTypes.DELETE_ROOM_FAIL:
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