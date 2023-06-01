import { gql } from '../generated';

export const GET_PLANNER_DETAILS = gql(`
  query plannerDetails($tripId: ID!) {
    plannerDetails(tripId: $tripId) {
      name
      startDate
      endDate
      banner
      places {
        ...placesFull
      }
    }
  }
`);

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
