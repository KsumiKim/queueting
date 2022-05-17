import * as actionTypes from "./actionTypes";
import {db} from "../../firebase-queueting";
import firebase from "firebase/app";

export const fetchHistoriesSuccess = (histories) => {
  return {
    type: actionTypes.FETCH_HISTORIES_SUCCESS,
    histories: histories
  }
}

export const fetchHistoriesFail = (error) => {
  return {
    type: actionTypes.FETCH_HISTORIES_FAIL,
    error: error
  }
}

export const fetchHistoriesStart = () => {
  return {
    type: actionTypes.FETCH_HISTORIES_START
  }
}


export const getHistoryCount = () => {
  return async dispatch => {
    const histories = await db.collection("histories").get();
    let count = 0;
    try {
      count = histories.size;
      return count;
    }
    catch(error) {
      console.error(error);
    }
  }
}

export const fetchReferencedHistories = (historyDoc, userId) => {
  return async dispatch => {
    let histories = [];
    const history = historyDoc.data();
    const historyId = historyDoc.id;

    const attendeeRef = await db.collection("histories").doc(historyId).collection("attendees").get();
    attendeeRef.forEach( attendeeDoc => {
      const attendee = attendeeDoc.data();

      if (attendee.userId === userId) {
        const fetchedHistory = {
          historyId: historyId,
          data: history,
          attendees: []
        };
        histories = [...histories.concat(fetchedHistory)];
      }
    } );
    return histories;
  }
}

export const fetchHistories = (lastHistoryId, userId) => {
  return async dispatch => {
    let historyRef = null;

    if (lastHistoryId) {
      const docRef = db.collection("histories").doc(lastHistoryId);
      const snapshot = await docRef.get();
      historyRef = await db.collection("histories").orderBy("bookFrom", "desc").startAt(snapshot).get();
    } else {
      dispatch(fetchHistoriesStart());
      historyRef = await db.collection("histories").orderBy("bookFrom", "desc").get();
    }

    let histories = [];
    try {
      for (const historyDoc of historyRef.docs) {
        const history = historyDoc.data();
        const historyId = historyDoc.id;
        const attendeeRef = await db.collection("histories").doc(historyDoc.id).collection("attendees").get();
        let fetchedHistory = {};

        for (const attendeeDoc of attendeeRef.docs) {
          const attendee = attendeeDoc.data();

          if (attendee.userId === userId) {
            fetchedHistory = {
              historyId: historyId,
              data: history
            };
            histories = [...histories.concat(fetchedHistory)];
          }
        }

        if (history.user.userId === userId) {
          fetchedHistory = {
            historyId: historyId,
            data: history,
          };
          histories = [...histories.concat(fetchedHistory)];
        }
      }
      dispatch(fetchHistoriesSuccess(histories));
    }
    catch(error) {
      console.error(error);
      dispatch(fetchHistoriesFail(error))
    }
  }
}

export const fetchAttendeesStart = () => {
  return {
    type: actionTypes.FETCH_ATTENDEES_START
  }
}

export const fetchAttendeesFail = (error) => {
  return {
    type: actionTypes.FETCH_ATTENDEES_FAIL,
    error: error
  }
}

export const fetchAttendeesSuccess = (attendees, historyId) => {
  return {
    type: actionTypes.FETCH_ATTENDEES_SUCCESS,
    attendees: attendees,
    historyId: historyId
  }
}

export const fetchAttendees = (historyId) => {
  return async dispatch => {
    dispatch(fetchAttendeesStart());

    const attendeeRef = await db.collection("histories").doc(historyId).collection("attendees").get();
    let attendees = [];

    try {
      attendeeRef.forEach(attendeeDoc => {
        const attendee = attendeeDoc.data();
        const attendeeId = attendeeDoc.id;
        attendees.push({
          name: attendee.name,
          userId: attendeeId
        });
      })
      dispatch(fetchAttendeesSuccess(attendees, historyId));
    } catch(error) {
      console.error(error);
      dispatch(fetchAttendeesFail(error));
    }
  }
}

export const updateHistory = (historyId, updatedHistory) => {
  return async dispatch => {
    dispatch(updateHistoryStart());
    await db.collection("histories").doc(historyId).update({
      bookFrom: firebase.firestore.Timestamp.fromDate(updatedHistory.bookFrom),
      bookTo: firebase.firestore.Timestamp.fromDate(updatedHistory.bookTo),
      subject: updatedHistory.subject,
      description: updatedHistory.description,
      user: {
        userId: updatedHistory.user.userId,
        name: updatedHistory.user.name
      }
    });
    try {
      dispatch(updateHistorySuccess(historyId, {
        ...updatedHistory,
        bookFrom: firebase.firestore.Timestamp.fromDate(updatedHistory.bookFrom),
        bookTo: firebase.firestore.Timestamp.fromDate(updatedHistory.bookTo)
      }));
    } catch (error) {
      dispatch(updateHistoryFail(error));
      console.error(error);
    }
  }
}


export const updateHistoryStart = () => {
  return {
    type: actionTypes.UPDATE_HISTORY_START
  }
}

export const updateHistorySuccess = (historyId, updatedHistory) => {
  return {
    type: actionTypes.UPDATE_HISTORY_SUCCESS,
    historyId: historyId,
    updatedHistory: updatedHistory
  }
}

export const updateHistoryFail = (error) => {
  return {
    type: actionTypes.UPDATE_HISTORY_FAIL,
    error: error
  }
}

export const deleteHistory = (historyId) => {
  return async dispatch => {
    dispatch(deleteHistoryStart())

    const result = await db.collection("histories").doc(historyId).delete();
    try {
      console.log(result);
      dispatch(deleteHistorySuccess(historyId));
    } catch (error) {
      dispatch(deleteHistoryFail(error));
    }
  }
}

export const deleteHistoryStart = () => {
  return {
    type: actionTypes.DELETE_HISTORY_START
  }
}

export const deleteHistorySuccess = (historyId) => {
  return {
    type: actionTypes.DELETE_HISTORY_SUCCESS,
    historyId: historyId
  }
}

export const deleteHistoryFail = (error) => {
  return {
    type: actionTypes.DELETE_HISTORY_FAIL,
    error: error
  }
}