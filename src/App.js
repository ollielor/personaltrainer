import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./components/Login";
import Homepage from './components/Homepage';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Calendarcomponent from './components/Calendarcomponent';

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/customers"
        component={Customerlist}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/trainings"
        component={Trainingslist}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/calendar" component={Calendarcomponent} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Homepage} />
      <Route render={() => <h1>Page not found</h1>}/>
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
