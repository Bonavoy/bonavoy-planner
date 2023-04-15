import { gql } from '../generated';

export const TRANSPORTATION_UPDATED = gql(`
  subscription Subscription($placeIds: [ID!]!) {
    transportation(placeIds: $placeIds) {
      transportation {
        ...transportationFull
      }
      placeId
      deleted
    }
  }
`);
