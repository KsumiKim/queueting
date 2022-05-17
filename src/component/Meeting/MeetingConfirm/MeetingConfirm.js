import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Spinner from '../../UI/Spinner/Spinner';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../../store/actions/index';
import styles from '../../../assets/jss/meetingConfirmStyle';

const useStyles = makeStyles(styles);

function MeetingConfirm(props) {
  const classes = useStyles();
  const meeting = useSelector((state) => state.meeting);
  const user = useSelector((state) => state.user);
  const description = useSelector((state) => state.meeting.description);
  const subject = useSelector((state) => state.meeting.subject);
  const attendees = useSelector((state) => state.meeting.attendees);
  const loading = useSelector((state) => state.meeting.loading);
  const fromTime = useSelector((state) => state.meeting.fromTime);
  const toTime = useSelector((state) => state.meeting.toTime);
  const meetingDate = useSelector((state) => state.meeting.meetingDate);

  const dispatch = useDispatch();
  let history = useHistory();

  const getStartAndEndDate = () => {
    const startHour = fromTime.substring(0, 2);
    const startMinute = fromTime.substring(3, 5);
    const endHour = toTime.substring(0, 2);
    const endMinute = toTime.substring(3, 5);

    const startDate = new Date(meetingDate);
    startDate.setHours(startHour);
    startDate.setMinutes(startMinute);
    startDate.setSeconds(0);

    const endDate = new Date(meetingDate);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinute);
    endDate.setSeconds(0);

    return [startDate, endDate];
  }

  const meetingConfirmHanlder = () => {
    const [bookFrom, bookTo] = getStartAndEndDate();

    dispatch(actions.scheduleMeeting({
      subject: subject,
      description: description,
      bookFrom: bookFrom,
      bookTo: bookTo,
      user: {
        userId : user.userId,
        name: user.name
      },
      roomId: meeting.roomId,
      placeId: meeting.placeId,
      checkOut: null,
      checkIn: null
    }, meeting.attendees));

    props.closed();
    history.push('/home');
  }

  const formatDate = () => {
    let formattedDate = [];
    const year = meetingDate.getFullYear();
    let month = meetingDate.getMonth() + 1;
    let day = meetingDate.getDate();

    if (month < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    formattedDate.push(year, month, day);
    const date = formattedDate.join('-');
    const startTime = fromTime.substring(0, 5);
    const endTime = toTime.substring(0, 5);

    return [date, startTime, endTime];
  }
  const dateAndTime = formatDate();

  const displayAttendees = (attendees) => {
    const attendeeList = attendees.map(attendee => {
      return attendee.name;
    } );
    return attendeeList.join(', ');
  }
  let summary = (
  <div>
    <div className={classes.content}>
      <div className={classes.headerWrap}>
        <div className={classes.header}>CONFIRMATION</div>
      </div>
      <div className={classes.rootWrap}>
        <div className={classes.information}>ORGANIZER</div>
        <div className={classes.information}>SCHEDULED AT</div>
      </div>
      <div className={classes.rootWrap}>
        <div className={classes.data}>{user.name}</div>
        <div className={classes.dateWrap}>
          <div className={classes.data}>{dateAndTime[0]}</div>
          &nbsp;
          <div className={classes.data}>{dateAndTime[1]} ~ {dateAndTime[2]}</div>
        </div>
      </div>
      <div className={classes.locationWarp}>
        <div className={classes.location}>LOCATION</div>
        <div>
          <div className={classes.data}>
            {props.placeName}({props.roomName})
          </div>
          <div className={classes.address} >
            {props.address}
          </div>
        </div>
      </div>
      <div className={classes.miscWrap}>
        <div className={classes.misc}>OTHER INFORMATION</div>
        <div className={classes.miscInformation}>LIST OF ATTENDEES</div>
        <div className={classes.data}>{displayAttendees(attendees)}</div>
        <div className={classes.miscInformation}>AGENDA</div>
        <div className={classes.data}>
          {subject}
        </div>
        <div className={classes.desc}>
          {description}
        </div>
      </div>
    </div>
    <div className={classes.buttonWrap}>
    <Button
      className={classes.button}
      variant="contained"
      color="secondary"
      onClick={props.cancelling}>
      Cancel
    </Button>
    <Button
      className={classes.button}
      variant="contained"
      color="primary"
      onClick={meetingConfirmHanlder}>
      Schedule
    </Button>
    </div>
  </div>);

  if (loading) {
    summary = <Spinner />;
  }

  return summary
}

export default MeetingConfirm;