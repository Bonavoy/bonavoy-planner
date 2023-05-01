import { useQuery, useSubscription } from '@apollo/client';
import { ReactNode, createContext, useState } from 'react';
import { ActiveElement } from '~/graphql/generated/graphql';
import { GET_ACTIVE_ELEMENTS } from '~/graphql/queries/planner';
import { LISTEN_ACTIVE_ELEMENTS } from '~/graphql/subscriptions/planner';
import { copyMap } from '~/utils/copyMap';

interface ActiveElements {
  activeElements: Map<string, ActiveElement>;
}

export const ActiveElementsContext = createContext(
  new Map<string, ActiveElement>(),
);

interface ActiveElementsProviderProps {
  children: ReactNode;
  tripId: string;
}

const ActiveElementsProvider = ({
  children,
  tripId,
}: ActiveElementsProviderProps) => {
  const [activeElementsMap, setActiveElementsMap] = useState(
    new Map<string, ActiveElement>(),
  );

  const getActiveElements = useQuery(GET_ACTIVE_ELEMENTS, {
    variables: { tripId },
    onCompleted: (data) => {
      const newActiveElementsMap = new Map<string, ActiveElement>();
      for (const activeElement of data.activeElements) {
        newActiveElementsMap.set(activeElement.elementId, {
          elementId: activeElement.elementId,
          active: activeElement.active,
          tripId: activeElement.tripId,
          author: {
            id: activeElement.author.id,
            username: activeElement.author.username,
            firstname: activeElement.author.firstname,
            email: activeElement.author.email,
            lastname: activeElement.author.lastname,
            avatar: activeElement.author.avatar,
            connected: activeElement.author.connected,
          },
        });
      }
      setActiveElementsMap(newActiveElementsMap);
    },
  });

  useSubscription(LISTEN_ACTIVE_ELEMENTS, {
    skip: !getActiveElements.data?.activeElements,
    variables: { tripId: tripId },
    onData: ({ data }) => {
      const activeElement = data.data?.listenActiveElement;
      if (!activeElement) return;

      const newActiveElementsMap = copyMap(activeElementsMap);

      if (activeElement.active) {
        newActiveElementsMap.set(activeElement.elementId, activeElement);
      } else {
        newActiveElementsMap.delete(activeElement.elementId);
      }

      setActiveElementsMap(newActiveElementsMap);
    },
  });

  return (
    <ActiveElementsContext.Provider value={activeElementsMap}>
      {children}
    </ActiveElementsContext.Provider>
  );
};

export default ActiveElementsProvider;
