import React from "react";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import styles from "../../../assets/jss/customInputStyle";
import { ThemeProvider } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core/styles";

const muiTheme = unstable_createMuiStrictModeTheme();

const useStyles = makeStyles(styles);

function CustomInput(props) {
  const {
    elementType,
    value,
    labelText,
    type,
    id,
    time,
    inputProps,
    changed,
    keyPressed
  } = props;

  const classes = useStyles();
  let inputElement = null;
  // const formControlClasses = classNames(
  //   formControlProps.className,
  //   classes.formControl
  // );

  switch(elementType) {
    case ("inputText") :
      inputElement = (
        <FormControl className={classes.formControl}>
          <InputLabel
              className={classes.labelRoot}
              htmlFor={id}
            >
              {labelText}
          </InputLabel>
          <Input
            className={classes.input}
            onChange={changed}
            id={id}
            {...inputProps}
          />
        </FormControl>
      );
      break;
    case ("datePicker") :
      inputElement = (
        <ThemeProvider theme={muiTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disablePast={true}
              autoOk={true}
              disableToolbar
              variant="inline"
              format="yyyy/MM/dd"
              margin="normal"
              id="date-picker-inline"
              value={value}
              onChange={changed}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>);
      break;
    case ("timeSelector") :
        inputElement = (
          <ThemeProvider theme={muiTheme}>
            <FormControl className={classes.formComtrol}>
              <InputLabel id="from-time">{type}</InputLabel>
                <Select
                  labelId="from-time"
                  id="from-time-labels"
                  value={time}
                  autoWidth={true}
                  onChange={changed}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 225,
                        width: 150,
                      },
                    },
                  }}
                  >
                  {props.timeList.map(timeEl => {
                    return <MenuItem key={timeEl} value={timeEl}>{timeEl}</MenuItem>
                  })}
                </Select>
            </FormControl>
          </ThemeProvider>);
      break;
    case ("requiredInput") :
        inputElement = (
          <TextField
            required
            className={classes.textField}
            id="standard-required"
            label={props.label}
            defaultValue={value}
            onChange={changed}/>
        );
      break;
    case ("generalInput") :
        inputElement = (
          <TextField
            required
            className={classes.textField}
            id="standard"
            label={props.label}
            defaultValue={value}
            onChange={changed}/>
        );
      break;
    case ("attendees") :
        inputElement = (
          <TextField
            className={classes.textField}
            id="input-with-icon-textfield"
            onKeyDown={keyPressed}
            onChange={changed}
          />
        );
      break;
      case ("numberInput") :
      inputElement = (
        <TextField
          className={classes.textField}
          id="input-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onKeyDown={keyPressed}
          onChange={changed}
        />
      );
      break;
    default:
      inputElement = null;
  }

  return (
    <div className={classes.RootInput}>
      {inputElement}
    </div>
  )
}

export default CustomInput;