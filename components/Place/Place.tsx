import { useQuery } from '@apollo/client';

//queries
import { GET_PLACE } from '~/graphql/queries/place';

interface PlaceProps {
  placeId: string;
}

export default function Place({ placeId }: PlaceProps) {
  const placeDetailsQuery = useQuery(GET_PLACE, {
    variables: { placeId },
  });

  return (
    <section className="overflow-y-auto">
      <div className="h-full overflow-y-auto px-16 py-8">
        {placeDetailsQuery.data?.place.placeName}
      </div>
    </section>
  );
}
