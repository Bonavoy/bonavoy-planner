import { ApolloClient, InMemoryCache, from, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import httpLink from './apollo/httpLink';
import errorLink from './apollo/errorLink';

// check that we are in browser
const wsLink =
  typeof window !== 'undefined'
    ? new GraphQLWsLink(
        createClient({
          url: process.env.NEXT_PUBLIC_BONAVOY_GRAPHQL_WS_URL!,
        }),
      )
    : null;

const splitLink =
  typeof window !== 'undefined' && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      )
    : httpLink;

const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    possibleTypes: {
      Invite: ['AuthorsOnTrips', 'PendingInvite'],
    },
  }),
  defaultOptions: {
    query: { errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
  uri: process.env.NEXT_PUBLIC_BONAVOY_GRAPHQL_API!,
});

export default client;
