import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import chartPage from './layout/main.jsx';
import signupPage from './views/auth/signup'
import LoginPage from './views/auth/login'
import { PrivateRoute } from "./helpers/PrivateRoute";




class App extends Component {
  render() {
    return (
      <div className="app" >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={signupPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={signupPage} />
            <PrivateRoute path="/chat" component={chartPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;
