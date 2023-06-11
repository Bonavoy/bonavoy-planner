'use client';

import { useQuery } from '@apollo/client';

//components
import Notes from '~/components/Notes';
import Planner from '~/layouts/Planner';

//queries
import { GET_PLANNER_DETAILS } from '~/graphql/queries/planner';

//types
import { GetServerSidePropsContext } from 'next';

export default function NotesPage({ params }: { params: { tripId: string } }) {
  //TODO: THIS PULLS PLACES ALSO, SO WE CAN PROBABLY TEMOVE THE PLACES QUERY ABOVE
  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
    variables: { tripId: params.tripId },
  });

  return (
    <div className="flex w-full justify-center">
      <div className="mx-auto sm:container ">
        <Notes />
      </div>
    </div>
  );
}
