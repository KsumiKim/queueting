import React from "react";
import Room from "./Room/Room";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  rooms: {
    display: "flex",
    height: "100%",
    overflow: "auto hidden"
  },
  room: {
    marginRight: "10px",
    marginTop: "8px",
    marginBottom: "12px",
  }
});


function Rooms(props) {
  const classes = useStyles();

  return (
    <div className={classes.rooms}>
      {props.rooms.map((room, idx) => {
        return (<Room
          className={classes.room}
          address={props.address}
          placeName={props.placeName}
          placeId={props.placeId}
          key={idx}
          room={room}
          path={idx}/>)
      })}
    </div>
  )
}

export default Rooms;