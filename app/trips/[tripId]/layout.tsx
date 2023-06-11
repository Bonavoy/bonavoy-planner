'use client';

import { useQuery } from '@apollo/client';
import { usePathname } from 'next/navigation';
import Header from '~/components/Header';
import type { HeaderProps } from '~/components/Header/Header';
import { GET_PLANNER_DETAILS } from '~/graphql/queries/planner';

export default function MapPlannerLayout({
  params,
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
  params: any;
}) {
  const pathname = usePathname();
  const getMode = (path: string) => {
    const pathComponents = pathname.split('/');
    if (pathComponents[pathComponents.length - 1] === '/') {
      pathComponents.pop();
    }
    return pathComponents[pathComponents.length - 1] as HeaderProps['mode'];
  };

  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
    variables: { tripId: params.tripId },
  });

  return (
    <main className="h-screen">
      <div className="flex h-full flex-col font-sans">
        <Header
          mode={getMode(pathname)}
          tripId={params.tripId}
          details={plannerDetailsQuery.data?.plannerDetails!}
        />
        {/* put map here too */}
        {children}
      </div>
    </main>
  );
}
