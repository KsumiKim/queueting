import React, {useState, useEffect, useCallback} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import RoomDetail from "./RoomDetail/RoomDetail";
import {storage} from "../../../../../firebase-queueting";
import Spinner from "../../../../UI/Spinner/Spinner";
import Modal from "../../../../UI/Modal/Modal";
import {useSelector, useDispatch} from "react-redux";
import * as action from "../../../../../store/actions/index";
import Meeting from "../../../../Meeting/Meeting";

const useStyles = makeStyles({
  room: {
    float: "left",
    padding: "5px",
    width: "33.3%"
  },
  roomImg: {
    height: "300px",
    width: "100%",
    borderRadius: "16px"
  },
  content: {
    fontWeight: "700",
    fontSize: "18px"
  }
});

function Room(props) {
  const classes = useStyles();
  const [imageShow, setImageShow] = useState(false);
  const [detailShown, setDetailShown] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [image, setImage] = useState(null);
  const userId = useSelector((state) => state.user.userId);

  const dispatch = useDispatch();

  const getImage = useCallback(() => {
    storage.child(`/places/rooms/${props.room.roomId}.jpg`).getDownloadURL()
      .then(url => {
        setImage(url);
        setImageShow(true);
      })
      .catch(error => {
        console.error(error);
      })
  }, [props.room.roomId])

  useEffect(() => {
    getImage();
    return () => {
      setImage(null);
    }
  }, [getImage]);

  let roomImage = <Spinner/ >

    if (imageShow) {
      roomImage = (
      <CardMedia
      className = {classes.roomImg}
      image = {image}>
        </CardMedia>)}

      function formatLocation(data) {
        let info = [];
        info.push(data.building);
        info.push(data.floor);

        const number = data.number;
        if (number < 10) {
          info.push(0);
          info.push(number);
        } else {
          info.push(number);
        }
        return info.join("");
      }

      const showRoomDetailHanlder = () => {
        setDetailShown(true);
      }

      const detailClose = () => {
        setDetailShown(false);
      }

      const createContinueHandler = () => {
        setScheduling(true);
        detailClose();

        dispatch(action.addRoomInfo({
          roomId: props.room.roomId,
          placeId: props.placeId,
          userId: userId
        }));
      }

      const createCancelHandler = () => {
        setScheduling(false);
      }

      let roomDetail = null;
      let meeting = null;

      if (detailShown) {
        roomDetail = (
          <Modal
            show = {detailShown}
            modalClosed = {detailClose}>
            <RoomDetail
              continued = {createContinueHandler}
              closed = {detailClose}
              roomName = {props.room.data.name}
              roomCapacity = {props.room.data.capacity}
              roomLocation = {formatLocation(props.room.data)}
              roomInfo = {props.room.data}
            />
          </Modal>);
        }

        if (scheduling) {
          meeting = (
            <Modal
              show = {scheduling}
              modalClosed = {createCancelHandler} >
            <Meeting
              create
              closed = {createCancelHandler}
              roomCapacity = {props.room.data.capacity}
              roomName = {props.room.data.name}
              placeName = {props.placeName}
              address = {props.address}
              roomLocation = {formatLocation(props.room.data)}/>
            </Modal>);
          }

          return (
            <>
              {roomDetail}
              {meeting}
              <Card className = {classes.room} >
              <CardActionArea
                onClick = {showRoomDetailHanlder}>
                {roomImage}
              <CardContent
                className = {classes.content}>
                {props.room.data.name}
              </CardContent>
              </CardActionArea>
              </Card>
            </>
          )
        }
export default Room;