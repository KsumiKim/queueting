import React, { useState } from "react";
import Modal from "../../../UI/Modal/Modal";
import Button from "../../../UI/Button/Button";
import { makeStyles } from "@material-ui/core/styles";
import * as actions from "../../../../store/actions/index";
import { useSelector, useDispatch } from "react-redux";
import styles from "../../../../assets/jss/historyDetailStyle";
import Meeting from "../../../Meeting/Meeting";
import Spinner from "../../../UI/Spinner/Spinner";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

const HistoryDetail = (props) => {
  const classes = useStyles();
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const fromDate = props.history.bookFrom.toDate();
  const toDate = props.history.bookTo.toDate();
  const userId = useSelector((state) => state.user.userId);
  const loading = useSelector((state) => state.history.loading);
  const error = useSelector((state) => state.history.error);
  const updatable = fromDate - new Date() > 1;
  let history = useHistory();

  const formatDate = (startDate, endDate) => {
    let formattedDate = [];
    const year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();

    formattedDate.push(year, month, day);
    const date = formattedDate.join("-");
    const fromTime = formatTime(startDate);
    const toTime = formatTime(endDate);

    return [date, fromTime, toTime];
  }

  const formatTime = (date) => {
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (minute === 0)
      minute = "00";

    return hour + ":" + minute;
  }

  const dateAndTime = formatDate(fromDate, toDate);

  const editHistoryHandler = () => {
    setUpdating(true);
  }

  const deleteHistoryHandler = () => {
    dispatch(actions.deleteHistory(props.historyId));
    history.push("/home");
    props.closed();
  }

  let attendeesList = null;
  if (props.attendees) {
    attendeesList = (
    <div className={classes.data}>
      {props.attendees.map(attendee => {
        return attendee.name;
      }).join(", ")}
    </div>);
  }

  let detailSummary = (
    <div className={classes.content}>
      <div className={classes.titleWrap}>
        <div className={classes.title}>SUMMARY</div>
      </div>
      <div className={classes.rootWrap}>
        <div className={classes.information}>ORGANIZER</div>
        <div className={classes.information}>SCHEDULED AT</div>
      </div>
      <div className={classes.rootWrap}>
        <div className={classes.data}>{props.history.user.name}</div>
        <div className={classes.dateWrap}>
          <div className={classes.data}>{`${dateAndTime[0]} `} </div>
          &nbsp;
          <div className={classes.data}>{`${dateAndTime[1]}`} ~ {dateAndTime[2]}</div>
        </div>
      </div>
      <div className={classes.locationWarp}>
        <div className={classes.location}>LOCATION</div>
        <div>
          <div className={classes.data}>
            {props.place.name}
          </div>
          <div className={classes.address} >
            {props.place.address}
          </div>
        </div>
      </div>
      <div className={classes.miscWrap}>
        <div className={classes.misc}>OTHER INFORMATION</div>
        <div className={classes.miscInformation}>LIST OF ATTENDEES</div>
        <div className={classes.data}>{attendeesList}</div>
        <div className={classes.miscInformation}>AGENDA</div>
        <div className={classes.data}>
          {props.history.subject}
        </div>
        <div className={classes.desc}>
          {props.history.description}
        </div>
      </div>
      {updatable && props.history.user.userId === userId && <div className={classes.buttonWrap}>
        <Button
          color="info"
          clicked={editHistoryHandler}
          target="_blank"
          className={classes.button}>
          Edit
        </Button>
        <Button
          color="danger"
          clicked={deleteHistoryHandler}
          target="_blank"
          className={classes.button}>
          Delete
        </Button>
      </div>}
    </div>
  )

  if (loading) {
    detailSummary = <Spinner />
  }

  if (error) {
    detailSummary = <p>{error.message}</p>
  }

  if (updating) {
    detailSummary = (
      <Meeting
        closed={props.closed}
        prevSubject={props.history.subject}
        prevDescription={props.history.description}
        prevBookFrom={props.history.bookFrom}
        prevBookTo={props.history.bookTo}
        historyId={props.historyId}
        prevAttendees={props.attendees}
      />
    );
  }

  return (
    <Modal modalClosed={props.closed} show={props.show}>
      {detailSummary}
    </Modal>
  );
}

export default HistoryDetail;