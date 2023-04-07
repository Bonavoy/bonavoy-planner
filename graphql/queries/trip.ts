import { gql } from '../generated';

export const GET_TRIPS = gql(`
  query Trips($limit: Int!, $after: ID) {
    trips(limit: $limit, after: $after) {
      edges {
        node {
          ...tripFull    
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
      totalCount
    }
  }
`);
