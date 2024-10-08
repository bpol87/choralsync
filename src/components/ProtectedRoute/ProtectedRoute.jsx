import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const user = useSelector(store => store.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

