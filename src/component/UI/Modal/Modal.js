import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "../Backdrop/Backdrop";

const useStyles = makeStyles({
  root: {
    border: "1px solid rgb(221, 221, 221)",
    borderRadius: "12px",
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 6px 16px",
    padding: "24px",
    boxSizing: "border-box",
    margin: "20px auto",
    shadow: "#0082ff",
    position: "fixed",
    zIndex: "500",
    backgroundColor: "white",
    width: "700px",
    height: "450px",
    transition: "all 0.3s ease-out",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    paddingLeft: "70px",
    paddingRight: "70px"
  }
});

const Modal = (props) => {
  const classes = useStyles();

  return (
    <>
      <Backdrop clicked={props.modalClosed} show={props.show}/>
      <div className={classes.root} style={{
                  opacity: props.show ? "1" : "0",
                  height: props.height ? props.height : "450px"
               }}>
        {props.children}
      </div>
    </>
  )
}


export default Modal;