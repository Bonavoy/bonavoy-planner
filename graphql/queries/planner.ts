import { gql } from '../generated';

export const GET_AUTHORS_PRESENT = gql(`
  query authorsPresent($tripId: ID!) {
    authorsPresent(tripId: $tripId) {
      ...authorPresentFull
    }
  }
`);
