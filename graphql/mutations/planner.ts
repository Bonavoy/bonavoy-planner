import { gql } from '../generated';

export const UPDATE_ACTIVE_ELEMENT = gql(`
  mutation updateActiveElement($tripId: ID!, $activeElement: UpdateActiveElement!) {
    updateActiveElement(tripId: $tripId, activeElement: $activeElement) {
      ...activeElementFull
    }
  }
`);
