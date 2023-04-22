import { gql } from '../generated';

export const GET_INVITES = gql(`
  query invites($tripId: ID!) {
    invites(tripId: $tripId) {
      ...pendingInviteFull
    }
  }
`);
