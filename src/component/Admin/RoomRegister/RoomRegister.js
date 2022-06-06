import React, { useState, useEffect, useRef, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../UI/Modal/Modal";
import roomImg from "../../../assets/img/1.jpg";
import CustomInput from "../../UI/Input/CustomInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "../../../assets/jss/roomRegisterStyle";
import Button from "../../UI/Button/Button";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { db, storage } from "../../../firebase-queueting";
import Spinner from "../../UI/Spinner/Spinner";
import * as action from "../../../store/actions/index";

const useStyles = makeStyles(styles);

function RoomRegister(props) {
  const { currentPlace, currentRoom } = props;

  const classes = useStyles();
  const fileInput = useRef();
  const dispatch = useDispatch();
  const [placeName, setPlaceName] = useState(currentRoom ? currentRoom.building : "");
  const [roomName, setRoomName] = useState(currentRoom ? currentRoom.name : "");
  const [floor, setFloor] = useState(currentRoom ? currentRoom.floor : 0);
  const [roomNumber, setRoomNumber] = useState(currentRoom ? currentRoom.number : 0);
  const [capacity, setCapacity] = useState(currentRoom ? currentRoom.capacity : 0);
  const [attachment, setAttachment] = useState(currentRoom ? "" : roomImg);
  const [facilities, setFacilities] = useState({
    TV: currentRoom ? currentRoom.TV : false,
    wifi: currentRoom ? currentRoom.wifi : false,
    whiteboard: currentRoom ? currentRoom.whiteboard : false,
    projector: currentRoom ? currentRoom.projector : false
  });
  const isUpdating = !!currentRoom;

  const onUpdateRoom = useCallback(
    (placeId, roomId, room, attachment) => dispatch(action.updateRoom(placeId, roomId, room, attachment)),
    [dispatch]
  );

  const onCreateRoom = useCallback(
    (placeId, room, attachment) => dispatch(action.createRoom(placeId, room, attachment)),
    [dispatch]
  );

  const onDeleteRoom = useCallback(
    (placeId, roomId) => dispatch(action.deleteRoom(placeId, roomId)),
    [dispatch]
  );

  useEffect(() => {
    if (currentRoom) {
      storage.child(`/places/rooms/${currentRoom.id}.jpg`).getDownloadURL()
      .then(url => {
        setAttachment(url);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [currentRoom]);

  const handleChange = (event) => {
    setFacilities({ ...facilities, [event.target.name]: event.target.checked });
  };

  const onFileChange = (event) => {
    const inputFiles = event.target.files;
    const file = inputFiles[0];
    const reader = new FileReader();

    reader.onloadend = (finished) => {
        setAttachment(finished.currentTarget.result);
    }
    reader.readAsDataURL(file);
  }

  const onImageClicked = () => {
    fileInput.current.click();
  };

  const placeNameChangeHandler = (event) => {
    setPlaceName(event.target.value);
  }

  const roomNameChangeHandler = (event) => {
    setRoomName(event.target.value);
  }

  const floorChangeHandler = (event) => {
    setFloor(event.target.value);
  }

  const roomNumberChangeHandler = (event) => {
    setRoomNumber(event.target.value);
  }

  const capacityChangeHandler = (event) => {
    setCapacity(event.target.value);
  }

  const onSave = async () => {
    const roomObj = {
      ...facilities,
      building: placeName,
      name: roomName,
      number: roomNumber,
      floor: floor,
      capacity: capacity
    };

    onCreateRoom(currentPlace.id, roomObj, attachment);
    props.closed(true);
  }

  const onUpdate = async () => {
    const roomObj = {
      ...facilities,
      building: placeName,
      name: roomName,
      number: roomNumber,
      floor: floor,
      capacity: capacity
    };

    onUpdateRoom(currentPlace.id, currentRoom.id, roomObj, attachment);
    props.closed(true);
  }

  const onDelete = async () => {
    onDeleteRoom(currentPlace.id, currentRoom.id);
    props.closed(true);
  }

  let content = <Spinner />;
  if (attachment || !isUpdating) {
    content = (
      <>
        <div className={classes.imgWrap}>
          <input type="file" onChange={onFileChange} accept="image/*" id="file-input" ref={fileInput} style={{opacity: 0, display: "none"}}/>
          <img className={classes.img} src={attachment} alt="Room Img" width="300" height="170" onClick={onImageClicked}/>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Building</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              value={placeName}
              changed={placeNameChangeHandler} />
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Room Name</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              value={roomName}
              changed={roomNameChangeHandler} />
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Floor</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              value={floor}
              changed={floorChangeHandler} />
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Room No.</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              value={roomNumber}
              changed={roomNumberChangeHandler} />
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Max. Capacity</div>
          <div className={classes.input}>
            <CustomInput
              elementType="requiredInput"
              value={capacity}
              changed={capacityChangeHandler} />
          </div>
        </div>
        <div className={classes.wrap}>
          <div className={classes.label}>Facilities</div>
          <FormControl component="fieldset" size="small" className={classes.formControl}>
            <FormGroup className={classes.formGroup}>
              <FormControlLabel
                control={<Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} color="primary" checked={facilities.TV} onChange={handleChange} name="TV" />}
                label="TV"
              />
              <FormControlLabel
                control={<Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} color="primary" checked={facilities.projector} onChange={handleChange} name="projector" />}
                label="projector"
              />
              <FormControlLabel
                control={<Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} color="primary" checked={facilities.wifi} onChange={handleChange} name="wifi" />}
                label="wifi"
              />
              <FormControlLabel
                control={<Checkbox icon={<CheckBoxOutlineBlankIcon fontSize="small" />} checkedIcon={<CheckBoxIcon fontSize="small" />} color="primary" checked={facilities.whiteboard} onChange={handleChange} name="whiteboard" />}
                label="whiteboard"
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className={classes.buttonWrap}>
          <Button
              color="info"
              clicked={isUpdating ? onUpdate : onSave}
              target="_blank"
              className={classes.button}
            >
              SAVE
            </Button>
            <Button
              color="danger"
              clicked={onDelete}
              target="_blank"
              className={classes.button}
            >
              DELETE
          </Button>
        </div>
      </>
    );
  }

  return (
    <Modal
      modalClosed={props.closed}
      show={props.show}
      height="600px">
      {content}
    </Modal>
  )
}

export default RoomRegister;