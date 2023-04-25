import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import JobDetails from './components/JobDetails/JobDetails';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';
import Forget from './components/Auth/forget';
import TwoFactorAuth from './components/Auth/twoFactorAuth';
import User from './components/Management/User';
import Dashboard from './components/Dashboard/Dashboard';
import Header from "./components/common/header/Header"
import "./App.css"
import About from "./components/about/About"
import Team from "./components/team/Team"
import Contact from "./components/contact/Contact"
import Home1 from "./components/home1/Home"
import ConfirmEmail from './components/Auth/ConfirmEmail';

import ChangePassword from './components/Profile/ChangePassword';
import Profile from './components/Profile/Profile';

import UserInterviewForm from './components/Interview/UserInterviewForm';


const App = () => {
  const currentPath = window.location.pathname;
  const isDashboard = currentPath === '/dash';
  const isAuth = currentPath === '/auth';
  const isTwoFactor = currentPath === '/twoFactor';
  const isConfirmEmail = currentPath.startsWith('/confirm/');
  const isForgotPassword = currentPath.startsWith('/forgotPassword/');
  // const users = JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
      {!isDashboard && !isAuth && !isTwoFactor && !isConfirmEmail && !isForgotPassword && <Header />}
        <Switch>
          <Route path="/dash" component={Dashboard} />
          <Route exact path='/' component={Home1} />
          <Route exact path='/about' component={About} />
          <Route path="/jobs" exact component={Home} />
          <Route exact path='/team' component={Team} />
          <Route exact path='/contact' component={Contact} />
          <Route path="/manage/user" exact component={User} />
          <Route path="/jobs/search" exact component={Home} />
          <Route path="/jobs/:id" exact component={JobDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/forgotPassword/:token" component={Forget} />
          <Route path="/twoFactor" component={TwoFactorAuth} />
          <Route path="/confirm/:token" component={ConfirmEmail} />
          <Route path="/changepassword" component={ChangePassword}/>
          <Route path="/profile" component={Profile}/>

            <Route path="/interview" component={UserInterviewForm}></Route>

        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
