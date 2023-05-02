import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useContext, useEffect, useRef, useState } from 'react';
import { GET_LOCATION_SUGGESTIONS } from '~/graphql/queries/locations';
import { ActiveElementsContext } from '~/components/ActiveElementsProvider';
import { UPDATE_ACTIVE_ELEMENT } from '~/graphql/mutations/planner';
import { GET_USER } from '~/graphql/queries/user';
import clsx from 'clsx';
import Image from 'next/image';

type locationType = 'departureLocation' | 'arrivalLocation';

interface LocationSearchProps {
  value: string;
  type: locationType;
  updateLocation: (
    location: string,
    coords?: { lat: number; lng: number },
  ) => void;
  placeholder: string;
  tripId: string;
  transportationId: string;
}

const LocationSearch = ({
  value,
  updateLocation,
  placeholder,
  type,
  tripId,
  transportationId,
}: LocationSearchProps) => {
  const elementId = `transport:${transportationId}:${type}:input`;
  const [location, setLocation] = useState(value);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [getLocationSuggestionsQuery, { data }] = useLazyQuery(
    GET_LOCATION_SUGGESTIONS,
  );

  const getUserQuery = useQuery(GET_USER);

  const [updateActiveElementMutation] = useMutation(UPDATE_ACTIVE_ELEMENT);

  const activeElements = useContext(ActiveElementsContext);

  useEffect(() => {
    // react to new subscription data
    setLocation(value);
  }, [value]);

  useEffect(() => {
    if (!focused) return;
    getLocationSuggestionsQuery({ variables: { query: location } });
  }, [location, focused, getLocationSuggestionsQuery]);

  const updateActiveElement = (active: boolean) => {
    updateActiveElementMutation({
      variables: {
        tripId,
        activeElement: {
          active,
          elementId,
          userId: getUserQuery.data?.user.id ?? '',
        },
      },
    });
  };

  return (
    <div
      className={clsx(
        'relative col-start-2 box-content flex flex-1 items-center gap-2 rounded-md border-2 px-2 duration-150 hover:bg-surface',
        { 'border-primary': activeElements.has(elementId) },
        { 'border-transparent': !activeElements.has(elementId) },
      )}
    >
      {activeElements.has(elementId) ? (
        <Image
          src={activeElements.get(elementId)!.author.avatar}
          alt={activeElements.get(elementId)!.author.username}
          height={16}
          width={16}
          className="absolute -right-[8px] -top-[8px] aspect-square rounded-full border border-primary bg-white object-contain"
        />
      ) : null}
      <i
        className={clsx('fa-location-dot text-sm', {
          'fa-regular': type === 'departureLocation',
          'fa-solid': type === 'arrivalLocation',
        })}
      />
      <div className="flex flex-1 items-center gap-2 rounded-md px-2">
        <div className="relative grow bg-transparent">
          <input
            placeholder={placeholder}
            className="relative w-full text-ellipsis bg-transparent text-left text-sm outline-none"
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => {
              setFocused(true);
              updateActiveElement(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                updateLocation(location);
                setFocused(false);
                e.currentTarget.blur();
              }
            }}
            onBlur={() => {
              setFocused(false);
              updateActiveElement(false);
            }}
            ref={inputRef}
            value={location}
          />
          {focused ? (
            <div className="absolute z-40 pt-2">
              <ul className="rounded-md border border-surface bg-white shadow-md">
                {data?.getLocationSuggestions.map((location, i) => (
                  <li
                    key={i}
                    className="cursor-pointer px-2 first:rounded-t-md last:rounded-b-md hover:bg-surface"
                    onClick={() => {
                      updateLocation(location.text, {
                        lat: location.center.lat,
                        lng: location.center.lng,
                      });
                      setLocation(location.text);
                      setFocused(false);
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
                  >
                    {location.text}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
