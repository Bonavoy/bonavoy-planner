import { gql } from '../generated';

// const USER_FULL = gql(`)

export const USER_SNIPPET = gql(`
  fragment userSnippet on User {
    username
    avatar
    id
  }
`);
