import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MeetingConfirm from "./MeetingConfirm/MeetingConfirm";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../store/actions/index";
import CustomInput from "../UI/Input/CustomInput";
import "react-datetime/css/react-datetime.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import styles from "../../assets/jss/meetingStyle";
import Button from "../UI/Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import { meetingTimes, isEmpty, validMeetingTimeSelected } from "../Utils/utility";
import {db} from "../../firebase-queueting";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(styles);

function Meeting(props) {
  const { prevDescription, prevSubject, prevBookFrom, prevBookTo, prevAttendees, create } = props;

  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [continuing, setContinuing] = useState(false);
  const [subject, setSubject] = useState(prevSubject);
  const [description, setDescription] = useState(prevDescription);
  const [attendees, setAttendees] = useState([]);
  const loading = useSelector((state) => state.history.loading);
  const error = useSelector((state) => state.history.error);
  const user = useSelector((state) => state.user);
  const [timeList, setTimeList] = useState([]);
  const [users, setUsers] = useState();
  const [showUserList, setShowUserList] = useState(false);

  const dispatch = useDispatch();
  let history = useHistory();

  const fetchUsers = async () => {
    const userRef = await db.collection("users").get();
    let users = [];

    userRef.forEach(userDoc => {
      const data = userDoc.data();
      const id = userDoc.id;
      if (id !== user.userId) {
        users.push({
          name: data.name,
          userId: id
        });
      }
    })
    setUsers(users);
  }

  useEffect(() => {
    fetchUsers();

    if (!create) {
      setSelectedDate(prevBookFrom.toDate());
      setAttendees(prevAttendees);
      setFromTime(setTime(prevBookFrom));
      setToTime(setTime(prevBookTo));
    }

  }, [prevDescription, prevSubject, prevBookFrom, prevBookTo, prevAttendees, create])

  useEffect(() => {
    setTimeList(meetingTimes);

    const now = new Date();
    if (selectedDate.getFullYear() === now.getFullYear() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getDate() === now.getDate()) {
      const currentHour = now.getHours();
      const list = meetingTimes.filter(time => Number(time.substring(0, 2)) > currentHour);
      setTimeList(list);
    }
  }, [selectedDate])

  const getStartAndEndDate = () => {
    const startHour = fromTime.substring(0, 2);
    const startMinute = fromTime.substring(3, 5);
    const endHour = toTime.substring(0, 2);
    const endMinute = toTime.substring(3, 5);

    const startDate = new Date(selectedDate);
    startDate.setHours(startHour);
    startDate.setMinutes(startMinute);
    startDate.setSeconds(0);

    const endDate = new Date(selectedDate);
    endDate.setHours(endHour);
    endDate.setMinutes(endMinute);
    endDate.setSeconds(0);

    return [startDate, endDate];
  }

  const setTime = (time) => {
    if (!time) {
      return "";
    }
    const hour = time.toDate().getHours();
    let result = hour;

    if (result < 10) {
      result = "0" + result;
    }

    if (hour < 13) {
      result += ":00 A.M.";
    } else {
      result += ":00 P.M.";
    }

    return result;
  }

  const dateChangeHandler = (date) => {
    setSelectedDate(date);
  };

  const subjectChangeHandler = (event) => {
    setSubject(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };

  const fromTimeChangeHandler = (event) => {
    setFromTime(event.target.value);
  };

  const toTimeChangeHandler = (event) => {
    setToTime(event.target.value);
  };

  const handleAttendeeDelete = (selectedAttendee) => {
    let oldAttendees = [...attendees];
    const newAttendees = oldAttendees.filter(attendee => attendee.userId !== selectedAttendee.userId);
    setAttendees(newAttendees);
  }

  const checkValidity = () => {
    if (!isEmpty(subject)) {
      alert("미팅 주제를 선택하세요.")
      return;
    }

    if (!isEmpty(fromTime) && !isEmpty(toTime)) {
      alert("미팅 시간을 선택하세요")
      return;
    }

    if (!validMeetingTimeSelected(fromTime, toTime)) {
      alert("미팅 완료 시간은 시작 시간 이후로 설정되어야 합니다.")
      return;
    }
  }

  const continueHandler = () => {
    checkValidity();

    if (create) {
      createMeeting();
      return;
    } else {
      updateMeeting();
    }
  }

  const updateMeeting = () => {
    const [bookFrom, bookTo] = getStartAndEndDate();
    dispatch(actions.updateHistory(props.historyId, {
      description: description,
      subject: subject,
      bookFrom: bookFrom,
      bookTo: bookTo,
      user: {
        userId : user.userId,
        name: user.name
      },
    }))
    props.closed();
    history.push("/home");
  }

  const createMeeting = () => {
    dispatch(actions.addDetailInfo({
      subject: subject,
      description: description,
      attendees: attendees,
      meetingDate: selectedDate,
      fromTime: fromTime,
      toTime:  toTime
    }));
    setContinuing(true);
  }

  const cancelHandler = () => {
    setContinuing(false);
  }

  const userSelected = (user) => {
    let newAttendees = [...attendees];
    newAttendees.push(user);
    setAttendees(newAttendees);
    setShowUserList(false);
  }

  const addNewAttendee = () => {
    setShowUserList(showUserList => !showUserList);
  }

  let meetingInfo = (
    <div>
      <div className={classes.headerWrap}>
        <div className={classes.header}>{create ? "ADD" : "UPDATE"} MEETING</div>
      </div>
      <div className={classes.container}>
        <div className={classes.wrap}>
          <div className={classes.title}>AGENDA</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              label="Please enter the meeting agenda"
              value={subject}
              changed={subjectChangeHandler}/>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.title}>DATE</div>
          <div className={classes.date}>
            <CustomInput
              elementType="datePicker"
              value={selectedDate}
              changed={dateChangeHandler}/>
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.title}>TIME</div>
          <div className={classes.time}>
            <CustomInput
              elementType="timeSelector"
              type="From"
              time={fromTime}
              changed={fromTimeChangeHandler}
              timeList={timeList}
            />
            <CustomInput
              elementType="timeSelector"
              type="To"
              time={toTime}
              changed={toTimeChangeHandler}
              timeList={timeList}
            />
        </div>
        </div>
        {<div className={classes.wrap}>
          <div className={classes.title}>ATTENDEES</div>
          <div className={classes.attendees}>
            <div className={classes.chipWrap}>
              {attendees.map(attendee => {
                return (
                    <Chip
                      className={classes.chip}
                      key={attendee.userId}
                      label={attendee.name}
                      onDelete={() => handleAttendeeDelete(attendee)}
                      />)
              } )}
            </div>
            <Button className={classes.plus} clicked={addNewAttendee}>+</Button>
            </div>
            {showUserList &&
            <div className={classes.users}>
              <List>
              {users.map(user => {
                return (
                  <ListItem
                    button
                    key={user.userId}
                    onClick={() => userSelected(user)}>
                      {user.name}
                  </ListItem>)
              } )}
            </List>
            </div>}
        </div>}
        <div className={classes.wrap}>
          <div className={classes.title}>DESCRIPTION</div>
          <div className={classes.input}>
            <CustomInput
              elementType="generalInput"
              label="Please enter the meeting details"
              value={description}
              changed={descriptionChangeHandler}/>
          </div>
        </div>
      </div>
      <div className={classes.buttonWrap}>
        <Button
            color="danger"
            clicked={props.closed}
            target="_blank"
            className={classes.button}
          >
          Cancel
        </Button>
        <Button
          color="info"
          clicked={continueHandler}
          target="_blank"
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </div>
    );

    if (loading) {
      meetingInfo = <Spinner />
    }

    if (error) {
      meetingInfo = <p>{error.message}</p>
    }

    if (continuing) {
      meetingInfo = (<MeetingConfirm
          cancelling={cancelHandler}
          roomName={props.roomName}
          placeName={props.placeName}
          roomLocation={props.roomLocation}
          address={props.address}
          closed={props.closed}/>);
    }
  return meetingInfo;
}

export default Meeting;
