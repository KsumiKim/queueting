const RoomRegisterStyle = {
  formControl: {
    margin: 0,
  },
  formGroup: {
    display: "flex",
    flexDirection: "row"
  },
  container: {
    width: "80%",
    height: "90%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(3, 20%)"
  },
  imgWrap: {
    textAlign: "center",
  },
  img: {
    padding: "10px",
    borderRadius: "30px"
  },
  wrap: {
    display: "flex",
    flexDirection: "row",
    margin: "15px",
  },
  input: {
    width: "75%",
  },
  label: {
    width: "25%",
    verticalAlign: "baseline",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  buttonWrap: {
    display: "inlineBlock",
    textAlign: "right"
  },
  button: {
    marginLeft: "10px",
    marginRight: "10px"
  }
}

export default RoomRegisterStyle;