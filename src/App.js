import React from "react";
import Lists from "./component/List/List";
import Places from "./component/Places/Places";
import Layout from "./component/Layout/Layout";
import Login from "./component/Auth/Login";
import Logout from "./component/Auth/Logout/Logout";
import Admin from "./component/Admin/Admin";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/logout" component={Logout} />
          <Route path="/places" component={Places} />
          <Route path="/home" component={Lists} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Login} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
