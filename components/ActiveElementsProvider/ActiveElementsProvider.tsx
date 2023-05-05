import { useQuery, useSubscription } from '@apollo/client';
import { ReactNode, createContext, useState } from 'react';
import { ActiveElementFullFragment } from '~/graphql/generated/graphql';
import { GET_ACTIVE_ELEMENTS } from '~/graphql/queries/planner';
import { LISTEN_ACTIVE_ELEMENTS } from '~/graphql/subscriptions/planner';
import { copyMap } from '~/utils/copyMap';

interface ActiveElementsContextType {
  activeElements: Map<string, ActiveElementFullFragment>;
  updateActiveElement: (activeElement: ActiveElementFullFragment) => void;
}

export const ActiveElementsContext = createContext<ActiveElementsContextType>({
  activeElements: new Map<string, ActiveElementFullFragment>(),
  updateActiveElement: (activeElement: ActiveElementFullFragment) => {},
});

interface ActiveElementsProviderProps {
  children: ReactNode;
  tripId: string;
}

const ActiveElementsProvider = ({
  children,
  tripId,
}: ActiveElementsProviderProps) => {
  const [activeElementsMap, setActiveElementsMap] = useState(
    new Map<string, ActiveElementFullFragment>(),
  );

  const updateActiveElement = (activeElement: ActiveElementFullFragment) => {
    const newActiveElementsMap = copyMap(activeElementsMap);

    if (activeElement.active) {
      newActiveElementsMap.set(activeElement.elementId, activeElement);
    } else {
      newActiveElementsMap.delete(activeElement.elementId);
    }

    setActiveElementsMap(newActiveElementsMap);
  };

  const getActiveElements = useQuery(GET_ACTIVE_ELEMENTS, {
    variables: { tripId },
    onCompleted: (data) => {
      const newActiveElementsMap = new Map<string, ActiveElementFullFragment>();
      for (const activeElement of data.activeElements) {
        newActiveElementsMap.set(activeElement.elementId, {
          elementId: activeElement.elementId,
          active: activeElement.active,
          tripId: activeElement.tripId,
          author: {
            id: activeElement.author.id,
            username: activeElement.author.username,
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

      updateActiveElement(activeElement);
    },
  });

  return (
    <ActiveElementsContext.Provider
      value={{ activeElements: activeElementsMap, updateActiveElement }}
    >
      {children}
    </ActiveElementsContext.Provider>
  );
};

export default ActiveElementsProvider;
