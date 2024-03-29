import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import cloneDeep from 'lodash.clonedeep';
import clsx from 'clsx';
import throttle from 'lodash.throttle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import {
  DELETE_TRANSPORTATION,
  UPDATE_TRANSPORTATION,
} from '~/graphql/mutations/transportation';
import LocationSearch from '../LocationSearch';
import { GET_PLACES } from '~/graphql/queries/place';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';
import Details from '../Details';
import SelectDateButton from '~/components/SelectDateButton/SelectDateButton';
import {
  faCar,
  faEllipsis,
  faPaperclip,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';

const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MIN = 60;

interface TransportationListItemProps {
  transportationId: string;
  transportation: TransportationFullFragment;
  tripId: string;
}

const TransportationListItem = ({
  transportationId,
  transportation,
  tripId,
}: TransportationListItemProps) => {
  const [departureLocation, setDepartureLocation] = useState(
    transportation.departureLocation,
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    transportation.arrivalLocation,
  );
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(
    transportation.details.length > 0,
  );

  const [updateTransportationMutation] = useMutation(UPDATE_TRANSPORTATION);

  const [deleteTransportationMutation] = useMutation(DELETE_TRANSPORTATION, {
    update: (cache, { data }) => {
      const transportationId = data?.deleteTransportation;
      if (!transportationId) return;
      const placesQuery = cache.readQuery({
        query: GET_PLACES,
        variables: { tripId },
      });

      const newPlaces = cloneDeep(placesQuery);

      if (newPlaces === null) return;

      let deleted = false; // TODO: early stop optimization

      for (const place of newPlaces.places) {
        if (deleted) break;
        for (const idx in place.transportation) {
          place.transportation[idx] = place.transportation[idx].filter(
            (transportation) => {
              if (transportation.id !== transportationId) {
                return true;
              }
              deleted = true;
              return false;
            },
          );
        }
        // remove empty connecting transportation arrays
        for (const place of newPlaces.places) {
          place.transportation = place.transportation.filter(
            (transportation) => transportation.length,
          );
        }
      }

      cache.writeQuery({ query: GET_PLACES, id: tripId, data: newPlaces });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      deleteTransportation: transportationId,
    },
  });

  const saveDetails = useCallback(
    throttle((details: string) => {
      updateTransportation({
        ...transportation,
        details,
      });
    }, 300),
    [],
  );

  const updateTransportation = (
    updatedTransportation: TransportationFullFragment,
  ) => {
    updateTransportationMutation({
      variables: {
        id: transportationId,
        transportation: {
          type: updatedTransportation.type,
          departureLocation: updatedTransportation.departureLocation,
          departureTime: updatedTransportation.departureTime,
          arrivalLocation: updatedTransportation.arrivalLocation,
          arrivalTime: updatedTransportation.arrivalTime,
          details: updatedTransportation.details,
          arrivalCoords: updatedTransportation.arrivalCoords
            ? {
                lat: updatedTransportation.arrivalCoords.lat,
                lng: updatedTransportation.arrivalCoords.lng,
              }
            : null,
          departureCoords: updatedTransportation.departureCoords
            ? {
                lat: updatedTransportation.departureCoords.lat,
                lng: updatedTransportation.departureCoords.lng,
              }
            : null,
        },
      },
      update: (cache, { data }) => {
        const updatedTransportation = data?.updateTransportation;
        if (!updatedTransportation) return;

        cache.writeFragment({
          id: `Transportation:${updatedTransportation.id}`,
          fragment: TRANSPORTATION_FULL,
          data: {
            __typename: 'Transportation',
            id: updatedTransportation.id,
            type: updatedTransportation.type,
            departureLocation: updatedTransportation.departureLocation,
            arrivalLocation: updatedTransportation.arrivalLocation,
            departureTime: updatedTransportation.departureTime,
            arrivalTime: updatedTransportation.arrivalTime,
            departureCoords: updatedTransportation.departureCoords,
            arrivalCoords: updatedTransportation.arrivalCoords,
            details: updatedTransportation.details,
            order: updatedTransportation.order,
            connectingId: updatedTransportation.connectingId,
            connectingOrder: updatedTransportation.connectingOrder,
            route: updatedTransportation.route,
          },
        });
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateTransportation: {
          __typename: 'Transportation',
          id: transportationId,
          type: updatedTransportation.type,
          departureLocation: updatedTransportation.departureLocation,
          arrivalLocation: updatedTransportation.arrivalLocation,
          details: updatedTransportation.details,
          order: updatedTransportation.order,
          connectingId: updatedTransportation.connectingId,
          connectingOrder: updatedTransportation.connectingOrder,
          departureTime: updatedTransportation.departureTime,
          arrivalTime: updatedTransportation.arrivalTime,
          departureCoords: updatedTransportation.departureCoords,
          arrivalCoords: updatedTransportation.arrivalCoords,
          route: null,
        },
      },
    });
  };

  const formatDuration = (seconds: number) => {
    return `${Math.floor(seconds / SECONDS_PER_HOUR)} hrs ${Math.floor(
      (seconds % SECONDS_PER_HOUR) / SECONDS_PER_MIN,
    )} min`;
  };

  /** react to subscription data */
  useEffect(() => {
    setArrivalLocation(transportation.arrivalLocation);
  }, [transportation.arrivalLocation]);
  useEffect(() => {
    setDepartureLocation(transportation.departureLocation);
  }, [transportation.departureLocation]);

  return (
    <div className="grid grid-cols-[64px_auto] gap-1 p-3">
      <div className="flex flex-col items-center justify-self-stretch text-center">
        <FontAwesomeIcon
          icon={
            transportation.type === TransportationType.Plane ? faPlane : faCar
          }
          className="place-self-center justify-self-center text-sm"
        />

        <div className="text-xs">
          {transportation.route?.duration
            ? formatDuration(transportation.route.duration)
            : null}
        </div>
      </div>
      <div className="group relative grid grow cursor-pointer grid-cols-[3fr_auto] gap-px duration-150">
        <LocationSearch
          type="departureLocation"
          tripId={tripId}
          transportationId={transportationId}
          placeholder="Departure Location"
          value={departureLocation}
          updateLocation={(location, coords) =>
            updateTransportation({
              ...transportation,
              departureLocation: location,
              departureCoords: coords,
            })
          }
        />
        <SelectDateButton
          transportationId={transportationId}
          tripId={tripId}
          elementId={`transport:${transportationId}:departureTime:button`}
          date={transportation.departureTime}
          onSelectDate={(date) => {
            updateTransportation({
              ...transportation,
              departureTime: date.toISOString(),
            });
          }}
        />

        <LocationSearch
          type="arrivalLocation"
          tripId={tripId}
          transportationId={transportationId}
          placeholder="Arrival Location"
          value={arrivalLocation}
          updateLocation={(location, coords) =>
            updateTransportation({
              ...transportation,
              arrivalLocation: location,
              arrivalCoords: coords,
            })
          }
        />
        <SelectDateButton
          transportationId={transportationId}
          tripId={tripId}
          elementId={`transport:${transportationId}:arrivalTime:button`}
          date={transportation.arrivalTime}
          onSelectDate={(date) => {
            updateTransportation({
              ...transportation,
              arrivalTime: date.toISOString(),
            });
          }}
        />

        {showDetails ? (
          <Details
            placeholder="anything more specific you wanna jot down..."
            transportationId={transportationId}
            tripId={tripId}
            onChange={(val) => {
              saveDetails(val);
            }}
            value={transportation.details}
          />
        ) : null}

        <div className="text-md col-span-2 flex w-full items-center justify-between gap-4 bg-transparent">
          <div className="flex gap-px">
            <button
              className="rounded-md px-2 text-xs text-black duration-150 hover:bg-surface"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>

            <button className="rounded-md px-1 text-black duration-150 hover:bg-surface">
              <FontAwesomeIcon icon={faPaperclip} />
            </button>
          </div>

          <div className="relative">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md text-black duration-150 hover:bg-surface"
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            >
              <FontAwesomeIcon icon={faEllipsis} className="relative" />
            </button>
            {showOptionsMenu && (
              <ul className="absolute top-full z-10 rounded-sm border border-surface bg-white text-xs shadow-md">
                <li
                  className="rounded-inherit px-2 py-1 text-red hover:bg-surface"
                  onClick={() => {
                    deleteTransportationMutation({
                      variables: { id: transportationId },
                    });
                  }}
                >
                  Delete
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportationListItem;
