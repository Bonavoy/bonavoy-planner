import { Metadata } from 'next';
import '~/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Montserrat, Rubik } from 'next/font/google';
import { ApolloWrapper } from '~/graphql/apollo-wrapper';

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
  title: 'Home',
  description: 'Welcome to Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.className} ${rubik.className}`}>
      <ApolloWrapper>
      <body>{children}</body>
      </ApolloWrapper>
    </html>
  );
}
