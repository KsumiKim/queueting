const meetingStyle = {
  headerWrap: {
    textAlign: "right"
  },
  header: {
    fontWeight: "700",
    color: "#8d99ae",
    fontSize: "25px"
  },
  container: {
    width: "80%",
    height: "90%",
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(3, 20%)"
  },
  wrap: {
    display: "grid",
    gridTemplateColumns: "0.7fr 2fr",
    columnGap: "30px",
  },
  title: {
      fontWeight: "400",
      color: "#8d99ae",
      fontSize: "15px",
      justifySelf: "end",
      alignSelf: "center"
    },
  input: {
    maxWidth: "100%",
  },
  chipWrap: {
    display: "flex",
    width: "90%"
  },
  attendees: {
    display: "flex",
    width: "100%"
  },
  chipInput: {
    maxWidth: "100%",
  },
  chip: {
    padding: "5px",
    margin: "3px"
  },
  plus: {
    width: "10%"
  },
  users: {
    outline: 0,
    position: "absolute",
    maxWidth: "120px",
    minHeight: "50px",
    overflowX: "hidden",
    overflowY: "auto",
    top: "220px",
    left: "200px",
    boxShadow: "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
    backgroundColor: "#fff",
    zIndex: 100
  },
  time: {
    display: "flex",
    justifyContent: "space-between",
  },
  buttonWrap: {
    display: "inlineBlock",
    textAlign: "right",
    position: "absolute",
    top: "370px",
    left: "390px"
  },
  button: {
    marginLeft: "10px",
    marginRight: "10px"
  }
}

export default meetingStyle;