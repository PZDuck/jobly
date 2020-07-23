import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Companies from "./Companies";
import Home from "./Home";
import Jobs from "./Jobs";
import Job from "./Job";
import Company from "./Company";
import Login from "./Login";
import Profile from "./Profile";
import Logout from "./Logout";
import Register from "./Register";

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/companies">
        <Companies />
      </Route>
      <Route exact path="/companies/:handle">
        <Company />
      </Route>
      <Route exact path="/jobs">
        <Jobs />
      </Route>
      <Route exact path="/jobs/:id">
        <Job />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/logout">
        <Logout />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
