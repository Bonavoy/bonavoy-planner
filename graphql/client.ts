import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import errorLink from './apollo/errorLink';
import httpLink from './apollo/httpLink';

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
  uri: process.env.NEXT_PUBLIC_BONAVOY_GRAPHQL_API,
});

export default client;
