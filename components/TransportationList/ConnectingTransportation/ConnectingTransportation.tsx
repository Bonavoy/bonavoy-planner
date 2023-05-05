import { ReactNode } from 'react';
import { TransportationFullFragment } from '~/graphql/generated/graphql';
import TransportationListItem from '../TransportationListItem.tsx/TransportationListItem';

interface ConnectingTransportationProps {
  connectingTransportation: TransportationFullFragment[];

  tripId: string;
}

const ConnectingTransportation = ({
  tripId,
  connectingTransportation,
}: ConnectingTransportationProps) => {
  if (connectingTransportation.length === 0) return null;
  return (
    <ul className="rounded-md shadow-centered">
      {connectingTransportation.map((transportation) => (
        <li className="border-b border-gray-100 last:border-b-0">
          <TransportationListItem
            tripId={tripId}
            transportationId={transportation.id}
            transport={transportation}
          />
        </li>
      ))}
    </ul>
  );
};

export default ConnectingTransportation;
