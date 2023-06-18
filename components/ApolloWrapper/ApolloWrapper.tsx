'use client';

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  SuspenseCache,
  from,
  split,
} from '@apollo/client';
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import httpLink from '~/graphql/apollo/httpLink';
import errorLink from '~/graphql/apollo/errorLink';

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

const client = new ApolloClient({
  link: from([splitLink]),
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

function makeClient() {
  return client;
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export default function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
      makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}
