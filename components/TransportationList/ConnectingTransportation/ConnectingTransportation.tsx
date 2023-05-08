import { TransportationFullFragment } from '~/graphql/generated/graphql';
import TransportationListItem from '../TransportationListItem.tsx/TransportationListItem';

interface ConnectingTransportationProps {
  connectingTransportation: TransportationFullFragment[];
  addConnectingTransportation: (
    uuid: string,
    order: number,
    connectingOrder: number,
  ) => void;
  tripId: string;
  order: number;
}

const ConnectingTransportation = ({
  tripId,
  connectingTransportation,
  addConnectingTransportation,
  order,
}: ConnectingTransportationProps) => {
  if (connectingTransportation.length === 0) return null;
  return (
    <ul className=" relative rounded-md shadow-centered">
      {connectingTransportation.map((transportation) => (
        <li
          className="border-b border-gray-100 last:border-b-0"
          key={transportation.id}
        >
          <TransportationListItem
            tripId={tripId}
            transportationId={transportation.id}
            transport={transportation}
            connectingOrder={connectingTransportation.length}
            addConnectingTransportation={() =>
              addConnectingTransportation(
                transportation.connectingId,
                order,
                connectingTransportation.length,
              )
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ConnectingTransportation;
