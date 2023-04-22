import { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Invite from '~/components/Invite';
import Modal from '../Modal/Modal';

//apollo
import { GET_AUTHORS_PRESENT } from '~/graphql/queries/planner';
import { GET_USER } from '~/graphql/queries/user';
import { LISTEN_AUTHORS_PRESENT } from '~/graphql/subscriptions/planner';

type HeaderProps = {
  tripId: string;
  mode: 'planner' | 'transportation' | 'notes';
};

export default function Header({ tripId, mode }: HeaderProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { data: userData } = useQuery(GET_USER);

  const getAuthorsPresentQuery = useQuery(GET_AUTHORS_PRESENT, {
    variables: { tripId },
    skip: !userData?.user,
  });

  useSubscription(LISTEN_AUTHORS_PRESENT, {
    skip: !userData?.user || !getAuthorsPresentQuery?.data,
    variables: { tripId },
    onData: ({ data, client }) => {
      const authorPresent = data.data?.listenAuthorPresent;
      if (!authorPresent) return;

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
                className={clsx('flex items-center gap-2 px-6 py-2', {
                  'rounded-xl bg-primary text-white': nav.name === mode,
                  'px-1 text-grayPrimary': nav.name !== mode,
                })}
              >
                {nav.icon}
                {nav.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-end gap-2">
          <div className="">
            <div className="relative flex">
              {getAuthorsPresentQuery.data?.authorsPresent
                .slice(0, 3)
                .map((authorPresent, i) => (
                  <div
                    key={i}
                    className={clsx(
                      'absolute right-4 h-8 w-8 rounded-full border-2 border-white',
                      { 'right-8': i === 1, 'right-12': i === 2 },
                    )}
                  >
                    <Image
                      src={authorPresent.avatar}
                      alt={authorPresent.username}
                      fill
                      className="rounded-full"
                    />
                  </div>
                ))}{' '}
            </div>
            <button
              title="invite friends"
              type="button"
              onClick={() => setShowInviteModal(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-primary text-white duration-150 hover:bg-primary/80"
            >
              <i className="fa-solid fa-plus" />
            </button>
          </div>

          <button type="button">
            <i className="fa-regular fa-gear text-xl text-grayPrimary transition-colors duration-150 hover:text-primary" />
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
