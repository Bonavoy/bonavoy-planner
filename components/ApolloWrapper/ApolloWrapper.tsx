'use client';

import { SuspenseCache } from '@apollo/client';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support/ssr';
import { client } from '~/graphql/apollo/client';

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
