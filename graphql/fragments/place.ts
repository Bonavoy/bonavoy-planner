import { gql } from '../generated';

export const PLACES_FULL = gql(`
  fragment placesFull on Place {
    id
    text
    place_name
    mapbox_id
    startDate
    endDate
    colour
    center
  }
`);
