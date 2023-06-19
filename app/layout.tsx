import '~/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Metadata } from 'next';
import { Montserrat, Rubik } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import ApolloWrapper from '~/components/ApolloWrapper';

config.autoAddCss = false;

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

export const metadata: Metadata = {
  title: 'Bonavoy',
  description: 'Welcome to Bonavoy',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className} ${rubik.className}`}>
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
        <div id="modal-root" />
      </body>
    </html>
  );
}
