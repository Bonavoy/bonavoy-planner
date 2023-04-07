import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BONAVOY_GRAPHQL_API,
  credentials: 'include',
});

export default httpLink;
