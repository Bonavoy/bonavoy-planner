import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import DropDownSelect from '~/components/DropDownSelect';
import type { DropDownItem } from '~/components/DropDownSelect';
import {
  DELETE_TRANSPORTATION,
  UPDATE_TRANSPORTATION,
} from '~/graphql/mutations/transportation';
import LocationSearch from '../LocationSearch';
import Datepicker from '~/components/Datepicker/Datepicker';
import Modal from '~/components/Modal/Modal';
import { GET_PLACES } from '~/graphql/queries/place';
import cloneDeep from 'lodash.clonedeep';

const transportationOptions: DropDownItem[] = [
  {
    val: TransportationType.Plane,
    view: (
      <div className="flex items-center justify-between text-sm">
        <i className="fa-solid fa-plane"></i>
      </div>
    ),
  },
  {
    val: TransportationType.Car,
    view: (
      <div className="flex items-center justify-between text-sm">
        <i className="fa-solid fa-car"></i>
      </div>
    ),
  },
];

interface UpdateTransportationInput {
  arrivalLocation?: string;
  arrivalTime?: Date;
  departureLocation?: string;
  departureTime?: Date;
  details?: string;
  type?: TransportationType;
  arrivalCoords?: {
    lng: number;
    lat: number;
  };
  departureCoords?: {
    lng: number;
    lat: number;
  };
}

interface TransportationListItemProps {
  transportationId: string;
  transport: TransportationFullFragment;
  tripId: string;
}

const TransportationListItem = ({
  transportationId,
  transport,
  tripId,
}: TransportationListItemProps) => {
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatepicker, setShowArrivalDatepicker] = useState(false);
  const [departureLocation, setDepartureLocation] = useState(
    transport.departureLocation,
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    transport.arrivalLocation,
  );
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [details, setDetails] = useState(transport.details);
  const [showDetails, setShowDetails] = useState<boolean>(
    transport.details.length > 0,
  );
  const [type, setType] = useState<TransportationType>(transport.type);
  const [updateTransportationMutation] = useMutation(UPDATE_TRANSPORTATION, {
    // update: {},
    optimisticResponse: {
      __typename: 'Mutation',
      updateTransportation: {
        id: Math.random().toString(),
        type: type,
        departureLocation: departureLocation,
        arrivalLocation: arrivalLocation,
        details: details,
        order: transport.order,
        connectingId: transport.connectingId,
        connectingOrder: transport.connectingOrder,
      },
    },
  });

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

  const updateTransportation = (transportation: UpdateTransportationInput) => {
    updateTransportationMutation({
      variables: {
        id: transportationId,
        transportation,
      },
    });
  };

  // react to subscription data
  useEffect(() => {
    setArrivalLocation(transport.arrivalLocation);
  }, [transport.arrivalLocation]);

  // react to subscription data
  useEffect(() => {
    setDepartureLocation(transport.departureLocation);
  }, [transport.departureLocation]);

  const formatDatetime = (date?: string): string =>
    date ? format(new Date(date), 'MMM d h:mm a') : '';

  return (
    <>
      <div className="grid cursor-pointer grid-cols-[auto_3fr_auto] gap-1 p-3 duration-150">
        <div className="h-6 w-6">
          <DropDownSelect
            placeholder="travel options"
            onSelect={(selection: DropDownItem) => {
              updateTransportation({
                type: selection.val as TransportationType,
              });
            }}
            options={transportationOptions}
            value={
              transportationOptions.find(
                (transportation) => transportation.val === transport.type,
              )!
            }
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
          {transport.departureTime ? (
            <span>{formatDatetime(transport.departureTime)}</span>
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
          {transport.arrivalTime ? (
            <span>{formatDatetime(transport.arrivalTime)}</span>
          ) : null}
          <i className="fa fa-calendar cursor" aria-hidden="true"></i>
        </button>

        {showDetails ? (
          <textarea
            className="col-span-2 col-start-2 w-full rounded-md p-1 px-2 text-sm text-grayPrimary outline-none duration-150 placeholder:text-gray-100 hover:bg-surface hover:placeholder:text-gray-200"
            placeholder="anything more specific you wanna jot down..."
            onChange={(e) => setDetails(e.target.value)}
            value={details}
            rows={1}
          />
        ) : null}
        <div className="text-md col-span-2 col-start-2 flex w-full items-center justify-between gap-4 bg-transparent">
          <div className="flex gap-2">
            <button
              className="rounded-md px-2 text-xs text-grayPrimary duration-150 hover:bg-surface"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Hide details' : 'Show details'}
            </button>
            <button className="rounded-md px-1 text-grayPrimary duration-150 hover:bg-surface">
              <i className="fa-solid fa-paperclip "></i>
            </button>
          </div>
          <div className="relative">
            <button
              className="flex h-6 w-6 items-center justify-center rounded-md text-grayPrimary duration-150 hover:bg-surface"
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
                  updateTransportation({ departureTime: date });
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
                  updateTransportation({ arrivalTime: date });
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
