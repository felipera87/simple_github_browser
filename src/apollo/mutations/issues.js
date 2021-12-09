import { gql } from '@apollo/client';

export const CREATE_ISSUE = gql`
  mutation CreateIssue($input: CreateIssueInput!) {
    createIssue(input: $input) {
      issue {
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
    }
  }
`;
