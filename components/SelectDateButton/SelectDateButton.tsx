import { format } from 'date-fns';
import { useContext, useState } from 'react';

import ActiveElement from '../ActiveElement';
import Modal from '../Modal';
import Datepicker from '../Datepicker';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '~/graphql/queries/user';
import { UPDATE_ACTIVE_ELEMENT } from '~/graphql/mutations/planner';
import { ActiveElementsContext } from '../ActiveElementsProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

interface SelectDateButtonProps {
  transportationId: string;
  elementId: string;
  onSelectDate: (date: Date) => void;
  date?: string;
  tripId: string;
}

const SelectDateButton = ({
  transportationId,
  date,
  onSelectDate,
  elementId,
  tripId,
}: SelectDateButtonProps) => {
  const [showDatepicker, setShowDatepicker] = useState(false);

  const getUserQuery = useQuery(GET_USER);

  const activeElementsCtx = useContext(ActiveElementsContext);

  const [updateActiveElementMutation] = useMutation(UPDATE_ACTIVE_ELEMENT);

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

  const formatDatetime = (date?: string): string =>
    date ? format(new Date(date), 'MMM d h:mm a') : '';

  return (
    <>
      <ActiveElement
        className="self-stretch justify-self-stretch rounded-md"
        elementId={elementId}
      >
        <button
          className="flex h-full w-full items-center justify-end  gap-2 rounded-md px-2 text-sm duration-150 hover:bg-surface"
          onClick={() => {
            setShowDatepicker(true);
            updateActiveElement(true);
          }}
        >
          {date ? <span>{formatDatetime(date)}</span> : null}
          <FontAwesomeIcon
            icon={faCalendar}
            className="fa fa-calendar cursor"
          />
        </button>
      </ActiveElement>

      <Modal show={showDatepicker}>
        {/* modal bg */}
        <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center bg-black bg-opacity-70">
          {/* content */}
          <div className="pt-24">
            <div className="flex justify-end rounded-t-xl bg-white">
              <button
                className="right-0 p-3"
                onClick={() => {
                  updateActiveElement(false);
                  setShowDatepicker(false);
                }}
              >
                close
              </button>
            </div>
            <div className="rounded-b-xl bg-white px-3 pb-3">
              <Datepicker
                onSelect={(date) => {
                  updateActiveElement(false);
                  onSelectDate(date);
                  setShowDatepicker(false);
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SelectDateButton;
