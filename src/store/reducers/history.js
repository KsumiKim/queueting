import * as actionTypes from "../actions/actionTypes";

const initialState = {
  histories: null,
  loading: null,
  error: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HISTORIES_START:
      return {
        ...state,
        histories: []
      };
    case actionTypes.FETCH_HISTORIES_SUCCESS:
      return {
        ...state,
        histories: [...state.histories.concat(action.histories)]
      };
    case actionTypes.FETCH_HISTORIES_FAIL:
      return {
        ...state,
        error: action.error
      };
    case actionTypes.FETCH_ATTENDEES_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_ATTENDEES_SUCCESS:
      const index = state.histories.findIndex(history => history.historyId === action.historyId);
      const newHistories = [...state.histories];
      newHistories[index].attendees = action.attendees;

      return {
        ...state,
        histories: newHistories,
        loading: false
      };
    case actionTypes.FETCH_ATTENDEES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    case actionTypes.UPDATE_HISTORY_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.UPDATE_HISTORY_SUCCESS:
      const oldHistoryIdx = state.histories.findIndex(history => history.historyId === action.historyId);
      const oldHistories = [...state.histories];;

      const newHistory = {
        historyId: state.histories[oldHistoryIdx].historyId,
        attendees: state.histories[oldHistoryIdx].attendees,
        data: {
          subject: action.updatedHistory.subject,
          description: action.updatedHistory.description,
          bookFrom: action.updatedHistory.bookFrom,
          bookTo: action.updatedHistory.bookTo,
          placeId: state.histories[oldHistoryIdx].data.placeId,
          roomId: state.histories[oldHistoryIdx].data.roomId,
          user: state.histories[oldHistoryIdx].data.user
        }
      }
      oldHistories[oldHistoryIdx] = newHistory;

      return {
        ...state,
        loading: false,
        error: null,
        histories: oldHistories
      }
    case actionTypes.UPDATE_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case actionTypes.DELETE_HISTORY_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.DELETE_HISTORY_SUCCESS:
      const filteredHistories = state.histories.filter(history => history.historyId !== action.historyId);
      return {
        ...state,
        loading: false,
        error: null,
        histories: filteredHistories
      }
    case actionTypes.DELETE_HISTORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state;
  }
}

export default reducer;
