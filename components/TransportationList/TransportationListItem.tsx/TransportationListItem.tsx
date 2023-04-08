import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';

import {
  TransportationFullFragment,
  TransportationType,
} from '~/graphql/generated/graphql';
import DropDownSelect from '~/components/DropDownSelect';
import type { DropDownItem } from '~/components/DropDownSelect';
import { UPDATE_TRANSPORTATION } from '~/graphql/mutations/transportation';
import LocationSearch from '../LocationSearch';
import Datepicker from '~/components/Datepicker/Datepicker';
import Modal from '~/components/Modal/Modal';

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
  arrival_location?: string;
  arrival_time?: Date;
  departure_location?: string;
  departure_time?: Date;
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
}

const TransportationListItem = ({
  transportationId,
  transport,
}: TransportationListItemProps) => {
  const [showDepartureDatePicker, setShowDepartureDatePicker] = useState(false);
  const [showArrivalDatepicker, setShowArrivalDatepicker] = useState(false);
  const [departureLocation, setDepartureLocation] = useState(
    transport.departure_location,
  );
  const [arrivalLocation, setArrivalLocation] = useState(
    transport.arrival_location,
  );
  const [details, setDetails] = useState(transport.details);
  const [type, setType] = useState<TransportationType>(transport.type);
  const [updateTransportationMutation] = useMutation(UPDATE_TRANSPORTATION);

  const updateTransportation = (transportation: UpdateTransportationInput) => {
    updateTransportationMutation({
      variables: {
        id: transportationId,
        transportation,
      },
    });
  };

  const formatDatetime = (date?: string): string =>
    date ? format(new Date(date), 'MMM d h:mm a') : '';

  return (
    <div className="pb-2">
      <div className="flex cursor-pointer gap-2 rounded-xl border border-grayTertiary p-3 duration-200 hover:shadow-lg">
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
                    departure_location: location,
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
                <span>{formatDatetime(transport.departure_time)}</span>
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
                            updateTransportation({ departure_time: date });
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
                    arrival_location: location,
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
                <span>{formatDatetime(transport.arrival_time)}</span>
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
                            updateTransportation({ arrival_time: date });
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

          {transport.details?.length ? (
            <textarea
              className="w-full rounded-lg pb-1 text-sm text-grayPrimary outline-none"
              placeholder="details..."
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              rows={2}
            />
          ) : null}
          <div className="text-md flex w-full items-center justify-between gap-4 bg-transparent">
            <div className="flex gap-3">
              <button className="text-grayPrimary duration-100 hover:text-grayPrimary/50">
                <i className="fa-solid fa-paperclip "></i>
              </button>
              {transport.details?.length ? (
                <button className="text-xs font-medium text-grayPrimary duration-100 hover:text-grayPrimary/50">
                  remove details
                </button>
              ) : (
                <button className="text-xs font-medium text-grayPrimary duration-100 hover:text-grayPrimary/50">
                  + add details
                </button>
              )}
            </div>
            <button className="h-6 w-6 rounded-full text-grayPrimary duration-100 hover:bg-surface hover:text-white">
              <i className="fa-solid fa-ellipsis" />
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
                          updateTransportation({ departure_time: date });
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
      </div>
    </div>
  );
};

export default TransportationListItem;
