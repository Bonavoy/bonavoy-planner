import { useMutation, useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useContext, useEffect, useRef } from 'react';
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const activeElementsCtx = useContext(ActiveElementsContext);

  const [updateActiveElementMutation] = useMutation(UPDATE_ACTIVE_ELEMENT);

  const getUserQuery = useQuery(GET_USER);

  useEffect(() => {
    const handleFocus = () => {
      updateActiveElement(true);
    };

    const handleBlur = () => {
      updateActiveElement(false);
    };

    const textareaElement = textareaRef.current;

    if (textareaElement) {
      textareaElement.addEventListener('focus', handleFocus);
      textareaElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener('focus', handleFocus);
        textareaElement.removeEventListener('blur', handleBlur);
      }
    };
  }, [textareaRef]);

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

  return (
    <ActiveElement className="rounded-md" elementId={elementId}>
      <textarea
        className="w-full rounded-md px-2 py-1 text-sm text-black outline-none duration-150 placeholder:text-gray-300 hover:bg-surface hover:placeholder:text-gray-500"
        placeholder={placeholder}
        ref={textareaRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        rows={1}
      />
    </ActiveElement>
  );
};

export default Details;
