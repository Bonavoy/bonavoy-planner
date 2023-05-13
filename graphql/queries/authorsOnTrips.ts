import { gql } from '../generated';

export const GET_AUTHORS_ON_TRIP = gql(`
  query authorsOnTrips($tripId: ID!) {
    authorsOnTrips(tripId: $tripId) {
      ...authorOnTripSnippet
    }
  }
`);
