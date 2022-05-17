import {
  defaultFont
} from "./mainComponent";

const customInputStyle = {
  disabled: {
    "&:before": {
      borderColor: "transparent !important"
    }
  },
  labelRoot: {
    ...defaultFont,
    color: "#AAAAAA !important",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "1.42857",
    top: "10px",
    letterSpacing: "unset",
    "& + $underline": {
      marginTop: "0px"
    }
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: "#495057"
    },
    width: "100%"
  },
  input: {
    color: "#495057",
    height: "unset",
    "&,&::placeholder": {
      fontSize: "14px",
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: "400",
      lineHeight: "1.42857",
      opacity: "1"
    },
    "&::placeholder": {
      color: "#AAAAAA"
    }
  },
  whiteInput: {
    "&,&::placeholder": {
      color: "#FFFFFF",
      opacity: "1"
    }
  },
  textField: {
    width: "100%"
  },
  formComtrol: {
    minWidth: "100%"
  },
  RootInput: {
    minWidth: 120,
    width: "100%"
  }
};

export default customInputStyle;
