import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import ScheduleOutlinedIcon from "@material-ui/icons/ScheduleOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import Button from "../../UI/Button/Button";
import styles from "../../../assets/jss/toolbarStyle";

const useStyles = makeStyles(styles);

function Toolbar() {
  const classes = useStyles();
  let history = useHistory();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
  }, [token]);

  const viewRedirectHanlder = () => {
    console.log("schedule button clicked");
    history.push("/places");
  }

  const homeRedirectHanlder = () => {
    console.log("home button clicked");
    history.push("/home");
  }

  const userLogInHanlder = () => {
    console.log("login button clicked");
    history.push("/");
  }

  const userLogoutHanlder = () => {
    console.log("logout button clicked");
    history.push("/logout");
  }

  const adminRedirectHanlder = () => {
    console.log("admin button clicked");
    history.push("/admin");
  }

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {token && <Button
          color="transparent"
          clicked={homeRedirectHanlder}
          target="_blank"
          className={classes.navLink}
        >
          <HomeOutlinedIcon className={classes.icons} />
          HOME
        </Button>}
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          clicked={viewRedirectHanlder}
          target="_blank"
          className={classes.navLink}
        >
          <ScheduleOutlinedIcon className={classes.icons} />
          SCHEDULE
        </Button>
      </ListItem>
      {token && <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          clicked={adminRedirectHanlder}
          target="_blank"
          className={classes.navLink}
        >
          <SettingsOutlinedIcon className={classes.icons} />
          ADMIN
        </Button>
      </ListItem>}
      {token ?
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            clicked={userLogoutHanlder}
            target="_blank"
            className={classes.navLink}
          >
            <PersonOutlineOutlinedIcon className={classes.icons} />
            SIGN OUT
          </Button>
        </ListItem>
        :
        <ListItem className={classes.listItem}>
          <Button
            color="transparent"
            clicked={userLogInHanlder}
            target="_blank"
            className={classes.navLink}
          >
            <PersonOutlineOutlinedIcon className={classes.icons} />
            SIGN IN
          </Button>
        </ListItem>}
    </List>
  );
}

export default Toolbar;