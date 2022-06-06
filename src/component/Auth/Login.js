import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { auth, db } from "../../firebase-queueting";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import PersonIcon from "@material-ui/icons/Person";
import GridContainer from "../../component/UI/Grid/GridContainer/GridContainer";
import GridItem from "../../component/UI/Grid/GridItem/GridItem";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import CardBody from "../UI/Card/CardBody";
import CardHeader from "../UI/Card/CardHeader";
import CardFooter from "../UI/Card/CardFooter";
import CustomInput from "../UI/Input/CustomInput";
import Spinner from "../UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import styles from "../../assets/jss/loginPage";
import image from "../../assets/img/login_bg.jpg";

const useStyles = makeStyles(styles);

function Login() {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [email, setEmail] = useState("guest@guest.com");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("guest123!");
  const [isSignup, setIsSignup] = useState(false);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const redirectPath = useSelector((state) => state.user.redirectPath);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();

  useEffect(() => {
  }, [email, password]);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const nicknameChangeHandler = (event) => {
    setNickname(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = () => {
    dispatch(actions.authenticate(email, password));
  }

  const toggleMode = () => {
    setIsSignup(isSignup => !isSignup);
  }

  const signupHandler = async () => {
    await auth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      setIsSignup(false);

      await db.collection("users").doc(userCredential.user.uid).set({
        email: email,
        name: nickname
      })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
      setNickname("");
      setEmail("");
      setPassword("");
      alert("You have successfully created a new account");
    })
    .catch((error) => {
      console.log(error);
    });
  }

  let loginForm = (
      <>
        <CardHeader color="info" className={classes.cardHeader}>
          {isSignup ? <h4>SIGN UP</h4> : <h4>LOGIN</h4>}
        </CardHeader>
        <CardBody className={classes.cardBody}>
          {isSignup && <CustomInput
            elementType="inputText"
            labelText="Nickname..."
            id="nickname"
            formControlProps={{
              fullWidth: true
            }}
            changed={nicknameChangeHandler}
            inputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />}
          <CustomInput
            elementType="inputText"
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            changed={emailChangeHandler}
            inputProps={{
              type: "email",
              endAdornment: (
                <InputAdornment position="end">
                  <Email className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            elementType="inputText"
            labelText="Password"
            id="pass"
            formControlProps={{
              fullWidth: true
            }}
            changed={passwordChangeHandler}
            inputProps={{
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                  <LockOutlinedIcon className={classes.inputIconsColor}/>
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </CardBody>
        {error && <p className={classes.errorMessage}>{error}</p>}
        <CardFooter className={classes.cardFooter}>
          {isSignup ?
          <>
            <Button
              simple color="info" size="lg"
              clicked={signupHandler}>
              Create Account
            </Button>
            <Button
              simple color="success" size="lg"
              clicked={toggleMode}>
              Sign In
            </Button>
          </>
          :
          <>
            <Button
              simple color="info" size="lg"
              clicked={loginHandler}>
              Get started
            </Button>
            <Button
              simple color="success" size="lg"
              clicked={toggleMode}>
              Sign Up
            </Button>
          </>}
        </CardFooter>
      </>
  );

  if (loading) {
    loginForm = <Spinner/>
  }

  if (redirectPath && userId) {
    loginForm = <Redirect to={redirectPath}/>
  }


  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  {loginForm}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}


export default Login;