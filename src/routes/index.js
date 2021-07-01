import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from '../screens/home/Home';
import Login from "../screens/login/Login";
import RegisterEndEdit from "../screens/registerEndEdit/RegisterEndEdit";
import NotFound from '../screens/notFound/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/registerEndEdit/:mode?">
        <RegisterEndEdit />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default Routes;