import { gql } from '../generated';

export const LISTEN_AUTHORS_PRESENT = gql(`
  subscription listenAuthorPresent($tripId: ID!) {
    listenAuthorPresent(tripId: $tripId) {
      ...authorPresentFull
    }
  }
`);

export const LISTEN_ACTIVE_ELEMENTS = gql(`
  subscription listenActiveElement($tripId: ID!) {
    listenActiveElement(tripId: $tripId) {
      ...activeElementFull
    }
  }
`);
