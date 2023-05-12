import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import TransportationListItem from '../TransportationListItem.tsx/TransportationListItem';

interface ConnectingTransportationProps {
  connectingTransportation: TransportationFullFragment[];
  addConnectingTransportation: (
    uuid: string,
    order: number,
    connectingOrder: number,
    type: TransportationType,
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
          className="group border-b border-gray-100 last:border-b-0"
          key={transportation.id}
        >
          <TransportationListItem
            tripId={tripId}
            transportationId={transportation.id}
            transportation={transportation}
          />
          <div className="absolute -bottom-2 hidden w-full justify-center group-hover:flex">
            <button
              className="rounded-sm border-gray-100 bg-white px-1 text-xs text-gray-500 shadow-centered duration-100 hover:bg-surface"
              onClick={() =>
                addConnectingTransportation(
                  transportation.connectingId,
                  order,
                  connectingTransportation.length,
                  transportation.type,
                )
              }
            >
              Add connecting{' '}
              {transportation.type === TransportationType.Car
                ? 'car ride'
                : 'flight'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ConnectingTransportation;
