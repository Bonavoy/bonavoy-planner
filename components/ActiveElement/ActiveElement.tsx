import clsx from 'clsx';
import React, { ReactNode, useContext } from 'react';
import { ActiveElementsContext } from '../ActiveElementsProvider';
import Image from 'next/image';

interface ActiveElementProps {
  className?: string;
  elementId: string;
  children: ReactNode;
}

// Thin wrapper to go around any element you want to be seen as `active` on
// other planner clients
const ActiveElement = ({
  className = '',
  elementId,
  children,
}: ActiveElementProps) => {
  const activeElementsCtx = useContext(ActiveElementsContext);

  return (
    <div
      className={clsx('relative border duration-150', className, {
        'border-primary': activeElementsCtx.activeElements.has(elementId),
        'border-transparent': !activeElementsCtx.activeElements.has(elementId),
      })}
    >
      {children}
      {activeElementsCtx.activeElements.has(elementId) ? (
        <Image
          loader={({ src }) => src}
          src={activeElementsCtx.activeElements.get(elementId)!.author.avatar}
          alt={activeElementsCtx.activeElements.get(elementId)!.author.username}
          height={16}
          width={16}
          className="absolute -left-[8px] -top-[8px] z-10 aspect-square rounded-full border border-primary bg-white object-contain"
        />
      ) : null}
    </div>
  );
};

export default ActiveElement;
