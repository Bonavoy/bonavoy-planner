import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import cloneDeep from 'lodash.clonedeep';
import clsx from 'clsx';
import throttle from 'lodash.throttle';

import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import {
  DELETE_TRANSPORTATION,
  UPDATE_TRANSPORTATION,
} from '~/graphql/mutations/transportation';
import LocationSearch from '../LocationSearch';
import Datepicker from '~/components/Datepicker/Datepicker';
import Modal from '~/components/Modal/Modal';
import { GET_PLACES } from '~/graphql/queries/place';
import { TRANSPORTATION_FULL } from '~/graphql/fragments/transportation';
import Details from '../Details';
import ActiveElement from '~/components/ActiveElement/ActiveElement';

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
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatepicker, setShowArrivalDatepicker] = useState(false);
  const [departureLocation, setDepartureLocation] = useState(
    transportation.departureLocation,
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    transportation.arrivalLocation,
  );
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [details, setDetails] = useState(transportation.details);
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
    throttle(
      (details: string) => {
        updateTransportation({
          ...transportation,
          details,
        });
      },
      300,
      // { trailing: true },
    ),
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
        },
      },
    });
  };

  /** react to subscription data */
  useEffect(() => {
    setArrivalLocation(transportation.arrivalLocation);
  }, [transportation.arrivalLocation]);
  useEffect(() => {
    setDepartureLocation(transportation.departureLocation);
  }, [transportation.departureLocation]);
  useEffect(() => {
    setDetails(transportation.details);
  }, [transportation.details]);

  const formatDatetime = (date?: string): string =>
    date ? format(new Date(date), 'MMM d h:mm a') : '';

  return (
    <>
      <div className="group relative grid cursor-pointer grid-cols-[auto_3fr_auto] gap-1 p-3 duration-150">
        <div className="flex h-6 w-6 items-center justify-center">
          <i
            className={clsx('text-sm', {
              'fa-solid fa-plane':
                transportation.type === TransportationType.Plane,
              'fa-solid fa-car': transportation.type === TransportationType.Car,
            })}
          />
        </div>

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

        <button
          className="flex items-center justify-end gap-2 place-self-stretch rounded-md px-2 text-sm duration-150 hover:bg-surface"
          onClick={() => {
            setShowDepartureDatePicker(true);
          }}
        >
          {transportation.departureTime ? (
            <span>{formatDatetime(transportation.departureTime)}</span>
          ) : null}
          <i className="fa fa-calendar cursor" aria-hidden="true"></i>
        </button>

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

        <button
          className="flex items-center justify-end gap-2 place-self-stretch rounded-md px-2 text-sm duration-150 hover:bg-surface"
          onClick={() => {
            setShowArrivalDatepicker(true);
          }}
        >
          {transportation.arrivalTime ? (
            <span>{formatDatetime(transportation.arrivalTime)}</span>
          ) : null}
          <i className="fa fa-calendar cursor" aria-hidden="true"></i>
        </button>

        {showDetails ? (
          <ActiveElement
            className="col-span-2 col-start-2 "
            elementId="a"
            onActive={(active: boolean) => {}}
          >
            <Details
              placeholder="anything more specific you wanna jot down..."
              transportationId={transportationId}
              tripId={tripId}
              onChange={(val) => {
                setDetails(val);
                saveDetails(val);
              }}
              value={details}
            />
          </ActiveElement>
        ) : null}
        <div className="text-md col-span-2 col-start-2 flex w-full items-center justify-between gap-4 bg-transparent">
          <div className="flex gap-2">
            <button
              className="rounded-md px-2 text-xs text-black duration-150 hover:bg-surface"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            <button className="rounded-md px-1 text-black duration-150 hover:bg-surface">
              <i className="fa-solid fa-paperclip "></i>
            </button>
          </div>
          <div className="relative">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md text-black duration-150 hover:bg-surface"
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
            >
              <i className="fa-solid fa-ellipsis relative" />
            </button>
            {showOptionsMenu && (
              <ul className="absolute top-full rounded-sm border border-surface bg-white text-xs shadow-md">
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

      <Modal show={showDepartureDatePicker}>
        {/* modal bg */}
        <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center bg-black bg-opacity-70">
          {/* content */}
          <div className="pt-24">
            <div className="flex justify-end rounded-t-xl bg-white">
              <button
                className="right-0 p-3"
                onClick={() => setShowDepartureDatePicker(false)}
              >
                close
              </button>
            </div>
            <div className="rounded-b-xl bg-white px-3 pb-3">
              <Datepicker
                onSelect={(date) => {
                  updateTransportation({
                    ...transportation,
                    departureTime: date.toISOString(),
                  });
                  setShowDepartureDatePicker(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={showArrivalDatepicker}>
        {/* modal bg */}
        <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center bg-black bg-opacity-70">
          {/* content */}
          <div className="pt-24">
            <div className="flex justify-end rounded-t-xl bg-white">
              <button
                className="right-0 p-3"
                onClick={() => setShowArrivalDatepicker(false)}
              >
                close
              </button>
            </div>
            <div className="rounded-b-xl bg-white px-3 pb-3">
              <Datepicker
                onSelect={(date) => {
                  updateTransportation({
                    ...transportation,
                    arrivalTime: date.toISOString(),
                  });
                  setShowArrivalDatepicker(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransportationListItem;
