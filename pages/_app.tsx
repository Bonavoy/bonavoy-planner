import '~/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import type { AppProps } from 'next/app';

//apollo
import { ApolloProvider } from '@apollo/client';
import client from '~/graphql/client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
