import { gql } from '../generated';

export const PLACES_FULL = gql(`
  fragment placesFull on Place {
    id
    text
    placeName
    mapboxId
    startDate
    endDate
    colour
    center
  }
`);
