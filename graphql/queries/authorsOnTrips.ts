import { gql } from '../generated';

export const GET_AUTHORS_ON_TRIP = gql(`
  query authorsOnTrips($tripId: ID!) {
    authorsOnTrips(tripId: $tripId) {
      user {
        id
        email
      }
      trip {
        id
        name
      }
      role
    }
  }
`);
