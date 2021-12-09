import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [usersList, setUsersList] = useState([]);
  const [repositoriesList, setRepositoriesList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        usersList,
        setUsersList,
        repositoriesList,
        setRepositoriesList,
        selectedUser,
        setSelectedUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

function useGlobalData() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalProvider');
  }

  return context;
}

export { GlobalProvider, useGlobalData };
