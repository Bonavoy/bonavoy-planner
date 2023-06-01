import { useQuery } from '@apollo/client';

//components
import Notes from '~/components/Notes';
import Planner from '~/layouts/Planner';

//queries
import { GET_PLANNER_DETAILS } from '~/graphql/queries/planner';

//types
import { GetServerSidePropsContext } from 'next';
interface NotesPageProps {
  tripId: string;
}

const NotesPage = ({ tripId }: NotesPageProps) => {
  //TODO: THIS PULLS PLACES ALSO, SO WE CAN PROBABLY TEMOVE THE PLACES QUERY ABOVE
  const plannerDetailsQuery = useQuery(GET_PLANNER_DETAILS, {
    variables: { tripId },
  });

  return (
    <main className="h-screen">
      <Planner
        mode="notes"
        tripId={tripId}
        placeId={null}
        details={plannerDetailsQuery.data?.plannerDetails!}
      >
        <div className="flex w-full justify-center">
          <div className="mx-auto sm:container ">
            <Notes />
          </div>
        </div>
      </Planner>
    </main>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      tripId: context.params?.tripId,
      placeId: context.query?.placeId ?? null,
    },
  };
}

export default NotesPage;
