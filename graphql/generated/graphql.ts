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

export type LocationContext = {
  __typename?: 'LocationContext';
  id: Scalars['String'];
  short_code?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: Maybe<Scalars['String']>;
};

export type LocationSuggestion = {
  __typename?: 'LocationSuggestion';
  center: Array<Maybe<Scalars['Float']>>;
  context: Array<Maybe<LocationContext>>;
  id: Scalars['ID'];
  place_name: Scalars['String'];
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
  deleteTransportation: Transportation;
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
  transportation: TransportationInput;
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
  country: Array<InputMaybe<Scalars['String']>>;
  proximity: Array<InputMaybe<Scalars['String']>>;
  query: Scalars['String'];
  types: Array<InputMaybe<Scalars['String']>>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
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
};

export type Transportation = {
  __typename?: 'Transportation';
  arrival_location: Scalars['String'];
  arrival_time?: Maybe<Scalars['DateTime']>;
  departure_location: Scalars['String'];
  departure_time?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  type: TransportationType;
};

export type TransportationInput = {
  arrival_location: Scalars['String'];
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departure_location: Scalars['String'];
  departure_time?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
  type: TransportationType;
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


export const GetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"getToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]} as unknown as DocumentNode<GetTokenMutation, GetTokenMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const AuthenticateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"authenticate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}]}}]} as unknown as DocumentNode<AuthenticateMutation, AuthenticateMutationVariables>;
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

export type LocationContext = {
  __typename?: 'LocationContext';
  id: Scalars['String'];
  short_code?: Maybe<Scalars['String']>;
  text: Scalars['String'];
  wikidata?: Maybe<Scalars['String']>;
};

export type LocationSuggestion = {
  __typename?: 'LocationSuggestion';
  center: Array<Maybe<Scalars['Float']>>;
  context: Array<Maybe<LocationContext>>;
  id: Scalars['ID'];
  place_name: Scalars['String'];
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
  deleteTransportation: Transportation;
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
  transportation: TransportationInput;
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
  country: Array<InputMaybe<Scalars['String']>>;
  proximity: Array<InputMaybe<Scalars['String']>>;
  query: Scalars['String'];
  types: Array<InputMaybe<Scalars['String']>>;
};


export type QueryPlaceArgs = {
  id: Scalars['ID'];
};


export type QueryPlacesArgs = {
  tripId: Scalars['ID'];
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
};

export type Transportation = {
  __typename?: 'Transportation';
  arrival_location: Scalars['String'];
  arrival_time?: Maybe<Scalars['DateTime']>;
  departure_location: Scalars['String'];
  departure_time?: Maybe<Scalars['DateTime']>;
  details: Scalars['String'];
  id: Scalars['ID'];
  type: TransportationType;
};

export type TransportationInput = {
  arrival_location: Scalars['String'];
  arrival_time?: InputMaybe<Scalars['DateTime']>;
  departure_location: Scalars['String'];
  departure_time?: InputMaybe<Scalars['DateTime']>;
  details: Scalars['String'];
  type: TransportationType;
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
