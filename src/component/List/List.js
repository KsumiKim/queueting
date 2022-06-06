import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Histories from "../Histories/Histories";
import * as actions from "../../store/actions/index";
import { isTimestamp } from "../Utils/utility";
import { useHistory } from "react-router-dom";
import Spinner from "../UI/Spinner/Spinner";

function List() {
  const histories = useSelector((state) => state.history.histories);
  const loggedIn = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);
  const places = useSelector(state => state.place.places);
  const dispatch = useDispatch();
  let history = useHistory();

  const onInitHistories = useCallback(
    () => dispatch(actions.fetchHistories(null, userId)),
    [dispatch, userId]
  );

  const onInitPlaces = useCallback(
    () => dispatch(actions.fetchPlaces()),
    [dispatch]
  );

  useEffect(() => {
    onInitPlaces();
    onInitHistories();
  }, [onInitHistories, onInitPlaces]);

  useEffect(() => {
    if (!loggedIn)
      history.push("/");
  }, [history, loggedIn]);

  let meetings = [];
  let historiesInfo = <Spinner />

  if (histories && places && places.length > 0) {
    histories.forEach(historyEl => {
      let bookTime = historyEl.data.bookFrom;
      if (isTimestamp(bookTime)) {
        bookTime = historyEl.data.bookFrom.toDate();
      }
      meetings.push(historyEl);
    })
    historiesInfo = (<Histories histories={meetings} places={places} />);
  }

  return (
    <div>
      {historiesInfo}
    </div>
  )
}

export default List;