import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Place from "./Place/Place";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../UI/Spinner/Spinner";
import * as action from "../../store/actions/index";

const useStyles = makeStyles({
  root: {
    display: "block",
    boxSizing: "border-box",
    fontSize: "17px"
  }
});

function Places () {
  const classes = useStyles();
  const places = useSelector(state => state.place.places);
  const dispatch = useDispatch();

  const onInitPlaces = useCallback(
    () => dispatch(action.fetchPlaces()),
    [dispatch]
  );

  useEffect(() => {
    if (!places)
      onInitPlaces();
  }, [onInitPlaces, places]);

  let placeInfo = <Spinner />

  if (places) {
    placeInfo = places.map(place => {
      return <Place
          key={place.placeId}
          placeId={place.placeId}
          placeName={place.data.name}
          placeAddress={place.data.address}
          rooms={place.rooms}/>;
    })
  }

  return (
    <div classes={classes.root}>
      {placeInfo}
    </div>
  )
}

export default Places;