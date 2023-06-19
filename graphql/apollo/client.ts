import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { ApolloClient, from, split } from '@apollo/client';
import { NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr';

import httpLink from './httpLink';
import errorLink from './errorLink';

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_BONAVOY_GRAPHQL_WS_URL!,
  }),
);

const splitLink =
  wsLink != null
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

export const client = new ApolloClient({
  link: from([errorLink, splitLink]),
  cache: new NextSSRInMemoryCache({
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
