import { gql } from '../generated';

export const INVITE_FULL = gql(`
  fragment inviteFull on Invite {
    email
    role
  }
`);
