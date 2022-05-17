import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

function Logout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(actions.logout());
  }, [dispatch])

  const logout = <Redirect to={token ? "/home" : "/"} />;

  return logout;
}

export default Logout;