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
          url: `wss://${process.env.NEXT_PUBLIC_BONAVOY_API_HOSTNAME}/graphql`,
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
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
  uri: `https://${process.env.NEXT_PUBLIC_BONAVOY_API_HOSTNAME}/graphql`,
});

export default client;
