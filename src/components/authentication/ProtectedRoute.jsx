import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect exact to="/login" />)}
    />
  );
};

export default ProtectedRoute;
