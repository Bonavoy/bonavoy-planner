import { gql } from '../generated';

export const LISTEN_AUTHORS_PRESENT = gql(`
  subscription listenAuthorPresent($tripId: ID!) {
    listenAuthorPresent(tripId: $tripId) {
      ...authorPresentFull
    }
  }
`);
