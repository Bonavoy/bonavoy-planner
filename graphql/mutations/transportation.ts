import { gql } from '../generated';

export const ADD_TRANSPORTATION = gql(`
  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {
    addTransportation(placeId: $placeId, transportation: $transportation) {
      ...transportationFull
    }
  }
`);

export const UPDATE_TRANSPORTATION = gql(`
  mutation updateTransportation($id: ID!, $transportation: UpdateTransportationInput!) {
    updateTransportation(id: $id, transportation: $transportation) {
      ...transportationFull 
    }
  }
`);

export const DELETE_TRANSPORTATION = gql(`
  mutation deleteTransportation($id: ID!) {
    deleteTransportation(id: $id)
  }
`);
