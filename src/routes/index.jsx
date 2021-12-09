import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import LandingPage from '../pages/LandingPage';
import RepositoryPage from '../pages/RepositoryPage';
import NotFound from '../pages/NotFound';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route
        path="/user/:userLogin/repository/:repositoryName"
        component={RepositoryPage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
