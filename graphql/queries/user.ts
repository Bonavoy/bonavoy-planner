import { gql } from '../generated';

export const GET_USER = gql(`
  query user {
    user {
      ...userSnippet
    }
  }
`);
