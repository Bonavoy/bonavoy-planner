/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** DateTime custom scalar type that is timezone agnostic ie. relative to UTC */
  DateTime: any;
};

export type ActiveElement = {
  __typename?: 'ActiveElement';
  active: Scalars['Boolean'];
  author: AuthorPresent;
  elementId: Scalars['ID'];
  tripId: Scalars['ID'];
};

export type Activity = {
  __typename?: 'Activity';
  end?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: Maybe<Scalars['DateTime']>;
};

export type ActivityInput = {
  end?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  order: Scalars['Int'];
  start?: InputMaybe<Scalars['DateTime']>;
};

export type AuthorPresent = {
  __typename?: 'AuthorPresent';
  avatar: Scalars['String'];
  connected: Scalars['Boolean'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username: Scalars['String'];
};

export type AuthorsOnTrips = {
  __typename?: 'AuthorsOnTrips';
  id: Scalars['ID'];
  role: TripRole;
  trip: Trip;
  user: User;
};

export type AuthorsOnTripsConnection = {
  __typename?: 'AuthorsOnTripsConnection';
  edges: Array<AuthorsOnTripsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AuthorsOnTripsEdge = {
  __typename?: 'AuthorsOnTripsEdge';
  node: AuthorsOnTrips;
};

export type Coords = {
  __typename?: 'Coords';
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type CreateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order: Scalars['Int'];
};

export type DayPlan = {
  __typename?: 'DayPlan';
  activities: Array<Activity>;
  date?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  order: Scalars['Int'];
};

export type InputCoords = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
};

export type Invite = AuthorsOnTrips | PendingInvite;

export type InviteInput = {
  email: Scalars['String'];
  role: TripRole;
};

export type LocationContext = {
  __typename?: 'LocationContext';
  id: Scalars['String'];
  short_code?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: Maybe<Scalars['String']>;
};

export type LocationSuggestion = {
  __typename?: 'LocationSuggestion';
  center: Coords;
  name: Scalars['String'];
  text: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addTransportation: Transportation;
  authenticate: Scalars['Boolean'];
  createActivity: Activity;
  createDayPlan: DayPlan;
  createPlace: Place;
  createTrip: Trip;
  createUser: User;
  deleteActivity: Scalars['ID'];
  deleteDayPlan: Scalars['ID'];
  deleteInvite: Scalars['ID'];
  deletePlace: Scalars['ID'];
  deleteTransportation: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  removeAuthorOnTrip: Scalars['ID'];
  sendInvite: Invite;
  token: Scalars['Boolean'];
  updateActiveElement: ActiveElement;
  updateActivity: Activity;
  updateAuthorOnTripRole: AuthorsOnTrips;
  updateDayPlan: DayPlan;
  updateInviteRole: PendingInvite;
  updatePlace: Place;
  updateTransportation: Transportation;
  updateTrip: Trip;
};


export type MutationAddTransportationArgs = {
  placeId: Scalars['ID'];
  transportation: TransportationInput;
};


export type MutationAuthenticateArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateActivityArgs = {
  activity: ActivityInput;
  dayPlanId: Scalars['ID'];
};


export type MutationCreateDayPlanArgs = {
  dayPlan: CreateDayPlanInput;
  placeId: Scalars['ID'];
};


export type MutationCreatePlaceArgs = {
  place: PlaceInput;
  tripId: Scalars['ID'];
};


export type MutationCreateTripArgs = {
  trip: TripInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationDeleteActivityArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDayPlanArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteInviteArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteTransportationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTripArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveAuthorOnTripArgs = {
  id: Scalars['ID'];
};


export type MutationSendInviteArgs = {
  invitee: InviteInput;
  tripId: Scalars['ID'];
};


export type MutationUpdateActiveElementArgs = {
  activeElement: UpdateActiveElement;
  tripId: Scalars['ID'];
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  updateActivityInput: UpdateActivityInput;
};


export type MutationUpdateAuthorOnTripRoleArgs = {
  id: Scalars['ID'];
  role: TripRole;
};


export type MutationUpdateDayPlanArgs = {
  id: Scalars['ID'];
  updateDayPlan: UpdateDayPlanInput;
};


export type MutationUpdateInviteRoleArgs = {
  id: Scalars['ID'];
  role: TripRole;
};


export type MutationUpdatePlaceArgs = {
  id: Scalars['ID'];
  place: UpdatePlaceInput;
};


export type MutationUpdateTransportationArgs = {
  id: Scalars['ID'];
  transportation: UpdateTransportationInput;
};


export type MutationUpdateTripArgs = {
  updateTripInput: UpdateTripInput;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['ID'];
  hasNextPage: Scalars['Boolean'];
};

export type PendingInvite = {
  __typename?: 'PendingInvite';
  email: Scalars['String'];
  id: Scalars['ID'];
  role: TripRole;
};

export type Place = {
  __typename?: 'Place';
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans: Array<DayPlan>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapboxId: Scalars['String'];
  placeName: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  transportation: Array<Array<Transportation>>;
};

export type PlaceInput = {
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapboxId: Scalars['String'];
  placeName: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type PlannerDetails = {
  __typename?: 'PlannerDetails';
  banner: Scalars['String'];
  endDate: Scalars['DateTime'];
  name: Scalars['String'];
  places: Array<Place>;
  startDate: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  activeElements: Array<ActiveElement>;
  authorsOnTrips: Array<AuthorsOnTrips>;
  authorsPresent: Array<AuthorPresent>;
  dayPlan: DayPlan;
  dayPlans: Array<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  invites: Array<PendingInvite>;
  place: Place;
  places: Array<Place>;
  plannerDetails: PlannerDetails;
  routeLegs: Array<RouteLeg>;
  transportation: Array<Array<Transportation>>;
  trip: Trip;
  trips: TripConnection;
  user: User;
};


export type QueryActiveElementsArgs = {
  tripId: Scalars['ID'];
};


export type QueryAuthorsOnTripsArgs = {
  tripId: Scalars['ID'];
};


export type QueryAuthorsPresentArgs = {
  tripId: Scalars['ID'];
};


export type QueryDayPlanArgs = {
  id: Scalars['ID'];
};


export type QueryDayPlansArgs = {
  placeId: Scalars['ID'];
};


export type QueryGetLocationSuggestionsArgs = {
  query: Scalars['String'];
};


export type QueryInvitesArgs = {
  tripId: Scalars['ID'];
};


export type QueryPlaceArgs = {
  placeId: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
};


export type QueryPlannerDetailsArgs = {
  tripId: Scalars['ID'];
};


export type QueryRouteLegsArgs = {
  routeWaypoints: Array<Array<InputCoords>>;
};


export type QueryTransportationArgs = {
  placeId: Scalars['ID'];
};


export type QueryTripArgs = {
  tripId: Scalars['ID'];
};


export type QueryTripsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type RouteLeg = {
  __typename?: 'RouteLeg';
  duration: Scalars['Float'];
  segments: Array<Array<Scalars['Float']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  listenActiveElement: ActiveElement;
  listenAuthorPresent: AuthorPresent;
  transportation: TransportationNotification;
};


export type SubscriptionListenActiveElementArgs = {
  tripId: Scalars['ID'];
};


export type SubscriptionListenAuthorPresentArgs = {
  tripId: Scalars['ID'];
};


export type SubscriptionTransportationArgs = {
  placeIds: Array<Scalars['ID']>;
};

export type Transportation = {
  __typename?: 'Transportation';
  arrivalCoords?: Maybe<Coords>;
  arrivalLocation: Scalars['String'];
  arrivalTime?: Maybe<Scalars['DateTime']>;
  connectingId: Scalars['ID'];
  connectingOrder: Scalars['Int'];
  departureCoords?: Maybe<Coords>;
  departureLocation: Scalars['String'];
  departureTime?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  route?: Maybe<RouteLeg>;
  type: TransportationType;
};

export type TransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrivalLocation: Scalars['String'];
  arrivalTime?: InputMaybe<Scalars['DateTime']>;
  connectingId: Scalars['String'];
  departureCoords?: InputMaybe<InputCoords>;
  departureLocation: Scalars['String'];
  departureTime?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  type: TransportationType;
};

export type TransportationNotification = {
  __typename?: 'TransportationNotification';
  deleted: Scalars['Boolean'];
  placeId?: Maybe<Scalars['ID']>;
  transportation: Transportation;
};

export enum TransportationType {
  Bus = 'BUS',
  Car = 'CAR',
  Plane = 'PLANE'
}

export type Trip = {
  __typename?: 'Trip';
  authors: Array<AuthorsOnTrips>;
  banner: Scalars['String'];
  endDate: Scalars['DateTime'];
  id: Scalars['ID'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  places: Array<Place>;
  startDate: Scalars['DateTime'];
};

export type TripConnection = {
  __typename?: 'TripConnection';
  edges: Array<TripEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TripEdge = {
  __typename?: 'TripEdge';
  node: Trip;
};

export type TripInput = {
  endDate: Scalars['DateTime'];
  isPublic: Scalars['Boolean'];
  name: Scalars['String'];
  places: Array<PlaceInput>;
  startDate: Scalars['DateTime'];
};

export enum TripRole {
  Author = 'AUTHOR',
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type UpdateActiveElement = {
  active: Scalars['Boolean'];
  elementId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type UpdateActivityInput = {
  end?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateDayPlanInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdatePlaceInput = {
  center?: InputMaybe<Array<Scalars['Float']>>;
  colour?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapboxId?: InputMaybe<Scalars['String']>;
  placeName?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrivalLocation?: InputMaybe<Scalars['String']>;
  arrivalTime?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departureLocation?: InputMaybe<Scalars['String']>;
  departureTime?: InputMaybe<Scalars['DateTime']>;
  details?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TransportationType>;
};

export type UpdateTripInput = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  isPublic?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type User = {
  __typename?: 'User';
  authorsOnTrips: AuthorsOnTripsConnection;
  avatar?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['ID'];
  lastname: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};


export type UserAuthorsOnTripsArgs = {
  after?: InputMaybe<Scalars['ID']>;
  limit: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type AuthorOnTripSnippetFragment = { __typename?: 'AuthorsOnTrips', id: string, role: TripRole, user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } };

export type PendingInviteFullFragment = { __typename?: 'PendingInvite', id: string, email: string, role: TripRole };

export type PlacesFullFragment = { __typename?: 'Place', id: string, text: string, placeName: string, mapboxId: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number> };

export type AuthorPresentFullFragment = { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean };

export type ActiveElementFullFragment = { __typename?: 'ActiveElement', elementId: string, active: boolean, tripId: string, author: { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean } };

export type TransportationFullFragment = { __typename?: 'Transportation', id: string, type: TransportationType, departureLocation: string, departureTime?: any | null, arrivalLocation: string, arrivalTime?: any | null, details: string, order: number, connectingId: string, connectingOrder: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, route?: { __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number } | null };

export type TripFullFragment = { __typename?: 'Trip', id: string, name: string, isPublic: boolean, banner: string, startDate: any, endDate: any, authors: Array<{ __typename?: 'AuthorsOnTrips', id: string, role: TripRole, user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } }> };

export type UserSnippetFragment = { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string };

export type UpdateAuthorOnTripRoleMutationVariables = Exact<{
  id: Scalars['ID'];
  role: TripRole;
}>;


export type UpdateAuthorOnTripRoleMutation = { __typename?: 'Mutation', updateAuthorOnTripRole: { __typename?: 'AuthorsOnTrips', id: string, role: TripRole, user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } } };

export type RemoveAuthorOnTripMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveAuthorOnTripMutation = { __typename?: 'Mutation', removeAuthorOnTrip: string };

export type SendInviteMutationVariables = Exact<{
  tripId: Scalars['ID'];
  invitee: InviteInput;
}>;


export type SendInviteMutation = { __typename?: 'Mutation', sendInvite: { __typename?: 'AuthorsOnTrips', role: TripRole, user: { __typename?: 'User', email: string } } | { __typename?: 'PendingInvite', id: string, email: string, role: TripRole } };

export type UpdateInviteRoleMutationVariables = Exact<{
  id: Scalars['ID'];
  role: TripRole;
}>;


export type UpdateInviteRoleMutation = { __typename?: 'Mutation', updateInviteRole: { __typename?: 'PendingInvite', id: string, email: string, role: TripRole } };

export type DeleteInviteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteInviteMutation = { __typename?: 'Mutation', deleteInvite: string };

export type UpdateActiveElementMutationVariables = Exact<{
  tripId: Scalars['ID'];
  activeElement: UpdateActiveElement;
}>;


export type UpdateActiveElementMutation = { __typename?: 'Mutation', updateActiveElement: { __typename?: 'ActiveElement', elementId: string, active: boolean, tripId: string, author: { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean } } };

export type AddTransportationMutationVariables = Exact<{
  placeId: Scalars['ID'];
  transportation: TransportationInput;
}>;


export type AddTransportationMutation = { __typename?: 'Mutation', addTransportation: { __typename?: 'Transportation', id: string, type: TransportationType, departureLocation: string, departureTime?: any | null, arrivalLocation: string, arrivalTime?: any | null, details: string, order: number, connectingId: string, connectingOrder: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, route?: { __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number } | null } };

export type UpdateTransportationMutationVariables = Exact<{
  id: Scalars['ID'];
  transportation: UpdateTransportationInput;
}>;


export type UpdateTransportationMutation = { __typename?: 'Mutation', updateTransportation: { __typename?: 'Transportation', id: string, type: TransportationType, departureLocation: string, departureTime?: any | null, arrivalLocation: string, arrivalTime?: any | null, details: string, order: number, connectingId: string, connectingOrder: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, route?: { __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number } | null } };

export type DeleteTransportationMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteTransportationMutation = { __typename?: 'Mutation', deleteTransportation: string };

export type GetTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type GetTokenMutation = { __typename?: 'Mutation', token: boolean };

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type AuthenticateMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type AuthenticateMutation = { __typename?: 'Mutation', authenticate: boolean };

export type AuthorsOnTripsQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type AuthorsOnTripsQuery = { __typename?: 'Query', authorsOnTrips: Array<{ __typename?: 'AuthorsOnTrips', id: string, role: TripRole, user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } }> };

export type InvitesQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type InvitesQuery = { __typename?: 'Query', invites: Array<{ __typename?: 'PendingInvite', id: string, email: string, role: TripRole }> };

export type GetLocationSuggestionsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type GetLocationSuggestionsQuery = { __typename?: 'Query', getLocationSuggestions: Array<{ __typename?: 'LocationSuggestion', name: string, text: string, center: { __typename?: 'Coords', lat: number, lng: number } }> };

export type PlaceQueryVariables = Exact<{
  placeId: Scalars['ID'];
}>;


export type PlaceQuery = { __typename?: 'Query', place: { __typename?: 'Place', id: string, text: string, placeName: string, mapboxId: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number> } };

export type PlacesQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type PlacesQuery = { __typename?: 'Query', places: Array<{ __typename?: 'Place', id: string, text: string, placeName: string, mapboxId: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number>, transportation: Array<Array<{ __typename?: 'Transportation', id: string, type: TransportationType, departureLocation: string, departureTime?: any | null, arrivalLocation: string, arrivalTime?: any | null, details: string, order: number, connectingId: string, connectingOrder: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, route?: { __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number } | null }>> }> };

export type PlannerDetailsQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type PlannerDetailsQuery = { __typename?: 'Query', plannerDetails: { __typename?: 'PlannerDetails', name: string, startDate: any, endDate: any, banner: string, places: Array<{ __typename?: 'Place', id: string, text: string, placeName: string, mapboxId: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number> }> } };

export type AuthorsPresentQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type AuthorsPresentQuery = { __typename?: 'Query', authorsPresent: Array<{ __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean }> };

export type ActiveElementsQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type ActiveElementsQuery = { __typename?: 'Query', activeElements: Array<{ __typename?: 'ActiveElement', elementId: string, active: boolean, tripId: string, author: { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean } }> };

export type RouteLegsQueryVariables = Exact<{
  routeWaypoints: Array<Array<InputCoords> | InputCoords> | Array<InputCoords> | InputCoords;
}>;


export type RouteLegsQuery = { __typename?: 'Query', routeLegs: Array<{ __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number }> };

export type TripsQueryVariables = Exact<{
  limit: Scalars['Int'];
  after?: InputMaybe<Scalars['ID']>;
}>;


export type TripsQuery = { __typename?: 'Query', trips: { __typename?: 'TripConnection', totalCount: number, edges: Array<{ __typename?: 'TripEdge', node: { __typename?: 'Trip', id: string, name: string, isPublic: boolean, banner: string, startDate: any, endDate: any, authors: Array<{ __typename?: 'AuthorsOnTrips', id: string, role: TripRole, user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', username: string, email: string, avatar?: string | null, id: string } };

export type ListenAuthorPresentSubscriptionVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type ListenAuthorPresentSubscription = { __typename?: 'Subscription', listenAuthorPresent: { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean } };

export type ListenActiveElementSubscriptionVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type ListenActiveElementSubscription = { __typename?: 'Subscription', listenActiveElement: { __typename?: 'ActiveElement', elementId: string, active: boolean, tripId: string, author: { __typename?: 'AuthorPresent', id: string, username: string, avatar: string, connected: boolean } } };

export type SubscriptionSubscriptionVariables = Exact<{
  placeIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SubscriptionSubscription = { __typename?: 'Subscription', transportation: { __typename?: 'TransportationNotification', placeId?: string | null, deleted: boolean, transportation: { __typename?: 'Transportation', id: string, type: TransportationType, departureLocation: string, departureTime?: any | null, arrivalLocation: string, arrivalTime?: any | null, details: string, order: number, connectingId: string, connectingOrder: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, route?: { __typename?: 'RouteLeg', segments: Array<Array<number>>, duration: number } | null } } };

export const PendingInviteFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"pendingInviteFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PendingInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<PendingInviteFullFragment, unknown>;
export const PlacesFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"mapboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}}]} as unknown as DocumentNode<PlacesFullFragment, unknown>;
export const AuthorPresentFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}}]} as unknown as DocumentNode<AuthorPresentFullFragment, unknown>;
export const ActiveElementFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"activeElementFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActiveElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementId"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}}]} as unknown as DocumentNode<ActiveElementFullFragment, unknown>;
export const TransportationFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departureLocation"}},{"kind":"Field","name":{"kind":"Name","value":"departureTime"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalLocation"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTime"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"connectingId"}},{"kind":"Field","name":{"kind":"Name","value":"connectingOrder"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<TransportationFullFragment, unknown>;
export const UserSnippetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UserSnippetFragment, unknown>;
export const AuthorOnTripSnippetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<AuthorOnTripSnippetFragment, unknown>;
export const TripFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tripFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<TripFullFragment, unknown>;
export const UpdateAuthorOnTripRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateAuthorOnTripRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TripRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAuthorOnTripRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UpdateAuthorOnTripRoleMutation, UpdateAuthorOnTripRoleMutationVariables>;
export const RemoveAuthorOnTripDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAuthorOnTrip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeAuthorOnTrip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveAuthorOnTripMutation, RemoveAuthorOnTripMutationVariables>;
export const SendInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"sendInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitee"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InviteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"invitee"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitee"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PendingInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"pendingInviteFull"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"pendingInviteFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PendingInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<SendInviteMutation, SendInviteMutationVariables>;
export const UpdateInviteRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateInviteRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"role"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TripRole"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateInviteRole"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"role"},"value":{"kind":"Variable","name":{"kind":"Name","value":"role"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"pendingInviteFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"pendingInviteFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PendingInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<UpdateInviteRoleMutation, UpdateInviteRoleMutationVariables>;
export const DeleteInviteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteInvite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteInvite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteInviteMutation, DeleteInviteMutationVariables>;
export const UpdateActiveElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateActiveElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"activeElement"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateActiveElement"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateActiveElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}},{"kind":"Argument","name":{"kind":"Name","value":"activeElement"},"value":{"kind":"Variable","name":{"kind":"Name","value":"activeElement"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"activeElementFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"activeElementFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActiveElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementId"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}}]} as unknown as DocumentNode<UpdateActiveElementMutation, UpdateActiveElementMutationVariables>;
export const AddTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransportationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"transportation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departureLocation"}},{"kind":"Field","name":{"kind":"Name","value":"departureTime"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalLocation"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTime"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"connectingId"}},{"kind":"Field","name":{"kind":"Name","value":"connectingOrder"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<AddTransportationMutation, AddTransportationMutationVariables>;
export const UpdateTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTransportationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"transportation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departureLocation"}},{"kind":"Field","name":{"kind":"Name","value":"departureTime"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalLocation"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTime"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"connectingId"}},{"kind":"Field","name":{"kind":"Name","value":"connectingOrder"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<UpdateTransportationMutation, UpdateTransportationMutationVariables>;
export const DeleteTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTransportationMutation, DeleteTransportationMutationVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const AuthorsOnTripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"authorsOnTrips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorsOnTrips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<AuthorsOnTripsQuery, AuthorsOnTripsQueryVariables>;
export const InvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"invites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"pendingInviteFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"pendingInviteFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PendingInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<InvitesQuery, InvitesQueryVariables>;
export const GetLocationSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLocationSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLocationSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"center"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<GetLocationSuggestionsQuery, GetLocationSuggestionsQueryVariables>;
export const PlaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"place"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"place"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"placesFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"mapboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}}]} as unknown as DocumentNode<PlaceQuery, PlaceQueryVariables>;
export const PlannerDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"plannerDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plannerDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"places"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"placesFull"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"mapboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}}]} as unknown as DocumentNode<PlannerDetailsQuery, PlannerDetailsQueryVariables>;
export const PlacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"places"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"placesFull"}},{"kind":"Field","name":{"kind":"Name","value":"transportation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"placeName"}},{"kind":"Field","name":{"kind":"Name","value":"mapboxId"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departureLocation"}},{"kind":"Field","name":{"kind":"Name","value":"departureTime"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalLocation"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTime"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"connectingId"}},{"kind":"Field","name":{"kind":"Name","value":"connectingOrder"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<PlacesQuery, PlacesQueryVariables>;
export const AuthorsPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"authorsPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authorsPresent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}}]} as unknown as DocumentNode<AuthorsPresentQuery, AuthorsPresentQueryVariables>;
export const ActiveElementsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"activeElements"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeElements"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"activeElementFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"activeElementFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActiveElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementId"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}}]} as unknown as DocumentNode<ActiveElementsQuery, ActiveElementsQueryVariables>;
export const RouteLegsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"routeLegs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"routeWaypoints"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputCoords"}}}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routeLegs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"routeWaypoints"},"value":{"kind":"Variable","name":{"kind":"Name","value":"routeWaypoints"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<RouteLegsQuery, RouteLegsQueryVariables>;
export const TripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Trips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tripFull"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tripFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]} as unknown as DocumentNode<TripsQuery, TripsQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const ListenAuthorPresentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"listenAuthorPresent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listenAuthorPresent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}}]} as unknown as DocumentNode<ListenAuthorPresentSubscription, ListenAuthorPresentSubscriptionVariables>;
export const ListenActiveElementDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"listenActiveElement"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"listenActiveElement"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"activeElementFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorPresentFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorPresent"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"connected"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"activeElementFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ActiveElement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elementId"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"tripId"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorPresentFull"}}]}}]}}]} as unknown as DocumentNode<ListenActiveElementSubscription, ListenActiveElementSubscriptionVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transportation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placeId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departureLocation"}},{"kind":"Field","name":{"kind":"Name","value":"departureTime"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalLocation"}},{"kind":"Field","name":{"kind":"Name","value":"arrivalTime"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"connectingId"}},{"kind":"Field","name":{"kind":"Name","value":"connectingOrder"}},{"kind":"Field","name":{"kind":"Name","value":"route"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"segments"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}}]}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;