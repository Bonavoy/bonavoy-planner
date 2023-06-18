import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

//components
import Invite from '~/components/Invite';
import Modal from '../Modal/Modal';

//queries
import { GET_AUTHORS_PRESENT } from '~/graphql/queries/planner';
import { GET_USER } from '~/graphql/queries/user';
import { LISTEN_AUTHORS_PRESENT } from '~/graphql/subscriptions/planner';

//types
import { PlannerDetailsQuery } from '~/graphql/generated/graphql';

export type HeaderProps = {
  tripId: string;
  mode: 'planner' | 'transportation' | 'notes';
  details: PlannerDetailsQuery['plannerDetails'];
};

export default function Header({ tripId, mode, details }: HeaderProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const getUserQuery = useQuery(GET_USER);

  const getAuthorsPresentQuery = useQuery(GET_AUTHORS_PRESENT, {
    variables: { tripId },
    skip: !getUserQuery.data?.user,
  });

  useSubscription(LISTEN_AUTHORS_PRESENT, {
    skip: !getUserQuery.data?.user || !getAuthorsPresentQuery?.data,
    variables: { tripId },
    onData: ({ data, client }) => {
      const authorPresent = data.data?.listenAuthorPresent;
      if (!authorPresent || authorPresent.id === getUserQuery.data?.user.id)
        return;

      const oldGetAuthorsPresentQuery = client.readQuery({
        query: GET_AUTHORS_PRESENT,
        variables: { tripId: tripId },
      });

      const newAuthorsPresent = cloneDeep(oldGetAuthorsPresentQuery);

      if (!newAuthorsPresent?.authorsPresent) return;

      // need this so cache knows what this is
      authorPresent.__typename = 'AuthorPresent';

      if (authorPresent.connected) {
        const curAuthorPresent = newAuthorsPresent.authorsPresent.find(
          (curAuthorPresent) => curAuthorPresent.id === authorPresent.id,
        );
        if (curAuthorPresent) return; // already in cache
        newAuthorsPresent.authorsPresent = [
          ...newAuthorsPresent.authorsPresent,
          authorPresent,
        ];
      } else {
        newAuthorsPresent.authorsPresent =
          newAuthorsPresent.authorsPresent.filter(
            (curAuthorPresent) => authorPresent.id !== curAuthorPresent.id,
          );
      }

      client.writeQuery({
        query: GET_AUTHORS_PRESENT,
        variables: {
          tripId,
        },
        data: newAuthorsPresent,
      });
    },
  });

  const navs = [
    {
      name: 'planner',
      icon: <i className="fa-solid fa-book" />,
    },
    {
      name: 'transportation',
      icon: <i className="fa-regular fa-plane" />,
    },
    {
      name: 'notes',
      icon: <i className="fa-solid fa-note" />,
    },
  ];

  return (
    <>
      <header className="flex h-20 flex-shrink-0 items-center justify-between border-b border-b-grayPrimary/20 bg-background px-8 shadow-lg">
        <div className="flex items-center gap-6">
          <Link href="/trips">
            <i className="fa-solid fa-chevron-left text-lg text-primary" />
          </Link>
          <div className="relative w-96 rounded-xl bg-surface">
            <input
              type="text"
              autoComplete="off"
              defaultValue={details?.name}
              className="w-full rounded-xl bg-transparent px-4 py-1 text-lg font-semibold transition-shadow duration-150 placeholder:font-normal focus:shadow-md focus:outline-none"
              placeholder="Name your adventure"
            />
            <i className="fa-regular fa-pen absolute right-4 top-1/2 -translate-y-1/2 text-sm text-grayPrimary" />
          </div>

          <div className="flex justify-center rounded-xl bg-surface text-sm">
            {navs.map((nav) => (
              <Link
                key={nav.name}
                href={`/trips/${tripId}/${nav.name}`}
                className={clsx(
                  'flex items-center gap-2 rounded-xl px-6 py-2 duration-100',
                  {
                    'bg-primary text-white': nav.name === mode,
                    'px-1 text-grayPrimary': nav.name !== mode,
                  },
                )}
              >
                {nav.icon}
                {nav.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-end gap-2">
          <div className="">
            <div className="relative flex items-center">
              {/* current user */}
              {getUserQuery.data?.user ? (
                <div className="relative h-8 w-8 rounded-full border-2 border-white">
                  <Image
                    src={getUserQuery.data?.user.avatar ?? ''}
                    alt={getUserQuery.data?.user.username ?? ''}
                    fill
                    className="rounded-full text-xs"
                  />
                </div>
              ) : null}
              {/* other authors */}
              {getAuthorsPresentQuery.data?.authorsPresent
                .slice(0, 2)
                .map((authorPresent, i) => {
                  if (authorPresent.id === getUserQuery.data?.user.id)
                    return null;
                  return (
                    <div
                      key={i}
                      className={clsx(
                        'relative h-8 w-8 rounded-full border-2 border-white',
                      )}
                    >
                      <Image
                        src={authorPresent.avatar}
                        alt={authorPresent.username}
                        fill
                        className="rounded-full"
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <button
            title="invite friends"
            type="button"
            onClick={() => setShowInviteModal(true)}
            className="flex items-center justify-center rounded-md p-1 text-sm duration-150 hover:bg-primary/80 hover:bg-surface"
          >
            <span className="line-clamp-1">Share</span>
          </button>
        </div>
      </header>

      {/* invite modal */}
      <Modal show={showInviteModal}>
        <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center bg-black/5 pt-12">
          <Invite tripId={tripId} onClose={() => setShowInviteModal(false)} />
        </div>
      </Modal>
    </>
  );
}
