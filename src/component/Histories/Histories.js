import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Button from "../UI/Button/Button";
import HistoryGroup from "./HistoryGroup/HistoryGroup";
import { isTimestamp } from "../Utils/utility";

const useStyles = makeStyles({
  content: {
    textAlign: "center"
  },
  section: {
    background: "#EEEEEE",
    padding: "70px 0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }
});

function Histories(props) {
  const classes = useStyles();
  const { histories, past, places } = props;
  let history = useHistory();

  function groupHistoriesByDate() {
    let meetingDict = {};
    histories.forEach(historyData => {
      let bookDate = historyData.data.bookFrom;
      if (isTimestamp(bookDate))
        bookDate = bookDate.toDate();

      const year = bookDate.getFullYear();
      const month = bookDate.getMonth() + 1;
      const day = bookDate.getDate();
      const date = [year, month, day].join(".");

      if (!meetingDict[date]) {
        meetingDict[date] = [];
      }
      meetingDict[date].push(historyData);
    });
    return meetingDict;
  }

  const historyList = groupHistoriesByDate();
  let historiesPerDate = Object.keys(historyList).map(date => {
    const list = historyList[date];
    return (
      <HistoryGroup
        key={date}
        date={date}
        historyList={list}
        places={places}
        past={past}
      />
    )
  })

  const createHandler = () => {
    history.push("/places");
  }

  return (
    <Container maxWidth="md" className={classes.section}>
      {historiesPerDate}
      {!past && <div className={classes.content} >
        <Button
          color="info"
          clicked={createHandler}
          target="_blank">
          Create a New Meeting
        </Button>
      </div>}
    </Container>
  )
}

export default Histories;