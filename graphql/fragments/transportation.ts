import { gql } from '../generated';

export const TRANSPORTATION_FULL = gql(`
  fragment transportationFull on Transportation {
    id
    type
    departureLocation
    departureTime
    arrivalLocation
    arrivalTime
    details
    departureCoords {
      lat
      lng
    }
    arrivalCoords {
      lat
      lng
    }
    order
    connectingId
    connectingOrder
  }
`);
