import { useQuery, useSubscription } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Invite from '~/components/Invite';
import Modal from '../Modal/Modal';
import { GET_AUTHORS_PRESENT } from '~/graphql/queries/planner';
import { GET_USER } from '~/graphql/queries/user';
import { LISTEN_AUTHORS_PRESENT } from '~/graphql/subscriptions/planner';

type HeaderProps = {
  tripId: string;
  mode: 'planner' | 'transportation';
};

export default function Header({ tripId, mode }: HeaderProps) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { data: userData } = useQuery(GET_USER);

  const { data, loading: getAuthorsPresentLoading } = useQuery(
    GET_AUTHORS_PRESENT,
    { variables: { tripId }, skip: !userData?.user },
  );

  useSubscription(LISTEN_AUTHORS_PRESENT, {
    skip: !userData?.user,
    variables: { tripId },
    onData: ({ data, client }) => {
      const authorPresent = data.data?.listenAuthorPresent;
      if (!authorPresent) return;

      const getAuthorsPresentQuery = client.readQuery({
        query: GET_AUTHORS_PRESENT,
        variables: { tripId: tripId },
      });

      const newAuthorsPresent = cloneDeep(getAuthorsPresentQuery);

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

      // don't show the current logged in user in this list
      if (userData?.user) {
        newAuthorsPresent.authorsPresent =
          newAuthorsPresent.authorsPresent.filter(
            (curAuthorPresent) => curAuthorPresent.id !== userData.user.id,
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
      //   className: 'border-lightBlue bg-lightBlue/50',
    },
    {
      name: 'transportation',
      icon: <i className="fa-regular fa-plane" />,
      //   className: 'border-darkOrange bg-darkOrange/50',
    },
    {
      name: 'notes',
      icon: <i className="fa-solid fa-note" />,
      //   className: 'border-darkOrange bg-darkOrange/50',
    },
  ];

  return (
    <>
      <header className="flex h-20 items-center justify-between bg-background px-8 shadow-lg">
        <div className="flex items-center gap-6">
          <Link href="/trips">
            <i className="fa-solid fa-chevron-left text-lg text-primary" />
          </Link>
          <div className="relative w-96 rounded-xl bg-surface">
            <input
              type="text"
              autoComplete="off"
              className="w-full rounded-xl bg-transparent px-4 py-1 text-lg font-semibold transition-shadow duration-150 placeholder:font-normal focus:shadow-lg focus:outline-none"
              placeholder="Name your adventure"
            />
            <i className="fa-solid fa-pen absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary" />
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

        <div className="flex items-center justify-end gap-5">
          <i className="fa-regular fa-solid fa-circle-user text-3xl text-primary" />
          <div className="flex">
            {!getAuthorsPresentLoading
              ? data?.authorsPresent.map((authorPresent, i) => (
                  <Image
                    key={i}
                    src={authorPresent.avatar}
                    alt={authorPresent.username}
                    width={32}
                    height={32}
                    className="rounded-full border border-grayPrimary"
                  />
                ))
              : 'loading'}
          </div>
          <button
            title="invite friends"
            type="button"
            onClick={() => {
              setShowInviteModal(true);
              setShowInviteModal(true);
            }}
            className="flex items-center gap-2 rounded-lg border-2 border-primary px-4 py-2 text-sm text-primary transition-colors duration-150 hover:bg-primary hover:text-white"
          >
            <i className="fa-solid fa-user-plus" />
            invite people
          </button>
          <button type="button">
            <i className="fa-regular fa-gear text-xl text-black transition-colors duration-150 hover:text-primary" />
          </button>
        </div>
      </header>
      {/* invite other users */}
      {showInviteModal && (
        <Modal>
          <div className="fixed bottom-0 left-0 right-0 top-0 flex justify-center bg-black bg-opacity-70">
            <Invite tripId={tripId} onClose={() => setShowInviteModal(false)} />
          </div>
        </Modal>
      )}
    </>
  );
}
