import { gql } from '../generated';

export const ADD_TRANSPORTATION = gql(`
  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {
    addTransportation(placeId: $placeId, transportation: $transportation) {
      id
    }
  }
`);
