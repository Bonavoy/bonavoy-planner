import { gql } from '../generated';

export const GET_LOCATION_SUGGESTIONS = gql(`
  query getLocationSuggestions($query: String!) {
    getLocationSuggestions(query: $query) {
      name
      text
      center {
        lat
        lng
      }
    }
  }
`);
