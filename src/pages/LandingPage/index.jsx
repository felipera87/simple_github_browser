import React, { useRef, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { BiSearch } from 'react-icons/bi';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { HiOutlineEmojiSad } from 'react-icons/hi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLazyQuery } from '@apollo/client';

import {
  Container,
  SearchContainer,
  UsersContainer,
  UsersBrowser,
  UserBoxButton,
  RepositoriesContainer,
  EmptyUsersList,
} from './styles';

import { SEARCH_USERS, USER_REPOSITORIES } from '../../apollo/queries/user';

import { useGlobalData } from '../../hooks/global';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

const LandingPage = () => {
  const searchFormRef = useRef(null);

  const {
    searchQuery,
    setSearchQuery,
    usersList,
    setUsersList,
    repositoriesList,
    setRepositoriesList,
    selectedUser,
    setSelectedUser,
  } = useGlobalData();

  const [
    getUsers,
    { loading: isLoadingUsers, data: usersData, error: usersError },
  ] = useLazyQuery(SEARCH_USERS);

  const [
    getRepositories,
    {
      loading: isLoadingRepositories,
      data: repositoriesData,
      error: repositoriesError,
    },
  ] = useLazyQuery(USER_REPOSITORIES);

  const searchHandleSubmit = useCallback(
    async data => {
      try {
        if (searchFormRef.current) {
          searchFormRef.current.setErrors({});
        }

        const schema = Yup.object().shape({
          query: Yup.string().required('Search is required.'),
        });

        await schema.validate(data, { abortEarly: false });

        const { query: queryString } = data;

        setUsersList([]);
        setRepositoriesList([]);
        setSelectedUser(null);
        setSearchQuery(queryString);
        await getUsers({
          variables: {
            query: queryString,
            type: 'USER',
            first: 20,
          },
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          if (searchFormRef.current) {
            searchFormRef.current.setErrors(errors);
          }
        }
      }
    },
    [
      getUsers,
      setRepositoriesList,
      setSearchQuery,
      setSelectedUser,
      setUsersList,
    ],
  );

  const selectUser = useCallback(
    async usersListIndex => {
      setRepositoriesList([]);

      if (
        selectedUser === null ||
        selectedUser.id !== usersList[usersListIndex].id
      ) {
        setSelectedUser({
          ...usersList[usersListIndex],
        });
        await getRepositories({
          variables: {
            login: usersList[usersListIndex].login,
            first: 10,
          },
        });
      } else {
        setSelectedUser(null);
      }
    },
    [
      getRepositories,
      selectedUser,
      setRepositoriesList,
      setSelectedUser,
      usersList,
    ],
  );

  const totalRepositories = useMemo(() => {
    if (selectedUser === null) {
      return 0;
    }

    if (
      repositoriesData &&
      repositoriesData.user &&
      repositoriesData.user.repositories
    ) {
      return repositoriesData.user.repositories.totalCount;
    }
    return 0;
  }, [repositoriesData, selectedUser]);

  const totalUsers = useMemo(() => {
    if (usersData && usersData.search) {
      return usersData.search.userCount;
    }
    return 0;
  }, [usersData]);

  const repositoryPageInfo = useMemo(() => {
    if (selectedUser === null) {
      return null;
    }

    if (
      repositoriesData &&
      repositoriesData.user &&
      repositoriesData.user.repositories
    ) {
      return { ...repositoriesData.user.repositories.pageInfo };
    }
    return null;
  }, [repositoriesData, selectedUser]);

  const userPageInfo = useMemo(() => {
    if (usersData && usersData.search) {
      return { ...usersData.search.pageInfo };
    }
    return null;
  }, [usersData]);

  const fetchMoreUsers = useCallback(
    async direction => {
      if (searchQuery && userPageInfo) {
        if (direction === 'next_page') {
          await getUsers({
            variables: {
              query: searchQuery,
              type: 'USER',
              first: 20,
              after: userPageInfo.endCursor,
              last: null,
              before: null,
            },
          });
        }
        if (direction === 'previous_page') {
          await getUsers({
            variables: {
              query: searchQuery,
              type: 'USER',
              first: null,
              after: null,
              last: 20,
              before: userPageInfo.startCursor,
            },
          });
        }

        setSelectedUser(null);
        setRepositoriesList([]);
      }
    },
    [getUsers, searchQuery, setRepositoriesList, setSelectedUser, userPageInfo],
  );

  const fetchMoreRepositories = useCallback(async () => {
    if (selectedUser && repositoryPageInfo) {
      await getRepositories({
        variables: {
          login: selectedUser.login,
          first: 10,
          after: repositoryPageInfo.endCursor,
        },
      });
    }
  }, [getRepositories, repositoryPageInfo, selectedUser]);

  useEffect(() => {
    if (usersData && usersData.search && usersData.search.nodes) {
      const newUserList = usersData.search.nodes.map(user => {
        const { login, name, avatarUrl, id } = user;
        return {
          login,
          name,
          avatarUrl,
          id,
        };
      });
      setUsersList(newUserList);
    }
  }, [setUsersList, usersData]);

  const addRepositoriesToList = useCallback(
    newRepositoriesList => {
      setRepositoriesList(oldArray => [...oldArray, ...newRepositoriesList]);
    },
    [setRepositoriesList],
  );

  useEffect(() => {
    if (
      repositoriesData &&
      repositoriesData.user &&
      repositoriesData.user.repositories &&
      repositoriesData.user.repositories.nodes
    ) {
      const newRepositoriesList = repositoriesData.user.repositories.nodes.map(
        repository => {
          const {
            id,
            name,
            stargazerCount,
            watchers: { totalCount: watcherCount },
            owner: { login: ownerLogin },
          } = repository;
          return {
            id,
            name,
            stargazerCount,
            watcherCount,
            ownerLogin,
          };
        },
      );
      addRepositoriesToList(newRepositoriesList);
    }
  }, [addRepositoriesToList, repositoriesData]);

  return (
    <Container>
      <SearchContainer>
        <Form ref={searchFormRef} onSubmit={searchHandleSubmit}>
          <Input
            type="text"
            name="query"
            icon={BiSearch}
            defaultValue={searchQuery}
            placeholder="Search Users..."
          />
          <div className="search-button-container">
            <Button type="submit" isLoading={isLoadingUsers}>
              Search!
            </Button>
          </div>
        </Form>
      </SearchContainer>
      <UsersContainer>
        <h2>Users {totalUsers > 0 && <small>({totalUsers})</small>}</h2>
        {usersList.length === 0 ? (
          <EmptyUsersList>
            <span>
              No users found <HiOutlineEmojiSad />
            </span>
          </EmptyUsersList>
        ) : (
          <>
            {userPageInfo && userPageInfo.hasPreviousPage && (
              <button
                type="button"
                id="button-user-previous-page"
                onClick={() => fetchMoreUsers('previous_page')}
              >
                <FaChevronLeft />
              </button>
            )}
            <UsersBrowser>
              {isLoadingUsers && <h1>loading...</h1>}
              {usersError && <h1>error</h1>}
              {usersList.map((user, index) => {
                return (
                  <UserBoxButton
                    type="button"
                    key={user.id}
                    isSelected={selectedUser && user.id === selectedUser.id}
                    onClick={() => selectUser(index)}
                  >
                    <img src={user.avatarUrl} alt="Github Avatar" />
                    <span>{user.name}</span>
                  </UserBoxButton>
                );
              })}
            </UsersBrowser>
            {userPageInfo && userPageInfo.hasNextPage && (
              <button
                type="button"
                id="button-user-next-page"
                onClick={() => fetchMoreUsers('next_page')}
              >
                <FaChevronRight />
              </button>
            )}
          </>
        )}
      </UsersContainer>
      <RepositoriesContainer>
        <h2>
          Repositories{' '}
          {totalRepositories > 0 && <small>({totalRepositories})</small>}
        </h2>
        {isLoadingRepositories && <h1>Loading...</h1>}
        {repositoriesError && <h1>error</h1>}
        <ul>
          <InfiniteScroll
            dataLength={repositoriesList.length}
            next={fetchMoreRepositories}
            hasMore={
              repositoryPageInfo ? repositoryPageInfo.hasNextPage : false
            }
            loader={<h5>Loading...</h5>}
            height={300}
          >
            {repositoriesList.map(repository => {
              return (
                <li key={repository.id}>
                  <Link
                    to={`/user/${repository.ownerLogin}/repository/${repository.name}`}
                  >
                    <span>{repository.name}</span>
                    <span>
                      {repository.stargazerCount} stars /{' '}
                      {repository.watcherCount} watching
                    </span>
                  </Link>
                </li>
              );
            })}
          </InfiniteScroll>
        </ul>
      </RepositoriesContainer>
    </Container>
  );
};

export default LandingPage;
