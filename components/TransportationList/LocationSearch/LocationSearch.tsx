import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { GET_LOCATION_SUGGESTIONS } from '~/graphql/queries/locations';
import { ActiveElementsContext } from '~/components/ActiveElementsProvider';
import { UPDATE_ACTIVE_ELEMENT } from '~/graphql/mutations/planner';
import { GET_USER } from '~/graphql/queries/user';
import clsx from 'clsx';
import ActiveElement from '~/components/ActiveElement/ActiveElement';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

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

  const activeElementsCtx = useContext(ActiveElementsContext);

  // react to new subscription data
  useEffect(() => {
    setLocation(value);
  }, [value]);

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
      update: (_cache, { data }) => {
        const activeElement = data?.updateActiveElement;
        if (!activeElement) return;
        activeElementsCtx.updateActiveElement(activeElement);
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateActiveElement: {
          __typename: 'ActiveElement',
          tripId,
          elementId,
          active,
          author: {
            __typename: 'AuthorPresent',
            id: getUserQuery.data?.user.id ?? '',
            username: getUserQuery.data?.user.username ?? '',
            avatar: getUserQuery.data?.user.avatar ?? '',
            connected: false,
          },
        },
      },
    });
  };

  const getLocationSuggestionsDebounced = useCallback(
    debounce(
      (query: string) => {
        getLocationSuggestionsQuery({ variables: { query } });
      },
      300,
      { trailing: true },
    ),
    [],
  );

  return (
    <ActiveElement className="rounded-md" elementId={elementId}>
      <div className="relative flex flex-1 items-center gap-2 rounded-md px-2 duration-150 hover:bg-surface">
        {/* <i
          className={clsx('fa-location-dot text-sm', {
            'fa-regular': type === 'departureLocation',
            'fa-solid': type === 'arrivalLocation',
          })}
        /> */}
        <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
        <div className="flex flex-1 items-center gap-2 rounded-md">
          <div className="relative grow bg-transparent">
            <input
              placeholder={placeholder}
              className="relative w-full text-ellipsis bg-transparent text-left text-sm outline-none"
              onChange={(e) => {
                setLocation(e.target.value);
                getLocationSuggestionsDebounced(e.target.value);
              }}
              onFocus={() => {
                getLocationSuggestionsQuery({ variables: { query: location } });
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
    </ActiveElement>
  );
};

export default LocationSearch;
