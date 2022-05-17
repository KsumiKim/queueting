import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },
});

const Spinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={200}/>
    </div>
  )
}

export default Spinner;