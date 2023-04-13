import { useLazyQuery } from '@apollo/client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GET_LOCATION_SUGGESTIONS } from '~/graphql/queries/locations';
import { debounce } from 'lodash';

interface LocationSearchProps {
  value: string;
  updateLocation: (
    location: string,
    coords?: { lat: number; lng: number },
  ) => void;
  placeholder: string;
}

const LocationSearch = ({
  value,
  updateLocation,
  placeholder,
}: LocationSearchProps) => {
  const [location, setLocation] = useState(value);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [getLocationSuggestionsQuery, { data }] = useLazyQuery(
    GET_LOCATION_SUGGESTIONS,
  );

  useEffect(() => {
    // react to new subscription data
    setLocation(value);
  }, [value]);

  useEffect(() => {
    if (!focused) return;
    getLocationSuggestionsQuery({ variables: { query: location } });
  }, [location, focused]);

  return (
    <div className="relative grow">
      <input
        placeholder={placeholder}
        className="relative w-full rounded-md bg-surface text-left text-sm outline-none"
        onChange={(e) => setLocation(e.target.value)}
        onFocus={() => {
          setFocused(true);
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
  );
};

export default LocationSearch;
