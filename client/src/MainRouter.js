import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import User  from './core/User';
import Profile  from './core/Profile';
import Update  from './core/Update';
import Post  from './core/Post';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/user" component={User}></Route>
            <Route exact path="/user/:userId" component={Profile}></Route>
            <Route exact path="/user/edit/:userId" component={Update}></Route>
            <Route exact path="/user/post/:userId" component={Post}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
        </Switch>
    </div>   
);

export default MainRouter;