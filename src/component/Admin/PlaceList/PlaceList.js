import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import CustomTableCell from "../../UI/CustomTableCell/CustomTableCell";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import Button from "../../UI/Button/Button";
import Spinner from "../../UI/Spinner/Spinner";
import * as action from "../../../store/actions/index";

const useStyles = makeStyles({
  root: {
    width: "100%",
    marginTop: "50px"
  },
  grid: {
    width: "100%",
    marginRight: "30px",
    marginTop: "15px"
  },
  container: {
    width: "auto"
  },
  selectTableCell: {
    display: "flex"
  },
  buttonWrap: {
    display: "inlineBlock",
    textAlign: "right",
    marginTop: "5px"
  },
  address: {
    width: "100%",
    height: "40px"
  }
});

const columns = [
  { id: "name", label: "Place" },
  { id: "address", label: "Addess", minWidth: 200 },
  { id: "icons", label: "" },
];

function PlaceList(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [previous, setPrevious] = useState({});
  const [rowEditing, setRowEditing] = useState(false);
  const [newRow, setNewRow] = useState();
  const places = useSelector(state => state.place.places);
  const dispatch = useDispatch();

  const onInitPlaces = useCallback(
    () => dispatch(action.fetchPlaces()),
    [dispatch]
  );

  useEffect(() => {
    if (!places) {
      onInitPlaces();
    }

    let fetchedPlaces = [];
    if (places && places.length > 0) {
      places.forEach(place => {
        fetchedPlaces.push(
          { id: place.placeId,
            name: place.data.name,
            address: place.data.address,
            isEditMode: false
          });
      })
    }
    setRows(fetchedPlaces);
  }, [onInitPlaces, places]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const onChangeConfirm = (id) => {
    if (id) {
      dispatch(action.updatePlace(id, newRow));
    } else {
      dispatch(action.createPlace(newRow));
    }

    onInitPlaces();
  }

  const onToggleEditMode = (id) => {
    setRowEditing(true);
    const updatedRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, isEditMode: !row.isEditMode }
      }
      return row;
    });

    setRows(updatedRows);
  }

  const onCancel = (id) => {
    setRowEditing(false);
    let newRows = null;
    if (id) {
      newRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    } else {
      newRows = rows.filter(row => row.id);
    }
    setRows([...newRows]);
  }

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const id = row.id;

    const newRows = rows.map(data => {
      if (data.id === id) {
        return { ...data, [name]: value };
      }
      return data;
    });

    setRows(newRows);
    const newRowIdx = newRows.findIndex(place => place.id === id);
    setNewRow(newRows[newRowIdx]);
  };

  const onDelete = (id) => {
    if (rowEditing) {
      return;
    }
    dispatch(action.deletePlace(id));
    onInitPlaces();
  }

  const onAddRow = () => {
    if (rowEditing) {
      return;
    }

    setRowEditing(true);
    const row = { name: "", address: "", isEditMode: true };
    setNewRow(row);
    const newRows = [...rows, row];
    setRows(newRows);
  }

  const onPlaceSelected = (e, row) => {
    if (typeof row !== "object") {
      return;
    }
    props.setCurrentPlace(row);
  }

  let placeList = <Spinner />;

  if (places && rows) {
    placeList = (
    <div className={classes.root}>
      <div className={classes.buttonWrap}>
          <Button
            color="info" size="sm" target="_blank"
            clicked={onAddRow}>
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
                    style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => (
                <TableRow key={idx} onClick={(e) => onPlaceSelected(e, row)}>
                  <CustomTableCell {...{ row, name: "name", onChange }} />
                  <CustomTableCell {...{ row, name: "address", onChange }} />
                  <TableCell
                    className={classes.selectTableCell}
                    align="right">
                    {row.isEditMode ? (
                      <>
                        <IconButton
                          aria-label="cancel"
                          onClick={() => onCancel(row.id)}
                        >
                          <ClearOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="save"
                          onClick={() => onChangeConfirm(row.id)}
                        >
                          <CheckCircleOutlineOutlinedIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton
                          aria-label="edit"
                          onClick={() => onToggleEditMode(row.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => onDelete(row.id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
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
    </div>
    );
  }

  return placeList;
}

export default PlaceList;