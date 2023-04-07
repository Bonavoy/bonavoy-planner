import { gql } from '../generated';

export const TRANSPORTATION_FULL = gql(`
  fragment transportationFull on Transportation {
    id
    type
    departure_location
    departure_time
    arrival_location
    arrival_time
    details
    departureCoords {
      lat
      lng
    }
    arrivalCoords {
      lat
      lng
    }
  }
`);
