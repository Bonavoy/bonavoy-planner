import { GetServerSidePropsContext } from 'next';
import Notes from '~/components/Notes';
import Planner from '~/layouts/Planner';

interface NotesPageProps {
  tripId: string;
}

const NotesPage = ({ tripId }: NotesPageProps) => {
  return (
    <main className="h-screen">
      <Planner mode="notes" tripId={tripId} placeId={null}>
        <div className="flex justify-center w-full">
          <div className='sm:container mx-auto '>
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
