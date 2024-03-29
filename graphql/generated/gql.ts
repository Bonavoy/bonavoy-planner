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
    "\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    id\n    user {\n      ...userSnippet\n    }\n    role\n  }\n": types.AuthorOnTripSnippetFragmentDoc,
    "\n  fragment pendingInviteFull on PendingInvite {\n    id\n    email\n    role\n  }\n": types.PendingInviteFullFragmentDoc,
    "\n  fragment placesFull on Place {\n    id\n    text\n    placeName\n    mapboxId\n    startDate\n    endDate\n    colour\n    center\n  }\n": types.PlacesFullFragmentDoc,
    "\n  fragment authorPresentFull on AuthorPresent {\n      id\n      username\n      avatar\n      connected\n  }\n": types.AuthorPresentFullFragmentDoc,
    "\n  fragment activeElementFull on ActiveElement {\n    elementId\n    active\n    tripId\n    author {\n      ...authorPresentFull\n    }\n  }\n": types.ActiveElementFullFragmentDoc,
    "\n  fragment transportationFull on Transportation {\n    id\n    type\n    departureLocation\n    departureTime\n    arrivalLocation\n    arrivalTime\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n    order\n    connectingId\n    connectingOrder\n    route {\n      segments\n      duration\n    }\n  }\n": types.TransportationFullFragmentDoc,
    "\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n": types.TripFullFragmentDoc,
    "\n  fragment userSnippet on User {\n    username\n    email\n    avatar\n    id\n  }\n": types.UserSnippetFragmentDoc,
    "\n  mutation updateAuthorOnTripRole($id: ID!, $role: TripRole!) {\n    updateAuthorOnTripRole(id: $id, role: $role) {\n      ...authorOnTripSnippet\n    }\n  }\n": types.UpdateAuthorOnTripRoleDocument,
    "\n  mutation removeAuthorOnTrip($id: ID!) {\n    removeAuthorOnTrip(id: $id)\n  }\n": types.RemoveAuthorOnTripDocument,
    "\n  mutation sendInvite($tripId: ID!, $invitee: InviteInput!) {\n    sendInvite(tripId: $tripId, invitee: $invitee) {\n      ... on PendingInvite {\n        ...pendingInviteFull\n      }\n      ... on AuthorsOnTrips {\n        role\n        user {\n          email\n        }\n      }\n    }\n  }\n": types.SendInviteDocument,
    "\n  mutation updateInviteRole($id: ID!, $role: TripRole!) {\n    updateInviteRole(id: $id, role: $role) {\n      ...pendingInviteFull\n    }\n  }\n": types.UpdateInviteRoleDocument,
    "\n  mutation deleteInvite($id: ID!) {\n    deleteInvite(id: $id) \n  }\n": types.DeleteInviteDocument,
    "\n  mutation updateActiveElement($tripId: ID!, $activeElement: UpdateActiveElement!) {\n    updateActiveElement(tripId: $tripId, activeElement: $activeElement) {\n      ...activeElementFull\n    }\n  }\n": types.UpdateActiveElementDocument,
    "\n  mutation addTransportation($placeId: ID!, $transportation: TransportationInput!) {\n    addTransportation(placeId: $placeId, transportation: $transportation) {\n      ...transportationFull\n    }\n  }\n": types.AddTransportationDocument,
    "\n  mutation updateTransportation($id: ID!, $transportation: UpdateTransportationInput!) {\n    updateTransportation(id: $id, transportation: $transportation) {\n      ...transportationFull \n    }\n  }\n": types.UpdateTransportationDocument,
    "\n  mutation deleteTransportation($id: ID!) {\n    deleteTransportation(id: $id)\n  }\n": types.DeleteTransportationDocument,
    "\n  mutation getToken {\n    token\n  }\n": types.GetTokenDocument,
    "\n  mutation createUser($userInput: UserInput!) {\n    createUser(userInput: $userInput) {\n      id\n    }\n  }  \n": types.CreateUserDocument,
    "\n  mutation authenticate($username: String!, $password: String!) {\n    authenticate(username: $username, password: $password)\n  }\n": types.AuthenticateDocument,
    "\n  query authorsOnTrips($tripId: ID!) {\n    authorsOnTrips(tripId: $tripId) {\n      ...authorOnTripSnippet\n    }\n  }\n": types.AuthorsOnTripsDocument,
    "\n  query invites($tripId: ID!) {\n    invites(tripId: $tripId) {\n      ...pendingInviteFull\n    }\n  }\n": types.InvitesDocument,
    "\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n": types.GetLocationSuggestionsDocument,
    "\n  query place($placeId: ID!) {\n    place(placeId: $placeId) {\n      ...placesFull\n    }\n  }\n": types.PlaceDocument,
    "\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n": types.PlacesDocument,
    "\n  query plannerDetails($tripId: ID!) {\n    plannerDetails(tripId: $tripId) {\n      name\n      startDate\n      endDate\n      banner\n      places {\n        ...placesFull\n      }\n    }\n  }\n": types.PlannerDetailsDocument,
    "\n  query authorsPresent($tripId: ID!) {\n    authorsPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n": types.AuthorsPresentDocument,
    "\n  query activeElements($tripId: ID!) {\n    activeElements(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n": types.ActiveElementsDocument,
    "\n  query routeLegs($routeWaypoints: [[InputCoords!]!]!) {\n    routeLegs(routeWaypoints: $routeWaypoints) {\n      segments\n      duration\n    }\n  }\n": types.RouteLegsDocument,
    "\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n": types.TripsDocument,
    "\n  query user {\n    user {\n      ...userSnippet\n    }\n  }\n": types.UserDocument,
    "\n  subscription listenAuthorPresent($tripId: ID!) {\n    listenAuthorPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n": types.ListenAuthorPresentDocument,
    "\n  subscription listenActiveElement($tripId: ID!) {\n    listenActiveElement(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n": types.ListenActiveElementDocument,
    "\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      transportation {\n        ...transportationFull\n      }\n      placeId\n      deleted\n    }\n  }\n": types.SubscriptionDocument,
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
export function gql(source: "\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    id\n    user {\n      ...userSnippet\n    }\n    role\n  }\n"): (typeof documents)["\n  fragment authorOnTripSnippet on AuthorsOnTrips {\n    id\n    user {\n      ...userSnippet\n    }\n    role\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment pendingInviteFull on PendingInvite {\n    id\n    email\n    role\n  }\n"): (typeof documents)["\n  fragment pendingInviteFull on PendingInvite {\n    id\n    email\n    role\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment placesFull on Place {\n    id\n    text\n    placeName\n    mapboxId\n    startDate\n    endDate\n    colour\n    center\n  }\n"): (typeof documents)["\n  fragment placesFull on Place {\n    id\n    text\n    placeName\n    mapboxId\n    startDate\n    endDate\n    colour\n    center\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment authorPresentFull on AuthorPresent {\n      id\n      username\n      avatar\n      connected\n  }\n"): (typeof documents)["\n  fragment authorPresentFull on AuthorPresent {\n      id\n      username\n      avatar\n      connected\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment activeElementFull on ActiveElement {\n    elementId\n    active\n    tripId\n    author {\n      ...authorPresentFull\n    }\n  }\n"): (typeof documents)["\n  fragment activeElementFull on ActiveElement {\n    elementId\n    active\n    tripId\n    author {\n      ...authorPresentFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment transportationFull on Transportation {\n    id\n    type\n    departureLocation\n    departureTime\n    arrivalLocation\n    arrivalTime\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n    order\n    connectingId\n    connectingOrder\n    route {\n      segments\n      duration\n    }\n  }\n"): (typeof documents)["\n  fragment transportationFull on Transportation {\n    id\n    type\n    departureLocation\n    departureTime\n    arrivalLocation\n    arrivalTime\n    details\n    departureCoords {\n      lat\n      lng\n    }\n    arrivalCoords {\n      lat\n      lng\n    }\n    order\n    connectingId\n    connectingOrder\n    route {\n      segments\n      duration\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n"): (typeof documents)["\n  fragment tripFull on Trip {\n    id\n    name\n    isPublic\n    authors { \n      ...authorOnTripSnippet\n     }\n    banner\n    startDate\n    endDate\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment userSnippet on User {\n    username\n    email\n    avatar\n    id\n  }\n"): (typeof documents)["\n  fragment userSnippet on User {\n    username\n    email\n    avatar\n    id\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateAuthorOnTripRole($id: ID!, $role: TripRole!) {\n    updateAuthorOnTripRole(id: $id, role: $role) {\n      ...authorOnTripSnippet\n    }\n  }\n"): (typeof documents)["\n  mutation updateAuthorOnTripRole($id: ID!, $role: TripRole!) {\n    updateAuthorOnTripRole(id: $id, role: $role) {\n      ...authorOnTripSnippet\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation removeAuthorOnTrip($id: ID!) {\n    removeAuthorOnTrip(id: $id)\n  }\n"): (typeof documents)["\n  mutation removeAuthorOnTrip($id: ID!) {\n    removeAuthorOnTrip(id: $id)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation sendInvite($tripId: ID!, $invitee: InviteInput!) {\n    sendInvite(tripId: $tripId, invitee: $invitee) {\n      ... on PendingInvite {\n        ...pendingInviteFull\n      }\n      ... on AuthorsOnTrips {\n        role\n        user {\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation sendInvite($tripId: ID!, $invitee: InviteInput!) {\n    sendInvite(tripId: $tripId, invitee: $invitee) {\n      ... on PendingInvite {\n        ...pendingInviteFull\n      }\n      ... on AuthorsOnTrips {\n        role\n        user {\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateInviteRole($id: ID!, $role: TripRole!) {\n    updateInviteRole(id: $id, role: $role) {\n      ...pendingInviteFull\n    }\n  }\n"): (typeof documents)["\n  mutation updateInviteRole($id: ID!, $role: TripRole!) {\n    updateInviteRole(id: $id, role: $role) {\n      ...pendingInviteFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation deleteInvite($id: ID!) {\n    deleteInvite(id: $id) \n  }\n"): (typeof documents)["\n  mutation deleteInvite($id: ID!) {\n    deleteInvite(id: $id) \n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation updateActiveElement($tripId: ID!, $activeElement: UpdateActiveElement!) {\n    updateActiveElement(tripId: $tripId, activeElement: $activeElement) {\n      ...activeElementFull\n    }\n  }\n"): (typeof documents)["\n  mutation updateActiveElement($tripId: ID!, $activeElement: UpdateActiveElement!) {\n    updateActiveElement(tripId: $tripId, activeElement: $activeElement) {\n      ...activeElementFull\n    }\n  }\n"];
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
export function gql(source: "\n  query authorsOnTrips($tripId: ID!) {\n    authorsOnTrips(tripId: $tripId) {\n      ...authorOnTripSnippet\n    }\n  }\n"): (typeof documents)["\n  query authorsOnTrips($tripId: ID!) {\n    authorsOnTrips(tripId: $tripId) {\n      ...authorOnTripSnippet\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query invites($tripId: ID!) {\n    invites(tripId: $tripId) {\n      ...pendingInviteFull\n    }\n  }\n"): (typeof documents)["\n  query invites($tripId: ID!) {\n    invites(tripId: $tripId) {\n      ...pendingInviteFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n"): (typeof documents)["\n  query getLocationSuggestions($query: String!) {\n    getLocationSuggestions(query: $query) {\n      name\n      text\n      center {\n        lat\n        lng\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query place($placeId: ID!) {\n    place(placeId: $placeId) {\n      ...placesFull\n    }\n  }\n"): (typeof documents)["\n  query place($placeId: ID!) {\n    place(placeId: $placeId) {\n      ...placesFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n"): (typeof documents)["\n  query places($tripId: ID!) {\n    places(tripId: $tripId) {\n      ...placesFull\n      transportation {\n        ...transportationFull\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query plannerDetails($tripId: ID!) {\n    plannerDetails(tripId: $tripId) {\n      name\n      startDate\n      endDate\n      banner\n      places {\n        ...placesFull\n      }\n    }\n  }\n"): (typeof documents)["\n  query plannerDetails($tripId: ID!) {\n    plannerDetails(tripId: $tripId) {\n      name\n      startDate\n      endDate\n      banner\n      places {\n        ...placesFull\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query authorsPresent($tripId: ID!) {\n    authorsPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n"): (typeof documents)["\n  query authorsPresent($tripId: ID!) {\n    authorsPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query activeElements($tripId: ID!) {\n    activeElements(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n"): (typeof documents)["\n  query activeElements($tripId: ID!) {\n    activeElements(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query routeLegs($routeWaypoints: [[InputCoords!]!]!) {\n    routeLegs(routeWaypoints: $routeWaypoints) {\n      segments\n      duration\n    }\n  }\n"): (typeof documents)["\n  query routeLegs($routeWaypoints: [[InputCoords!]!]!) {\n    routeLegs(routeWaypoints: $routeWaypoints) {\n      segments\n      duration\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query Trips($limit: Int!, $after: ID) {\n    trips(limit: $limit, after: $after) {\n      edges {\n        node {\n          ...tripFull    \n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query user {\n    user {\n      ...userSnippet\n    }\n  }\n"): (typeof documents)["\n  query user {\n    user {\n      ...userSnippet\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription listenAuthorPresent($tripId: ID!) {\n    listenAuthorPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n"): (typeof documents)["\n  subscription listenAuthorPresent($tripId: ID!) {\n    listenAuthorPresent(tripId: $tripId) {\n      ...authorPresentFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription listenActiveElement($tripId: ID!) {\n    listenActiveElement(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n"): (typeof documents)["\n  subscription listenActiveElement($tripId: ID!) {\n    listenActiveElement(tripId: $tripId) {\n      ...activeElementFull\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      transportation {\n        ...transportationFull\n      }\n      placeId\n      deleted\n    }\n  }\n"): (typeof documents)["\n  subscription Subscription($placeIds: [ID!]!) {\n    transportation(placeIds: $placeIds) {\n      transportation {\n        ...transportationFull\n      }\n      placeId\n      deleted\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;