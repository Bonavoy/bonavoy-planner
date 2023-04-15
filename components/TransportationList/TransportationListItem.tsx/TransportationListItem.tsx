import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { cloneDeep } from '@apollo/client/utilities';

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

const transportationOptions: DropDownItem[] = [
  {
    val: TransportationType.Plane,
    view: (
      <div className="flex items-center justify-between gap-2">
        <i className="fa-solid fa-plane"></i>
      </div>
    ),
  },
  {
    val: TransportationType.Car,
    view: (
      <div className="flex items-center justify-between gap-2">
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
      for (let place of newPlaces.places) {
        place.transportation = place.transportation.filter((transportation) => {
          if (transportation.id !== transportationId) {
            return true;
          }
          deleted = true;
          return false;
        });
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
    <div className="pb-2">
      <div className="flex cursor-pointer gap-2 rounded-xl border border-grayTertiary px-3 pt-3 duration-200 hover:shadow-lg">
        <div className="flex w-fit flex-col items-center">
          <DropDownSelect
            placeholder="travel options"
            onSelect={(selection: DropDownItem) => {
              updateTransportation({ type: selection.val });
            }}
            options={transportationOptions}
            value={
              transportationOptions.find(
                (transportation) => transportation.val === transport.type,
              )!
            }
          />
        </div>
        <div className="flex-1">
          <div className="pb-2">
            <div className="flex items-center gap-2 rounded-lg bg-surface px-2">
              <LocationSearch
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
                className="flex items-center justify-end gap-1 py-1 text-sm duration-150 hover:text-grayPrimary"
                onClick={() => {
                  setShowDepartureDatePicker(true);
                }}
              >
                <span>{formatDatetime(transport.departureTime)}</span>
                <i className="fa fa-calendar cursor" aria-hidden="true"></i>
              </button>

              {showDepartureDatePicker && (
                <Modal>
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
              )}
            </div>
          </div>

          <div className="pb-2">
            <div className="flex items-center gap-2 rounded-lg bg-surface px-2">
              <LocationSearch
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
                className="flex items-center justify-end gap-1 py-1 text-sm duration-150 hover:text-grayPrimary"
                onClick={() => {
                  setShowArrivalDatepicker(true);
                }}
              >
                <span>{formatDatetime(transport.arrivalTime)}</span>
                <i className="fa fa-calendar cursor" aria-hidden="true"></i>
              </button>

              {showArrivalDatepicker && (
                <Modal>
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
              )}
            </div>
          </div>

          {showDetails ? (
            <textarea
              className="w-full rounded-lg pb-1 text-sm text-grayPrimary outline-none"
              placeholder="details..."
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              rows={2}
            />
          ) : null}
          <div className="text-md flex w-full items-center justify-between gap-4 bg-transparent pb-2">
            <div className="flex gap-3">
              <button
                className="text-xs font-medium text-grayPrimary duration-100 hover:text-grayPrimary/50"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? 'Hide details' : 'Show details'}
              </button>
              <button className="text-grayPrimary duration-100 hover:text-grayPrimary/50">
                <i className="fa-solid fa-paperclip "></i>
              </button>
            </div>
            <div className="relative">
              <button
                className="h-6 w-6 rounded-full text-grayPrimary duration-100 hover:bg-surface hover:text-white"
                onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              >
                <i className="fa-solid fa-ellipsis relative" />
              </button>
              {showOptionsMenu && (
                <ul className="absolute top-full rounded-lg border border-surface bg-white text-xs shadow-md">
                  <li
                    className="rounded-lg px-2 py-1 text-red hover:bg-surface"
                    onClick={() => {
                      console.log(transportationId);
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
    </div>
  );
};

export default TransportationListItem;
