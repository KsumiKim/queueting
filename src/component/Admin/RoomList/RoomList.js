import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import CustomTableCell from "../../UI/CustomTableCell/CustomTableCell";
import Button from "../../UI/Button/Button";
import RoomRegister from "../RoomRegister/RoomRegister";
import { db } from "../../../firebase-queueting";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "50px"
  },
  grid: {
    width: "100%",
    marginLeft: "30px",
    marginRight: "30px",
    marginTop: "15px"
  },
  container: {
    width: "auto"
  },
  selectTableCell: {
    display: "flex",
    height: "auto"
  },
  buttonWrap: {
    display: "inlineBlock",
    textAlign: "right",
    marginTop: "5px"
  },
  row: {
    cursor: "default",
    "&:hover": {
      cursor: "pointer",
    }
  },
});

const columns = [
  { id: "name", label: "Room Name" },
  { id: "buliding", label: "Building"},
  { id: "floor", label: "Floor" },
  { id: "number", label: "Room No." },
  { id: "capacity", label: "Max. Capacity" },
  { id: "facilities", label: "Facilities", minWidth: 200 },
];

const facilitiesObj = {
  TV: "TV",
  projector: "projector",
  whiteboard: "whiteboard",
  wifi: "wifi"
};

function RoomList(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [isUpdating, setIsUpdating] = useState();
  const [updated, setUpdated] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const currentPlace = props.currentPlace;

  useEffect(() => {
    const fetchRooms = async () => {
      if (!currentPlace || !currentPlace.id) {
        return;
      }
      const roomRef = await db.collection("places").doc(currentPlace.id).collection("rooms").get();
      let rooms = [];
      roomRef.forEach(roomDoc => {
        const room = roomDoc.data();
        const roomId = roomDoc.id;
        rooms.push(
          { id: roomId,
            name: room.name,
            building: room.building,
            floor: room.floor,
            number: room.number,
            capacity: room.capacity,
            dpFacilities: getFacilities(room),
            TV: room.TV,
            projector: room.projector,
            wifi: room.wifi,
            whiteboard: room.whiteboard
          });
      });
      setRows(rooms);
    }
    if (currentPlace) {
      fetchRooms();
    }
  }, [currentPlace, updated]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const modalOpenHandler = (e, room) => {
    if (!props.currentPlace) {
      alert("장소를 먼저 선택하세요");
      return;
    }
    if (room) {
      setSelectedRoom(room);
    }
    setIsUpdating(!isUpdating);
  }

  const modalCloseHandler = (updated) => {
    setUpdated(updated);
    setSelectedRoom(null);
    setIsUpdating(!isUpdating);
  }

  const getFacilities = (room) => {
    let facilities = [];

    if (room.TV) {
      facilities.push(facilitiesObj.TV);
    }

    if (room.projector) {
      facilities.push(facilitiesObj.projector);
    }

    if (room.whiteboard) {
      facilities.push(facilitiesObj.whiteboard);
    }

    if (room.wifi) {
      facilities.push(facilitiesObj.wifi);
    }
    return facilities.join(", ");
  }

  return (
    <div className={classes.root}>
      {isUpdating && <RoomRegister
        currentPlace={props.currentPlace}
        show={setIsUpdating}
        currentRoom={selectedRoom}
        closed={modalCloseHandler} />}
      {currentPlace && currentPlace.id &&
      <>
        <div className={classes.buttonWrap}>
          <Button
            color="info" size="sm" target="_blank"
            clicked={modalOpenHandler}>
            Add
          </Button>
        </div>
        <Paper className={classes.grid}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow className={classes.row} key={row.id} onClick={(e) => modalOpenHandler(e, row)}>
                    <CustomTableCell {...{ row, name: "name" }} />
                    <CustomTableCell {...{ row, name: "building" }} />
                    <CustomTableCell {...{ row, name: "floor" }} />
                    <CustomTableCell {...{ row, name: "number" }} />
                    <CustomTableCell {...{ row, name: "capacity" }} />
                    <CustomTableCell {...{ row, name: "dpFacilities" }} />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            labelRowsPerPage=""
            rowsPerPageOptions={[]}
            count={rows.length}
            rowsPerPage={10}
            page={page}
            onChangePage={handleChangePage}
          />
        </Paper>
      </>}
    </div>
  );
}

export default RoomList;