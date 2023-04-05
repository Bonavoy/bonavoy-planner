import { useQuery } from '@apollo/client';
import { useRef, useState } from 'react';
import { GET_LOCATION_SUGGESTIONS } from '~/graphql/queries/locations';

interface LocationSearchProps {
  value: string;
  updateLocation: (location: string) => void;
}

const LocationSearch = ({ value, updateLocation }: LocationSearchProps) => {
  const [location, setLocation] = useState(value);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: getLocationSuggestionsQuery } = useQuery(
    GET_LOCATION_SUGGESTIONS,
    {
      variables: { query: location },
    },
  );

  return (
    <div className="relative grow">
      <input
        placeholder="departure location"
        className="relative w-full rounded-md text-left text-sm outline-none"
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
        <div className="z-60 absolute pt-2">
          <ul className="rounded-md bg-white shadow-md">
            {getLocationSuggestionsQuery?.getLocationSuggestions.map(
              (location, i) => (
                <li
                  key={i}
                  className="cursor-pointer px-2 first:rounded-t-md last:rounded-b-md hover:bg-surface"
                  onClick={() => {
                    updateLocation(location.text);
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
              ),
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default LocationSearch;
