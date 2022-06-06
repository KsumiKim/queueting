import React from "react";
import Rooms from "./Rooms/Rooms";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    paddingRight: "40px",
    paddingLeft: "40px",
    display: "block",
    marginBottom: "24px",
    padding: "16px"
  },
  place: {
    display: "flex"
  },
  placeName: {
    fontSize: "28px",
    fontWeight: "700"
  },
  placeAddress: {
    fontSize: "20px",
    fontWeight: "400",
    paddingLeft: "20px"
  },
  rooms: {
    display: "flex"
  }
});

function Place (props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.place}>
        <div className={classes.placeName}>{props.placeName}</div>
        <div className={classes.placeAddress}><span>{props.placeAddress}</span></div>
      </div>
      <Rooms className={classes.rooms}
        rooms={props.rooms}
        placeName={props.placeName}
        address={props.placeAddress}
        placeId={props.placeId}/>
    </div>
  )
}

export default Place;