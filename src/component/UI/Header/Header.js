import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/icons/Menu";
import styles from "../../../assets/jss/headerStyle";

const useStyles = makeStyles(styles);

function Header(props) {
  const classes = useStyles();
  let history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", headerColorChange);

    return function cleanup() {
      window.removeEventListener("scroll", headerColorChange);
    };
  });

  const homeRedirectHanlder = () => {
    history.push("/");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const headerColorChange = () => {
    const changeColorOnScroll = {
      height: 200,
      color: "dark"
    };

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove("blue");
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add("blue");
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };

  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes["blue"]]: true,
    [classes.fixed]: true
  });
  const brandComponent = <Button onClick={homeRedirectHanlder} className={classes.title}>QUEUETING</Button>;
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        {brandComponent}
        <Hidden smDown implementation="css">
          {props.links}
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {props.links}
          </div>
        </Drawer>
      </Hidden>
    </AppBar>
  );
}

export default Header;