import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "./Components/Navbar/Navbar";
import Showcase from "./Components/Showcase/Showcase";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import MyProfile from "./Components/Profile/MyProfile";
import CreateProfile from "./Components/CreateProfile/CreateProfile";
import EditProfile from "./Components/EditProfile/EditProfile";
import AddExp from "./Components/AddExp/AddExp";
import EditPic from "./Components/EditPic/EditPic";
import Devs from "./Components/Devs/Devs";
import UserProfile from "./Components/Profile/UserProfile";
import Posts from "./Components/Posts/Posts";
import PostPage from "./Components/Posts/PostPage";

import { initAuthActionCreator } from "./redux/reducers/auth-reducer";

function App({ initAuth }) {
  useEffect(() => {
    // initAuth();
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
            <Route path="/create-profile" component={CreateProfile} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/add-experience" component={AddExp} />
            <Route path="/edit-pic" component={EditPic} />
            <Route path="/devs" component={Devs} />
            <Route path="/profile" component={MyProfile} />
            <Route path="/user/:userId" component={UserProfile} />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:postId" component={PostPage} />
          </Switch>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default connect(null, (dispatch) => ({
  initAuth: () => dispatch(initAuthActionCreator()),
}))(App);
