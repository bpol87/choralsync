import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BaseNav from '../Nav/BaseNav';
import ConditionalNav from '../Nav/ConditionalNav';
import FullNav from '../Nav/FullNav';
import Footer from '../Footer/Footer';
import AboutPage from '../AboutPage/AboutPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import UserPage from '../UserPage/UserPage';
import Checklist from '../Checklist/Checklist';
import ProfileInfo from '../Checklist/ProfileInfo';
import ContactInfo from '../Checklist/ContactInfo';
import EmergencyInfo from '../Checklist/EmergencyInfo';
import SocialInfo from '../Checklist/SocialInfo';
import ReviewProfile from '../Checklist/Review';
import MemberList from '../Members/MemberList';
import MemberProfile from '../Members/MemberProfile';
import EditProfile from '../EditProfile/EditProfile';
import MusicLibrary from '../Music/MusicLibrary';
import ConcertTracks from '../Music/Tracks';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const userProfile = useSelector(store => store.userProfile);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    if (user.id) {
      dispatch({ type: 'FETCH_USER_PROFILE', payload: user.id });
    }
    dispatch({ type: 'FETCH_CONCERTS' });
  }, [dispatch, user.id]);

  // Determine which nav to render based on the user profile and user status
  const renderNav = () => {
    if (!user.id) {
      // Show base nav when not logged in
      return <BaseNav />;
    }

    if (!userProfile.isChecklistCompleted) {
      // Show conditional nav if the checklist is not completed
      return <ConditionalNav />;
    }

    // Show full nav otherwise
    return <FullNav />;
  };

  return (
    <Router>
      <div className='bg-gray-300 min-h-screen flex flex-col'>
        {renderNav()}
        <div className='flex flex-col flex-grow'>
          <Switch>
            <Route exact path="/" render={() => (
              user.id ? <Redirect to="/user" /> : <Redirect to="/login" />
            )} />
            <Route exact path="/about" component={AboutPage} />
            <ProtectedRoute exact path="/user" component={userProfile.isChecklistCompleted ? UserPage : Checklist} />
            <ProtectedRoute exact path="/profile-info" component={ProfileInfo} />
            <ProtectedRoute exact path="/contact-info" component={ContactInfo} />
            <ProtectedRoute exact path="/emergency-info" component={EmergencyInfo} />
            <ProtectedRoute exact path="/social-info" component={SocialInfo} />
            <ProtectedRoute exact path="/review-info" component={ReviewProfile} />
            <ProtectedRoute exact path="/members" component={MemberList} />
            <ProtectedRoute exact path="/members/:id" component={MemberProfile} />
            <ProtectedRoute exact path="/edit-profile" component={EditProfile} />
            <ProtectedRoute exact path="/music-library" component={MusicLibrary} />
            <ProtectedRoute exact path="/music-library/:concertId" component={ConcertTracks} />
            <Route exact path="/login" render={() => (
              user.id ? <Redirect to="/user" /> : <LoginPage />
            )} />
            <Route exact path="/registration" render={() => (
              user.id ? <Redirect to="/user" /> : <RegisterPage />
            )} />
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
