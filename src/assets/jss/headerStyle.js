import {
  container,
  infoColor,
  transition,
  boxShadow,
  drawerWidth
} from "./mainComponent";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
    minHeight: "50px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap"
  },
  flex: {
    flex: 1
  },
  title: {
    fontFamily: 'Montserrat Alternates, sans-serif',
    lineHeight: "30px",
    fontSize: "25px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "8px 16px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    }
  },
  appResponsive: {
    margin: "20px 10px"
  },
  blue: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  }
};

export default headerStyle;
