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
  deletePlace: Scalars['ID'];
  deleteTransportation: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  token: Scalars['Boolean'];
  updateActivity: Activity;
  updateDayPlan: DayPlan;
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


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteTransportationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTripArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  updateActivityInput: UpdateActivityInput;
};


export type MutationUpdateDayPlanArgs = {
  id: Scalars['ID'];
  updateDayPlan: UpdateDayPlanInput;
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

export type Place = {
  __typename?: 'Place';
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans: Array<DayPlan>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  transportation: Array<Transportation>;
};

export type PlaceDates = {
  __typename?: 'PlaceDates';
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type PlaceInput = {
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  dayPlan: DayPlan;
  dayPlans: Array<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  place: Place;
  places: Array<Place>;
  routeSegments: Array<Array<Array<Scalars['Float']>>>;
  transportation: Array<Transportation>;
  trip: Trip;
  trips: TripConnection;
  user: User;
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


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
};


export type QueryRouteSegmentsArgs = {
  segmentWaypoints: Array<Array<InputCoords>>;
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

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  transportation: TransportationNotification;
};


export type SubscriptionTransportationArgs = {
  placeIds: Array<Scalars['ID']>;
};

export type Transportation = {
  __typename?: 'Transportation';
  arrivalCoords?: Maybe<Coords>;
  arrival_location: Scalars['String'];
  arrival_time?: Maybe<Scalars['DateTime']>;
  departureCoords?: Maybe<Coords>;
  departure_location: Scalars['String'];
  departure_time?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  type: TransportationType;
};

export type TransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrival_location: Scalars['String'];
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departure_location: Scalars['String'];
  departure_time?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
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
  mapbox_id?: InputMaybe<Scalars['String']>;
  place_name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrival_location?: InputMaybe<Scalars['String']>;
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departure_location?: InputMaybe<Scalars['String']>;
  departure_time?: InputMaybe<Scalars['DateTime']>;
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

export type AuthorOnTripSnippetFragment = { __typename?: 'AuthorsOnTrips', role: TripRole, user: { __typename?: 'User', username: string, avatar?: string | null, id: string } };

export type PlacesFullFragment = { __typename?: 'Place', id: string, text: string, place_name: string, mapbox_id: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number> };

export type TransportationFullFragment = { __typename?: 'Transportation', id: string, type: TransportationType, departure_location: string, departure_time?: any | null, arrival_location: string, arrival_time?: any | null, details: string, order: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null };

export type TripFullFragment = { __typename?: 'Trip', id: string, name: string, isPublic: boolean, banner: string, startDate: any, endDate: any, authors: Array<{ __typename?: 'AuthorsOnTrips', role: TripRole, user: { __typename?: 'User', username: string, avatar?: string | null, id: string } }> };

export type UserSnippetFragment = { __typename?: 'User', username: string, avatar?: string | null, id: string };

export type AddTransportationMutationVariables = Exact<{
  placeId: Scalars['ID'];
  transportation: TransportationInput;
}>;


export type AddTransportationMutation = { __typename?: 'Mutation', addTransportation: { __typename?: 'Transportation', id: string, type: TransportationType, departure_location: string, departure_time?: any | null, arrival_location: string, arrival_time?: any | null, details: string, order: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null } };

export type UpdateTransportationMutationVariables = Exact<{
  id: Scalars['ID'];
  transportation: UpdateTransportationInput;
}>;


export type UpdateTransportationMutation = { __typename?: 'Mutation', updateTransportation: { __typename?: 'Transportation', id: string, type: TransportationType, departure_location: string, departure_time?: any | null, arrival_location: string, arrival_time?: any | null, details: string, order: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null } };

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

export type GetLocationSuggestionsQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type GetLocationSuggestionsQuery = { __typename?: 'Query', getLocationSuggestions: Array<{ __typename?: 'LocationSuggestion', name: string, text: string, center: { __typename?: 'Coords', lat: number, lng: number } }> };

export type PlacesQueryVariables = Exact<{
  tripId: Scalars['ID'];
}>;


export type PlacesQuery = { __typename?: 'Query', places: Array<{ __typename?: 'Place', id: string, text: string, place_name: string, mapbox_id: string, startDate?: any | null, endDate?: any | null, colour: string, center: Array<number>, transportation: Array<{ __typename?: 'Transportation', id: string, type: TransportationType, departure_location: string, departure_time?: any | null, arrival_location: string, arrival_time?: any | null, details: string, order: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null }> }> };

export type RouteSegmentsQueryVariables = Exact<{
  segmentWaypoints: Array<Array<InputCoords> | InputCoords> | Array<InputCoords> | InputCoords;
}>;


export type RouteSegmentsQuery = { __typename?: 'Query', routeSegments: Array<Array<Array<number>>> };

export type TripsQueryVariables = Exact<{
  limit: Scalars['Int'];
  after?: InputMaybe<Scalars['ID']>;
}>;


export type TripsQuery = { __typename?: 'Query', trips: { __typename?: 'TripConnection', totalCount: number, edges: Array<{ __typename?: 'TripEdge', node: { __typename?: 'Trip', id: string, name: string, isPublic: boolean, banner: string, startDate: any, endDate: any, authors: Array<{ __typename?: 'AuthorsOnTrips', role: TripRole, user: { __typename?: 'User', username: string, avatar?: string | null, id: string } }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor: string, hasNextPage: boolean } } };

export type SubscriptionSubscriptionVariables = Exact<{
  placeIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type SubscriptionSubscription = { __typename?: 'Subscription', transportation: { __typename?: 'TransportationNotification', placeId?: string | null, deleted: boolean, transportation: { __typename?: 'Transportation', id: string, type: TransportationType, departure_location: string, departure_time?: any | null, arrival_location: string, arrival_time?: any | null, details: string, order: number, departureCoords?: { __typename?: 'Coords', lat: number, lng: number } | null, arrivalCoords?: { __typename?: 'Coords', lat: number, lng: number } | null } } };

export const PlacesFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"place_name"}},{"kind":"Field","name":{"kind":"Name","value":"mapbox_id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}}]} as unknown as DocumentNode<PlacesFullFragment, unknown>;
export const TransportationFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departure_location"}},{"kind":"Field","name":{"kind":"Name","value":"departure_time"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_location"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]} as unknown as DocumentNode<TransportationFullFragment, unknown>;
export const UserSnippetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<UserSnippetFragment, unknown>;
export const AuthorOnTripSnippetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<AuthorOnTripSnippetFragment, unknown>;
export const TripFullFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tripFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]} as unknown as DocumentNode<TripFullFragment, unknown>;
export const AddTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TransportationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeId"}}},{"kind":"Argument","name":{"kind":"Name","value":"transportation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departure_location"}},{"kind":"Field","name":{"kind":"Name","value":"departure_time"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_location"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]} as unknown as DocumentNode<AddTransportationMutation, AddTransportationMutationVariables>;
export const UpdateTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateTransportationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"transportation"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transportation"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departure_location"}},{"kind":"Field","name":{"kind":"Name","value":"departure_time"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_location"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]} as unknown as DocumentNode<UpdateTransportationMutation, UpdateTransportationMutationVariables>;
export const DeleteTransportationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteTransportation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteTransportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteTransportationMutation, DeleteTransportationMutationVariables>;
export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
export const GetLocationSuggestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getLocationSuggestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getLocationSuggestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"center"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}}]}}]}}]} as unknown as DocumentNode<GetLocationSuggestionsQuery, GetLocationSuggestionsQueryVariables>;
export const PlacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"places"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"places"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tripId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tripId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"placesFull"}},{"kind":"Field","name":{"kind":"Name","value":"transportation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"placesFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Place"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"place_name"}},{"kind":"Field","name":{"kind":"Name","value":"mapbox_id"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"colour"}},{"kind":"Field","name":{"kind":"Name","value":"center"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departure_location"}},{"kind":"Field","name":{"kind":"Name","value":"departure_time"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_location"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]} as unknown as DocumentNode<PlacesQuery, PlacesQueryVariables>;
export const RouteSegmentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"routeSegments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"segmentWaypoints"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputCoords"}}}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"routeSegments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"segmentWaypoints"},"value":{"kind":"Variable","name":{"kind":"Name","value":"segmentWaypoints"}}}]}]}}]} as unknown as DocumentNode<RouteSegmentsQuery, RouteSegmentsQueryVariables>;
export const TripsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Trips"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"trips"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"tripFull"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"userSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"authorOnTripSnippet"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorsOnTrips"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"userSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"tripFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Trip"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"authors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"authorOnTripSnippet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"banner"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}}]} as unknown as DocumentNode<TripsQuery, TripsQueryVariables>;
export const SubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"Subscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"placeIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transportation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"placeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"placeIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"transportation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"transportationFull"}}]}},{"kind":"Field","name":{"kind":"Name","value":"placeId"}},{"kind":"Field","name":{"kind":"Name","value":"deleted"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"transportationFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Transportation"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"departure_location"}},{"kind":"Field","name":{"kind":"Name","value":"departure_time"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_location"}},{"kind":"Field","name":{"kind":"Name","value":"arrival_time"}},{"kind":"Field","name":{"kind":"Name","value":"details"}},{"kind":"Field","name":{"kind":"Name","value":"departureCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"arrivalCoords"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}}]}},{"kind":"Field","name":{"kind":"Name","value":"order"}}]}}]} as unknown as DocumentNode<SubscriptionSubscription, SubscriptionSubscriptionVariables>;
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
  deletePlace: Scalars['ID'];
  deleteTransportation: Scalars['ID'];
  deleteTrip: Scalars['Boolean'];
  token: Scalars['Boolean'];
  updateActivity: Activity;
  updateDayPlan: DayPlan;
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


export type MutationDeletePlaceArgs = {
  placeId: Scalars['ID'];
};


export type MutationDeleteTransportationArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTripArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateActivityArgs = {
  id: Scalars['ID'];
  updateActivityInput: UpdateActivityInput;
};


export type MutationUpdateDayPlanArgs = {
  id: Scalars['ID'];
  updateDayPlan: UpdateDayPlanInput;
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

export type Place = {
  __typename?: 'Place';
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  dayPlans: Array<DayPlan>;
  endDate?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: Maybe<Scalars['DateTime']>;
  text: Scalars['String'];
  transportation: Array<Transportation>;
};

export type PlaceDates = {
  __typename?: 'PlaceDates';
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type PlaceInput = {
  center: Array<Scalars['Float']>;
  colour: Scalars['String'];
  country: Scalars['String'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  mapbox_id: Scalars['String'];
  place_name: Scalars['String'];
  startDate?: InputMaybe<Scalars['DateTime']>;
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  dayPlan: DayPlan;
  dayPlans: Array<DayPlan>;
  getLocationSuggestions: Array<LocationSuggestion>;
  place: Place;
  places: Array<Place>;
  routeSegments: Array<Array<Array<Scalars['Float']>>>;
  transportation: Array<Transportation>;
  trip: Trip;
  trips: TripConnection;
  user: User;
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


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
};


export type QueryRouteSegmentsArgs = {
  segmentWaypoints: Array<Array<InputCoords>>;
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

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']>;
  transportation: TransportationNotification;
};


export type SubscriptionTransportationArgs = {
  placeIds: Array<Scalars['ID']>;
};

export type Transportation = {
  __typename?: 'Transportation';
  arrivalCoords?: Maybe<Coords>;
  arrival_location: Scalars['String'];
  arrival_time?: Maybe<Scalars['DateTime']>;
  departureCoords?: Maybe<Coords>;
  departure_location: Scalars['String'];
  departure_time?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  order: Scalars['Int'];
  type: TransportationType;
};

export type TransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrival_location: Scalars['String'];
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departure_location: Scalars['String'];
  departure_time?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
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
  mapbox_id?: InputMaybe<Scalars['String']>;
  place_name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  text?: InputMaybe<Scalars['String']>;
};

export type UpdateTransportationInput = {
  arrivalCoords?: InputMaybe<InputCoords>;
  arrival_location?: InputMaybe<Scalars['String']>;
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departureCoords?: InputMaybe<InputCoords>;
  departure_location?: InputMaybe<Scalars['String']>;
  departure_time?: InputMaybe<Scalars['DateTime']>;
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
