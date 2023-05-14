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

export const UPDATE_INVITE_ROLE = gql(`
  mutation updateInviteRole($id: ID!, $role: TripRole!) {
    updateInviteRole(id: $id, role: $role) {
      ...pendingInviteFull
    }
  }
`);

export const DELETE_INVITE = gql(`
  mutation deleteInvite($id: ID!) {
    deleteInvite(id: $id) 
  }
`);
