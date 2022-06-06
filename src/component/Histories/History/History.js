import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import HistoryDetail from "./HistoryDetail/HistoryDetail";
import * as action from "../../../store/actions/index";
import { useDispatch } from "react-redux";
import styles from "../../../assets/jss/historyStyle";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles(styles);

const History = props => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();
  const onfetchAttendees = useCallback(
    (historyId) => dispatch(action.fetchAttendees(historyId)),
    [dispatch]
  );

  function formatLocation(data) {
    let info = [];
    info.push(data.building);
    info.push(data.floor);

    const number = data.number;
    if (number < 10) {
      info.push(0);
      info.push(number);
    } else {
      info.push(number);
    }
    return info.join("");
  }

  const modalOpenHandler = (historyId) => {
    onfetchAttendees(historyId);
    setShow(true);
  }

  const modalCloseHandler = () => {
    setShow(false);
  }
  return (
    <>
      {show && <HistoryDetail
        show={show}
        room={props.room}
        place={props.place}
        history={props.history}
        historyId={props.historyId}
        closed={modalCloseHandler}
        attendees={props.attendees}
        past={props.past}
      />}
      <Card className={classes.card} variant="outlined">
        <CardActionArea onClick={() => modalOpenHandler(props.historyId)}>
          <CardContent className={classes.cardBody}>
            <div className={classes.titleWrap}>
              <Typography className={classes.title}>Meeting #{props.idx + 1}</Typography>
              {props.history.user.userId === userId && <StarBorderIcon />}
            </div>
            <Typography variant="h5" component="h2">{props.history.subject}</Typography>
            <Typography className={classes.pos}>: {props.history.description}</Typography>
            <Typography variant="body2" component="p">{props.place.name} - {formatLocation(props.room)}  ({props.room.name})</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default History;