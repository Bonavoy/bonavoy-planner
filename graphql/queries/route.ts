import { gql } from '../generated';

export const GET_ROUTE_SEGMENTS = gql(`
  query routeLegs($routeWaypoints: [[InputCoords!]!]!) {
    routeLegs(routeWaypoints: $routeWaypoints) {
      segments
      duration
    }
  }
`);
