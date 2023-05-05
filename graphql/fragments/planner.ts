import { gql } from '../generated';

export const AUTHOR_PRESENT_FULL = gql(`
  fragment authorPresentFull on AuthorPresent {
      id
      username
      avatar
      connected
  }
`);

export const ACTIVE_ELEMENT_FULL = gql(`
  fragment activeElementFull on ActiveElement {
    elementId
    active
    tripId
    author {
      ...authorPresentFull
    }
  }
`);
