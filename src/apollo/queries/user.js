import { gql } from '@apollo/client';

export const SEARCH_USERS = gql`
  query SearchUsers(
    $query: String!
    $type: SearchType!
    $first: Int
    $last: Int
    $before: String
    $after: String
  ) {
    search(
      query: $query
      type: $type
      first: $first
      last: $last
      before: $before
      after: $after
    ) {
      codeCount
      userCount
      repositoryCount
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      nodes {
        ... on User {
          avatarUrl
          id
          name
          login
        }
      }
    }
  }
`;

export const USER_REPOSITORIES = gql`
  query UserRepositories($login: String!, $first: Int, $after: String) {
    user(login: $login) {
      repositories(first: $first, after: $after) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
        nodes {
          id
          name
          watchers {
            totalCount
          }
          stargazerCount
          owner {
            login
          }
        }
      }
    }
  }
`;
