import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Components/Navbar/Navbar";
import Showcase from "./Components/Showcase/Showcase";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import CreateProfile from "./Components/CreateProfile/CreateProfile";
import EditProfile from "./Components/EditProfile/EditProfile";
import AddExp from "./Components/AddExp/AddExp";

import { initAuthActionCreator } from "./redux/reducers/auth-reducer";

// import PrivateComponents from "./Components/PrivateComponents/PrivateComponents";
// const PrivateDashboard = PrivateComponents(Dashboard);

function App({ initAuth }) {
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path="/" component={Showcase} />

        <section className="container">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/add-experience" component={AddExp} />
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  initAuth: () => dispatch(initAuthActionCreator()),
}))(App);
