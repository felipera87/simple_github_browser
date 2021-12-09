import React from 'react';

import { Container, Spinner } from './styles';

const Button = ({ children, isLoading, ...rest }) => (
  <Container type="button" disabled={isLoading} {...rest}>
    {!isLoading ? children : <Spinner />}
  </Container>
);

export default Button;
