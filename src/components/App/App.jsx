import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Checklist from '../Checklist/Checklist';
import ProfileInfo from '../Checklist/ProfileInfo';
import ContactInfo from '../Checklist/ContactInfo';
import EmergencyInfo from '../Checklist/EmergencyInfo';
import AboutInfo from '../Checklist/AboutInfo';
import SocialInfo from '../Checklist/SocialInfo';
import ReviewProfile from '../Checklist/Review';
import MemberList from '../Members/MembersList';
import MemberProfile from '../Members/MemberProfile';
import EditProfile from '../EditProfile/EditProfile';
import MusicLibrary from '../Music/MusicLibrary';
import ConcertTracks from '../Music/Tracks';
import './App.css';



function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'FETCH_USER_PROFILE'});
    dispatch({ type: "FETCH_CONCERTS" })
  }, [dispatch]);

useEffect(() => {
    dispatch({type: 'FETCH_USER_PROFILE'});
    dispatch({ type: "FETCH_MEMBER_CARDS" });
    dispatch({ type: "FETCH_CONCERTS" });
}, [])

  return (
    <Router>
      <div className='bg-gray-300 min-h-screen flex flex-col'>
        <Nav />
        <div className='flex flex-col flex-grow'>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            {!user.isChecklistCompleted ?
              <Checklist />
            :
            <UserPage />}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/profile-info"
          >
            <ProfileInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/contact-info"
          >
            <ContactInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/emergency-info"
          >
            <EmergencyInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/about-info"
          >
            <AboutInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/social-info"
          >
            <SocialInfo />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/review-info"
          >
            <ReviewProfile />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/members"
          >
            <MemberList />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/members/:id"
          >
            <MemberProfile />
            </ProtectedRoute>
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/edit-profile"
          >
            <EditProfile />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/music-library"
          >
            <MusicLibrary />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/music-library/:concertId'
          >
            <ConcertTracks />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LoginPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
