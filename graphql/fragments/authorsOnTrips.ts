import { gql } from '../generated';

export const AUTHOR_ON_TRIP_SNIPPET = gql(`
  fragment authorOnTripSnippet on AuthorsOnTrips {
    id
    user {
      ...userSnippet
    }
    role
  }
`);
