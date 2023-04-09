import { gql } from '../generated';

export const GET_ROUTE_SEGMENTS = gql(`
  query routeSegments($segmentWaypoints: [[InputCoords!]!]!) {
    routeSegments(segmentWaypoints: $segmentWaypoints)
  }
`);
