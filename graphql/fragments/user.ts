import { gql } from '../generated';

export const USER_SNIPPET = gql(`
  fragment userSnippet on User {
    username
    email
    avatar
    id
  }
`);
