import { gql } from '@apollo/client';

export const REPOSITORY_OPEN_ISSUES = gql`
  query RepositoryOpenIssues(
    $owner: String!
    $name: String!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filterBy: IssueFilters
  ) {
    repository(owner: $owner, name: $name) {
      id
      name
      stargazerCount
      watchers {
        totalCount
      }
      issues(
        after: $after
        before: $before
        first: $first
        last: $last
        filterBy: $filterBy
      ) {
        nodes {
          author {
            ... on User {
              name
            }
          }
          title
          createdAt
          id
          number
          comments {
            totalCount
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
        totalCount
      }
    }
  }
`;
