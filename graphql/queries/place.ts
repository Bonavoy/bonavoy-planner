import { gql } from '../generated';

export const GET_PLACE = gql(`
  query place($placeId: ID!) {
    place(placeId: $placeId) {
      ...placesFull
    }
  }
`);

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
