/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    user {\n      ...userSnippet\n    }\n    role\n  }\n": types.AuthorOnTripSnippetFragmentDoc,
    "\n  fragment placesFull on Place {\n    id\n    text\n    place_name\n    mapbox_id\n    startDate\n    endDate\n    colour\n    center\n  }\n": types.PlacesFullFragmentDoc,
    "\n  fragment transportationFull on Transportation {\n    id\n    type\n    departure_location\n    departure_time\n    arrival_location\n    arrival_time\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n  }\n": types.TransportationFullFragmentDoc,
    "\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n": types.TripFullFragmentDoc,
    "\n  fragment userSnippet on User {\n    username\n    avatar\n    id\n  }\n": types.UserSnippetFragmentDoc,
    "\n  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {\n    addTransportation(placeId: $placeId, transportation: $transportation) {\n      ...transportationFull\n    }\n  }\n": types.AddTransportationDocument,
    "\n  mutation updateTransportation($id: ID!, $transportation: UpdateTransportationInput!) {\n    updateTransportation(id: $id, transportation: $transportation) {\n      ...transportationFull \n    }\n  }\n": types.UpdateTransportationDocument,
    "\n  mutation deleteTransportation($id: ID!) {\n    deleteTransportation(id: $id)\n  }\n": types.DeleteTransportationDocument,
    "\n  mutation getToken {\n    token\n  }\n": types.GetTokenDocument,
    "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n": types.CreateUserDocument,
    "\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n": types.AuthenticateDocument,
    "\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n": types.GetLocationSuggestionsDocument,
    "\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n": types.PlacesDocument,
    "\n  query routeSegments($segmentWaypoints: [[InputCoords!]!]!) {\n    routeSegments(segmentWaypoints: $segmentWaypoints)\n  }\n": types.RouteSegmentsDocument,
    "\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n": types.TripsDocument,
    "\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      ...transportationFull\n    }\n  }\n": types.SubscriptionDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    user {\n      ...userSnippet\n    }\n    role\n  }\n"): (typeof documents)["\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    user {\n      ...userSnippet\n    }\n    role\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment placesFull on Place {\n    id\n    text\n    place_name\n    mapbox_id\n    startDate\n    endDate\n    colour\n    center\n  }\n"): (typeof documents)["\n  fragment placesFull on Place {\n    id\n    text\n    place_name\n    mapbox_id\n    startDate\n    endDate\n    colour\n    center\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment transportationFull on Transportation {\n    id\n    type\n    departure_location\n    departure_time\n    arrival_location\n    arrival_time\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n  }\n"): (typeof documents)["\n  fragment transportationFull on Transportation {\n    id\n    type\n    departure_location\n    departure_time\n    arrival_location\n    arrival_time\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n"): (typeof documents)["\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment userSnippet on User {\n    username\n    avatar\n    id\n  }\n"): (typeof documents)["\n  fragment userSnippet on User {\n    username\n    avatar\n    id\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {\n    addTransportation(placeId: $placeId, transportation: $transportation) {\n      ...transportationFull\n    }\n  }\n"): (typeof documents)["\n  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {\n    addTransportation(placeId: $placeId, transportation: $transportation) {\n      ...transportationFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateTransportation($id: ID!, $transportation: UpdateTransportationInput!) {\n    updateTransportation(id: $id, transportation: $transportation) {\n      ...transportationFull \n    }\n  }\n"): (typeof documents)["\n  mutation updateTransportation($id: ID!, $transportation: UpdateTransportationInput!) {\n    updateTransportation(id: $id, transportation: $transportation) {\n      ...transportationFull \n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteTransportation($id: ID!) {\n    deleteTransportation(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteTransportation($id: ID!) {\n    deleteTransportation(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation getToken {\n    token\n  }\n"): (typeof documents)["\n  mutation getToken {\n    token\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n"): (typeof documents)["\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n"): (typeof documents)["\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n"): (typeof documents)["\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query routeSegments($segmentWaypoints: [[InputCoords!]!]!) {\n    routeSegments(segmentWaypoints: $segmentWaypoints)\n  }\n"): (typeof documents)["\n  query routeSegments($segmentWaypoints: [[InputCoords!]!]!) {\n    routeSegments(segmentWaypoints: $segmentWaypoints)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      ...transportationFull\n    }\n  }\n"): (typeof documents)["\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      ...transportationFull\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;