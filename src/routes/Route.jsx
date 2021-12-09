import React from 'react';
import { Route as ReactDOMRoute } from 'react-router-dom';

const Route = ({ component: Component, ...rest }) => {
  return <ReactDOMRoute {...rest} render={() => <Component />} />;
};

export default Route;
