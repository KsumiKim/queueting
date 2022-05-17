import * as actionTypes from "./actionTypes";
import {db} from "../../firebase-queueting";

export const addRoomInfo = (roomInfo) => {
  return {
    type: actionTypes.ADD_MEETING_ROOM_INFO,
    roomInfo: roomInfo
  }
}

export const addDetailInfo = (detailInfo) => {
  return {
    type: actionTypes.ADD_MEETING_DETAIL_INFO,
    detailInfo: detailInfo
  }
}

export const scheduleMeetingStart = () => {
  return {
    type: actionTypes.SCHEDULE_MEETING_START
  }
}

export const scheduleMeetingSuccess = () => {
  return {
    type: actionTypes.SCHEDULE_MEETING_SUCCESS
  }
}

export const scheduleMeetingFail = (error) => {
  return {
    type: actionTypes.SCHEDULE_MEETING_FAIL,
    error: error
  }
}

export const scheduleMeeting = (meetingData, attendeesData) => {
  return async dispatch => {
    dispatch(scheduleMeetingStart());

    const newHistoryRef = db.collection("histories").doc();
    const res = await newHistoryRef.set(meetingData);

    try {
      attendeesData.forEach(async attendeeData => {
        dispatch(addMeetingAttendeeStart());

        const newAttendeeRef = newHistoryRef.collection("attendees").doc();
        const attendeeRes = await newAttendeeRef.set({
          userId: attendeeData.userId,
          name: attendeeData.name
        });
        try {
          dispatch(addMeetingAttendeeSuccess());
        } catch (error) {
          dispatch(addMeetingAttendeeFail(error));
        }
      });
      dispatch(scheduleMeetingSuccess());
    } catch (error) {
      dispatch(scheduleMeetingFail(error));
    }
  }
}

const addMeetingAttendeeStart = () => {
  return {
    type: actionTypes.ADD_MEETING_ATTENDEE_START
  }
}

const addMeetingAttendeeSuccess = () => {
  return {
    type: actionTypes.ADD_MEETING_ATTENDEE_SUCCESS
  }
}

const addMeetingAttendeeFail = (error) => {
  return {
    type: actionTypes.ADD_MEETING_ATTENDEE_FAIL,
    error: error
  }
}
