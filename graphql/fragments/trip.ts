import { gql } from '../generated';

export const TRIP_FULL = gql(`
  fragment tripFull on Trip {
    id
    name
    isPublic
    authors { 
      ...authorOnTripSnippet
     }
    banner
    startDate
    endDate
  }
`);
