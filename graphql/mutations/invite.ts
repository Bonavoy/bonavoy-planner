import { gql } from '../generated';

export const SEND_INVITE = gql(`
  mutation sendInvite($tripId: ID!, $invitee: InviteInput!) {
    sendInvite(tripId: $tripId, invitee: $invitee) {
      ... on PendingInvite {
        ...pendingInviteFull
      }
      ... on AuthorsOnTrips {
        role
        user {
          email
        }
      }
    }
  }
`);
