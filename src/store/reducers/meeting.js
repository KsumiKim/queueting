import * as actionTypes from "../actions/actionTypes";

const initialState = {
  meeting: null,
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MEETING_ROOM_INFO:
      return {
          ...state,
          meeting: {
            roomId: action.roomInfo.roomId,
            placeId: action.roomInfo.placeId,
            userId: action.roomInfo.userId,
          }
        };
      case actionTypes.ADD_MEETING_DETAIL_INFO:
        return {
          ...state,
          ...state.meeting,
          subject: action.detailInfo.subject,
          description: action.detailInfo.description,
          attendees: action.detailInfo.attendees,
          meetingDate: action.detailInfo.meetingDate,
          fromTime: action.detailInfo.fromTime,
          toTime: action.detailInfo.toTime
        };
      case actionTypes.SCHEDULE_MEETING_START:
        return {
          ...state,
          loading: true
        };
      case actionTypes.SCHEDULE_MEETING_SUCCESS:
        return {
          undefined
        };
      case actionTypes.SCHEDULE_MEETING_FAIL:
        return {
          ...state,
          loading: false
        };
      default:
        return state;
    }
  }

  export default reducer;
