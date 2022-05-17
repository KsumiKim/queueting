import React, { useState } from "react";
import PlaceList from "./PlaceList/PlaceList";
import RoomList from "./RoomList/RoomList";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  }
});

function Admin() {
  const classes = useStyles();
  const [currentPlace, setCurrentPlace] = useState("");

  return (
    <Grid container justify="center" className={classes.root} spacing={5}>
      <Grid item xs={4}>
        <PlaceList setCurrentPlace={setCurrentPlace}/>
      </Grid>
      <Grid item xs={7}>
        <RoomList currentPlace={currentPlace} />
      </Grid>
    </Grid>
  )
}

export default Admin;