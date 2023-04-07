import { gql } from '../generated';

export const GET_PLACES = gql(`
  query places($tripId: ID!) {
    places(tripId: $tripId) {
      ...placesFull
      transportation {
        ...transportationFull
      }
    }
  }
`);
