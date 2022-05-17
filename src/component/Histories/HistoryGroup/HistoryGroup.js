import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../UI/Spinner/Spinner';
import History from '../History/History';

const useStyles = makeStyles({
  date: {
    marginLeft: "10%",
    fontWeight: "700",
    color: "#8d99ae",
    fontSize: "25px"
  }
});

function HistoryGroup(props) {
  const classes = useStyles();
  const { date, historyList, past, places } = props;

  // const dispatch = useDispatch();
  // const onInitPlaces = useCallback(
  //   () => dispatch(actions.fetchPlaces()),
  //   [dispatch]
  // );

  // useEffect(() => {
  //   if (!places)
  //     onInitPlaces();
  // }, [onInitPlaces]);

  function findPlace(placeId, roomId) {
    let targetPlace = null;
    let targetRoom = null;


    places.forEach(place => {
      if (place.placeId === placeId) {
        targetPlace = place;

        targetPlace.rooms.forEach(room => {
          if (room.roomId === roomId) {
            targetRoom = room.data;
          }
        })
      }
    });
    return [targetPlace, targetRoom];
  }
  let historyDetail = <Spinner />

  if (places) {
    historyDetail = historyList.map((history, idx) => {
      const [place, room] = findPlace(history.data.placeId, history.data.roomId);

      return (<History
              key={idx}
              historyId={history.historyId}
              idx={idx}
              place={place.data}
              history={history.data}
              room={room}
              attendees={history.attendees}
              past={past}
              />)
      });
  }


  return (
  <div>
    <div className={classes.date}>{date}</div>
      {historyDetail}
  </div>
  );
}

export default HistoryGroup;