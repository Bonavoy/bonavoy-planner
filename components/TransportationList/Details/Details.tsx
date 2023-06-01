import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ActiveElement from '~/components/ActiveElement/ActiveElement';
import { ActiveElementsContext } from '~/components/ActiveElementsProvider';
import { UPDATE_ACTIVE_ELEMENT } from '~/graphql/mutations/planner';
import { GET_USER } from '~/graphql/queries/user';

interface DetailsProps {
  onChange: (val: string) => void;
  placeholder: string;
  value: string;
  transportationId: string;
  tripId: string;
}

const Details = ({
  onChange,
  placeholder,
  value,
  transportationId,
  tripId,
}: DetailsProps) => {
  const elementId = `transport:${transportationId}:textarea`;
  const [details, setDetails] = useState(value);
  const activeElementsCtx = useContext(ActiveElementsContext);
  const [isFocused, setIsFocused] = useState(false);

  const [updateActiveElementMutation] = useMutation(UPDATE_ACTIVE_ELEMENT);

  const getUserQuery = useQuery(GET_USER);

  useEffect(() => {
    // don't update the textarea from subscription data
    // if we are focused
    // TODO: idk how good of a soluation this is to the above
    !isFocused && setDetails(value);
  }, [value, isFocused]);

  const updateActiveElement = useCallback(
    (active: boolean) => {
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
    },
    [
      activeElementsCtx,
      elementId,
      getUserQuery,
      tripId,
      updateActiveElementMutation,
    ],
  );

  const handleFocus = () => {
    updateActiveElement(true);
    setIsFocused(true);
  };

  const handleBlur = () => {
    updateActiveElement(false);
    setIsFocused(false);
  };

  return (
    <ActiveElement className="col-span-2 rounded-md" elementId={elementId}>
      <textarea
        className="block w-full rounded-md px-2 py-0.5 text-sm text-black outline-none duration-150 placeholder:text-gray-300 hover:bg-surface hover:placeholder:text-gray-500"
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={(e) => {
          setDetails(e.target.value);
          onChange(e.target.value);
        }}
        value={details}
        rows={1}
      />
    </ActiveElement>
  );
};

export default Details;
