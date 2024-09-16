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
import AboutInfo from '../Checklist/AboutInfo'
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
      return (<BaseNav />);
    } else if (user.isChecklistCompleted) {
    return (<FullNav />);
  } else if (!user.isChecklistCompleted) {
      // Show conditional nav if the checklist is not completed
      return (<ConditionalNav />);
    } 
  }

const renderChecklist = () => {
  if (!user.id) {
    return (<Redirect to="/login" />);
  } else if (user.isChecklistCompleted) {
    return (<UserPage />)
  } else if (!user.isChecklistCompleted) {
    return (<Checklist />)
  } 
}

const renderProfileInfo = () => {
  if (!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<ProfileInfo />)
  }
}

const renderMemberList = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<MemberList />)
  }
}

const renderMemberPage = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<MemberProfile />)
  }
}

const renderEditProfile = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<EditProfile />)
  }
}

const renderContact = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<ContactInfo />)
  }
}

const renderEmergency = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<EmergencyInfo />)
  }
}

const renderAbout = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<AboutInfo />)
  }
}

const renderSocial = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<SocialInfo />)
  }
}

const renderReview = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<ReviewProfile />)
  }
}

const renderConcerts = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<MusicLibrary />)
  }
}

const renderTracks = () => {
  if(!user.id) {
    return (<Redirect to="/login" />)
  } else if (user.id) {
    return (<ConcertTracks />)
  }
}

  return (
    <Router>
      <div className="bg-gray-300 min-h-screen flex flex-col">
        {renderNav()}
        <div className="flex flex-col flex-grow">
          <Switch>
            <Route exact path="/">
              {user.id ? <Redirect to="/user" /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <ProtectedRoute exact path="/user">
              {renderChecklist()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile-info">
              {renderProfileInfo()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/contact-info">
              {renderContact()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/emergency-info">
              {renderEmergency()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/social-info">
              {renderSocial()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/about-info">
              {renderAbout()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/review-info">
              {renderReview()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/members">
              {renderMemberList()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/members/:id">
              {renderMemberPage()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/edit-profile">
              {renderEditProfile()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/music-library">
              {renderConcerts()}
            </ProtectedRoute>
            <ProtectedRoute exact path="/music-library/:concertId">
              {renderTracks()}
            </ProtectedRoute>
            <Route exact path="/login">
              {user.id ? <Redirect to="/user" /> : <LoginPage />}
            </Route>
            <Route exact path="/registration">
              {user.id ? <Redirect to="/user" /> : <RegisterPage />}
            </Route>
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