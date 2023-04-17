import apolloClient from '../client';

import { fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { REFRESH_TOKEN } from '~/graphql/mutations/user';

let isRefreshing = false;
let pendingRequests: Function[] = [];

const setIsRefreshing = (value: boolean) => (isRefreshing = value);

const addPendingRequest = (pendingRequest: Function) => {
  pendingRequests.push(pendingRequest);
};

const resolvePendingRequests = () => {
  pendingRequests.map((callback) => callback());
  pendingRequests = [];
};

const getNewToken = async () => {
  return await apolloClient.mutate({ mutation: REFRESH_TOKEN });
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case 'TOKEN_EXPIRED':
          if (!isRefreshing) {
            setIsRefreshing(true);

            //TODO: TWEAK IF ERROR IN AUTH
            return fromPromise(
              getNewToken().catch(() => {
                resolvePendingRequests();
                setIsRefreshing(false);

                return forward(operation);
              }),
            ).flatMap(() => {
              resolvePendingRequests();
              setIsRefreshing(false);

              return forward(operation);
            });
          } else {
            return fromPromise(
              new Promise((resolve) => addPendingRequest(() => resolve(true))),
            ).flatMap(() => forward(operation));
          }
      }
    }
  }
});

export default errorLink;
