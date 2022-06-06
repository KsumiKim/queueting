import * as actionTypes from "./actionTypes";
import { db, storage } from "../../firebase-queueting";

export const fetchPlacesSuccess = (fetchedPlace) => {
  return {
    type: actionTypes.FETCH_PLACES_SUCCESS,
    places: fetchedPlace
  }
}

export const fetchPlacesFail = (error) => {
  return {
    type: actionTypes.FETCH_PLACES_FAIL,
    error: error
  }
}

export const fetchPlacesStart = () => {
  return {
    type: actionTypes.FETCH_PLACES_START
  }
}

export const fetchPlaces = () => {
  return async dispatch => {
    dispatch(fetchPlacesStart());

    try {
      const placeRef = await db.collection("places").get();
      let places = [];

      for (const place of placeRef.docs) {
        const placeId = place.id;

        const roomRef = await dispatch(fetchRooms(placeId));
        let fetchedPlace = null;
        let fetchedRooms = [];

        roomRef.forEach(room => {
          fetchedRooms.push(room);
        });

        fetchedPlace = {
          placeId: placeId,
          data: place.data(),
          rooms: fetchedRooms
        }
        if (roomRef.length > 0) {
          places.push(fetchedPlace);
        }
      }
      dispatch(fetchPlacesSuccess(places));
    } catch (error) {
      console.error(error);
      dispatch(fetchPlacesFail(error))
    }
  }
}


export const createPlace = (newPlace) => {
  return async dispatch => {
    dispatch(createPlaceStart());

    try {
      const placesRef = db.collection("places").doc();
      await placesRef.set(newPlace);

      dispatch(createPlaceSuccess());
    } catch (error) {
      console.error(error);
      dispatch(createPlaceFail(error));
    }
  }
}

export const createPlaceStart = () => {
  return {
    type: actionTypes.CREATE_PLACE_START
  }
}

export const createPlaceSuccess = () => {
  return {
    type: actionTypes.CREATE_PLACE_SUCCESS
  }
}

export const createPlaceFail = (error) => {
  return {
    type: actionTypes.CREATE_PLACE_FAIL,
    error: error
  }
}


export const deletePlace = (placeId) => {
  return async dispatch => {
    dispatch(deletePlaceStart());

    await db.collection("places").doc(placeId).delete();
    try {
      dispatch(deletePlaceSuccess(placeId));
    } catch (error) {
      dispatch(deletePlaceFail(error));
    }
  }
}

export const deletePlaceStart = () => {
  return {
    type: actionTypes.DELETE_PLACE_START
  }
}

export const deletePlaceSuccess = (placeId) => {
  return {
    type: actionTypes.DELETE_PLACE_SUCCESS,
    placeId: placeId
  }
}

export const deletePlaceFail = (error) => {
  return {
    type: actionTypes.DELETE_PLACE_FAIL,
    error: error
  }
}


export const updatePlace = (placeId, place) => {
  return async dispatch => {
    const updatedPlace = {
      name: place.name,
      address: place.address
    }

    dispatch(updatePlaceStart());
    await db.collection("places").doc(placeId).update(updatedPlace);
    try {
      dispatch(updatePlaceSuccess(placeId, updatedPlace));
    } catch (error) {
      dispatch(updatePlaceFail(error));
      console.error(error);
    }
  }
}

export const updatePlaceStart = () => {
  return {
    type: actionTypes.UPDATE_PLACE_START
  }
}

export const updatePlaceSuccess = (placeId, updatedPlace) => {
  return {
    type: actionTypes.UPDATE_PLACE_SUCCESS,
    placeId: placeId,
    updatedPlace: updatedPlace
  }
}

export const updatePlaceFail = (error) => {
  return {
    type: actionTypes.UPDATE_PLACE_FAIL,
    error: error
  }
}

export const fetchRoomsStart = () => {
  return {
    type: actionTypes.FETCH_ROOMS_START
  }
}

export const fetchRoomsSuccess = (room, placeId) => {
  return {
    type: actionTypes.FETCH_ROOMS_SUCCESS,
    room: room,
    placeId: placeId
  }
}

export const fetchRoomsFail = (error) => {
  return {
    type: actionTypes.FETCH_ROOMS_FAIL,
    error: error
  }
}


export const fetchRooms = (placeId) => {
  return async dispatch => {
    dispatch(fetchRoomsStart());
    const roomRef = await db.collection("places").doc(placeId).collection("rooms").get();
    let rooms = [];

    try {
      roomRef.forEach(roomDoc => {
        const room = roomDoc.data();
        const roomId = roomDoc.id;
        rooms.push({
          roomId: roomId,
          data: room
        });
      })
      dispatch(fetchRoomsSuccess(rooms, placeId));
      return rooms;
    } catch (error) {
      console.error(error);
      dispatch(fetchRoomsFail(error));
    }
  }
}

export const updateRoomStart = () => {
  return {
    type: actionTypes.UPDATE_ROOM_START
  }
}

export const updateRoomSuccess = (placeId, roomId, room) => {
  return {
    type: actionTypes.UPDATE_ROOM_SUCCESS,
    placeId: placeId,
    roomId: roomId,
    updatedRoom: room
  }
}

export const updateRoomFail = (error) => {
  return {
    type: actionTypes.UPDATE_ROOM_FAIL,
    error: error
  }
}

export const updateRoom = (placeId, roomId, room, attachment) => {
  return async dispatch => {
    dispatch(updateRoomStart());
    try {
      const roomRef = db.collection("places").doc(placeId).collection("rooms").doc(roomId);

      await roomRef.update(room).then(async () => {
        await storage.child(`/places/rooms/${roomId}.jpg`).putString(attachment, "data_url");
      });

      dispatch(updateRoomSuccess(placeId, roomId, room));
    } catch (error) {
      dispatch(updateRoomFail(error));
      console.error(error);
    }
  }
}

export const createRoomStart = () => {
  return {
    type: actionTypes.CREATE_ROOM_START
  }
}

export const createRoomSuccess = (placeId, room) => {
  return {
    type: actionTypes.CREATE_ROOM_SUCCESS,
    placeId: placeId,
    createdRoom: room
  }
}

export const createRoomFail = (error) => {
  return {
    type: actionTypes.CREATE_ROOM_FAIL,
    error: error
  }
}

export const createRoom = (placeId, room, attachment) => {
  return async dispatch => {
    dispatch(createRoomStart());
    let createdRoom = {};

    try {
      await db.collection("places").doc(placeId).collection("rooms").add(room)
      .then( async (roomRef) => {
        createdRoom = {
          roomId: roomRef.id,
          data: room
        };
        await storage.child(`/places/rooms/${roomRef.id}.jpg`).putString(attachment, "data_url");
      });

      dispatch(createRoomSuccess(placeId, createdRoom));
    } catch (error) {
      dispatch(createRoomFail(error));
      console.error(error);
    }
  }
}

export const deleteRoomStart = () => {
  return {
    type: actionTypes.DELETE_ROOM_START
  }
}

export const deleteRoomSuccess = (placeId, roomId) => {
  return {
    type: actionTypes.DELETE_ROOM_SUCCESS,
    placeId: placeId,
    roomId: roomId
  }
}

export const deleteRoomFail = (error) => {
  return {
    type: actionTypes.DELETE_ROOM_FAIL,
    error: error
  }
}

export const deleteRoom = (placeId, roomId) => {
  return async dispatch => {
    dispatch(deleteRoomStart());

    try {
      await db.collection("places").doc(placeId).collection("rooms").doc(roomId).delete();
      dispatch(deleteRoomSuccess(placeId, roomId));
    } catch (error) {
      dispatch(deleteRoomFail(error));
      console.error(error);
    }
  }
}