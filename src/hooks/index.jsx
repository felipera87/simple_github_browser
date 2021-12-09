import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ModalProvider } from 'styled-react-modal';

import client from '../config/apolloClient';

import { GlobalProvider } from './global';

const AppProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <GlobalProvider>
        <ModalProvider>{children}</ModalProvider>
      </GlobalProvider>
    </ApolloProvider>
  );
};

export default AppProvider;
