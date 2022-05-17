import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import WifiIcon from '@material-ui/icons/Wifi';
import TvIcon from '@material-ui/icons/Tv';
import Button from '@material-ui/core/Button';
import styles from "../../../../../../assets/jss/roomDetailStyle";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(styles);

function RoomDetail (props) {
  const classes = useStyles();
  const token = useSelector((state) => state.user.token);
  let history = useHistory();

  const loginRegirectHandler = () => {
    history.push("/");
  }

  let detailInfo = (
    <div>
      <div className={classes.roomNameWrap}>
        <div className={classes.roomName}>{props.roomName}</div>
      </div>
      <div className={classes.roomInfoWrap}>
        <div className={classes.roomInfo}>Max Capacity {props.roomCapacity} · {props.roomLocation}</div>
      </div>
      <div className={classes.rootWrap}>
        <div className={classes.information}>EQUIPMENTS</div>
        <List className={classes.equipments}>
          {props.roomInfo.projector && <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ScreenShareIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Projector" />
          </ListItem>}
          {props.roomInfo.TV && <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TvIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="TV" />
          </ListItem>}
          {props.roomInfo.whiteboard && <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BorderColorIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Whiteboard" />
          </ListItem>}
          {props.roomInfo.wifi && <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WifiIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="WIFI" />
          </ListItem>}
        </List>
      </div>
      <div className={classes.buttonWrap} >
        <Button
          variant="contained"
          color="primary"
          onClick={token ? props.continued : loginRegirectHandler}>
            SCHEDULE
        </Button>
      </div>
    </div>);

  return (
    <div>
      {detailInfo}
    </div>
  )
}

export default RoomDetail;