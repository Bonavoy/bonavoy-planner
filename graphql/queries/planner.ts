import { gql } from '../generated';

export const GET_AUTHORS_PRESENT = gql(`
  query authorsPresent($tripId: ID!) {
    authorsPresent(tripId: $tripId) {
      ...authorPresentFull
    }
  }
`);

export const GET_ACTIVE_ELEMENTS = gql(`
  query activeElements($tripId: ID!) {
    activeElements(tripId: $tripId) {
      ...activeElementFull
    }
  }
`);
