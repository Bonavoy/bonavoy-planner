import { gql } from '../generated';

export const AUTHOR_PRESENT_FULL = gql(`
  fragment authorPresentFull on AuthorPresent {
      id
      username
      firstname
      email
      lastname
      avatar
      connected
  }
`);
