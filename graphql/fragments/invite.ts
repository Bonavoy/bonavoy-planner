import { gql } from '../generated';

export const INVITE_FULL = gql(`
  fragment pendingInviteFull on PendingInvite {
    id
    email
    role
  }
`);
