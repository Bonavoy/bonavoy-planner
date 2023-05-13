import { gql } from '../generated';

export const UPDATE_AUTHOR_ON_TRIP_ROLE = gql(`
  mutation updateAuthorOnTripRole(id: ID!, role: TripRole) {
    updateAuthorOnTripRole(id: $id, role: $role) {
      ...authorOnTripSnippet
    }
  }
`);
