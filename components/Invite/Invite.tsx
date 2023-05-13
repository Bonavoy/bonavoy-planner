import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import {
  AuthorOnTripSnippetFragment,
  PendingInvite,
  TripRole,
} from '~/graphql/generated/graphql';
import { SEND_INVITE, UPDATE_INVITE_ROLE } from '~/graphql/mutations/invite';
import { GET_AUTHORS_ON_TRIP } from '~/graphql/queries/authorsOnTrips';

import Spinner from '../Spinner/';
import DropDownSelect, { DropDownItem } from '../DropDownSelect/DropDownSelect';
import { GET_INVITES } from '~/graphql/queries/invite';
import Modal from '../Modal/Modal';
import {
  REMOVE_AUTHOR_ON_TRIP,
  UPDATE_AUTHOR_ON_TRIP_ROLE,
} from '~/graphql/mutations/authorsOnTrips';

const Skeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-4 animate-pulse rounded-full bg-gray-200"></div>
      <div className="h-4 animate-pulse rounded-full bg-gray-200"></div>
    </div>
  );
};

const roles: DropDownItem[] = [
  {
    val: TripRole.Author,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Author
      </div>
    ),
  },
  {
    val: TripRole.Editor,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Editor
      </div>
    ),
  },
  {
    val: TripRole.Viewer,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Viewer
      </div>
    ),
  },
  {
    val: 'DELETE',
    view: (
      <div className="flex items-center justify-between px-2 text-xs text-red">
        Remove
      </div>
    ),
  },
];

const dropDownItems: DropDownItem[] = [
  {
    val: TripRole.Author,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Author
      </div>
    ),
  },
  {
    val: TripRole.Editor,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Editor
      </div>
    ),
  },
  {
    val: TripRole.Viewer,
    view: (
      <div className="flex items-center justify-between px-2 text-xs">
        Viewer
      </div>
    ),
  },
];

interface InviteProps {
  tripId: string;
  onClose: () => void;
}

const Invite = ({ tripId, onClose }: InviteProps) => {
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<TripRole>(TripRole.Author);
  const [authorToDelete, setAuthorToDelete] = useState<
    null | AuthorOnTripSnippetFragment | PendingInvite
  >(null);

  const getAuthorsOnTripQuery = useQuery(GET_AUTHORS_ON_TRIP, {
    variables: { tripId },
  });
  const getInvitesQuery = useQuery(GET_INVITES, { variables: { tripId } });
  const [sendInviteMutation, sendInviteResult] = useMutation(SEND_INVITE);
  const [updateAuthorOnTripRoleMutation] = useMutation(
    UPDATE_AUTHOR_ON_TRIP_ROLE,
  );
  const [updateInviteRoleMutation] = useMutation(UPDATE_INVITE_ROLE);
  const [removeAuthorOnTripMutation] = useMutation(REMOVE_AUTHOR_ON_TRIP);

  const sendInvite = () => {
    sendInviteMutation({
      variables: { tripId, invitee: { email, role } },
      refetchQueries: [
        { query: GET_INVITES, variables: { tripId } },
        { query: GET_AUTHORS_ON_TRIP, variables: { tripId } },
      ],
    });
  };

  const formatRole = (tripRole: TripRole) => {
    switch (tripRole) {
      case TripRole.Author:
        return 'Author';
      case TripRole.Editor:
        return 'Editor';
      case TripRole.Viewer:
        return 'Viewer';
    }
  };

  const updateAuthorOnTripRole = (id: string, role: TripRole) => {
    updateAuthorOnTripRoleMutation({ variables: { id, role } });
  };

  const updateInviteRole = (id: string, role: TripRole) => {
    updateInviteRoleMutation({ variables: { id, role } });
  };

  const removeAuthorOnTrip = (
    authorOnTrip: AuthorOnTripSnippetFragment | PendingInvite,
  ) => {
    switch (authorOnTrip.__typename) {
      case 'AuthorsOnTrips':
        removeAuthorOnTripMutation({ variables: { id: authorOnTrip.id } });
        return;
      case 'PendingInvite':
        return;
      default:
        throw new Error('unexpected type');
    }
  };

  return (
    <>
      <div className="h-fit w-4/12 rounded-md bg-white px-4 py-3 text-black">
        <div className="flex items-start justify-between">
          <h1 className="font-heading text-3xl font-semibold">Invite</h1>
          <button className="text-sm text-grayPrimary" onClick={onClose}>
            <i className="fa-solid fa-x" />
          </button>
        </div>
        <form
          className="flex gap-3 "
          onSubmit={(e) => {
            e.preventDefault();
            sendInvite();
            setEmail('');
          }}
        >
          <div className="flex flex-1 items-center rounded-md border border-grayPrimary">
            <input
              placeholder="send an email invite to anyone you want to come"
              className=" flex-1 bg-transparent px-4 py-2 text-xs outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="px-2">
              <DropDownSelect
                onSelect={(selection: DropDownItem) => {
                  setRole(selection.val);
                }}
                options={dropDownItems}
              >
                {roles.find((roleItem) => roleItem.val === role)!.view}
              </DropDownSelect>
            </div>
          </div>
          <button
            disabled={sendInviteResult.loading}
            className="rounded-md bg-primary px-4 text-xs text-white shadow-lg hover:bg-primary/80"
            type="submit"
          >
            {sendInviteResult.loading ? <Spinner /> : 'Invite'}
          </button>
        </form>

        <div className="text-xs text-error">
          {sendInviteResult.error?.message}
        </div>

        <div className="py-2">
          {getAuthorsOnTripQuery.data?.authorsOnTrips.length &&
            !getAuthorsOnTripQuery.loading && (
              <ul className="">
                {getAuthorsOnTripQuery.data.authorsOnTrips.map(
                  (authorOnTrip) => (
                    <div
                      className="flex justify-between  text-sm"
                      key={authorOnTrip.user.id}
                    >
                      <div>{authorOnTrip.user.email}</div>
                      <DropDownSelect
                        className="rounded-md px-1 text-gray-400 hover:bg-surface"
                        onSelect={(selection: DropDownItem) => {
                          if (selection.val === 'DELETE') {
                            setAuthorToDelete(authorOnTrip);
                            return;
                          }
                          updateAuthorOnTripRole(
                            authorOnTrip.id,
                            selection.val as TripRole,
                          );
                        }}
                        options={roles}
                      >
                        {formatRole(authorOnTrip.role)}
                      </DropDownSelect>
                    </div>
                  ),
                )}
              </ul>
            )}

          {getAuthorsOnTripQuery.loading && <Skeleton />}
        </div>

        <div className="py-2">
          <h2 className="font-heading text-xl font-semibold">Pending</h2>
          <ul className="text-sm">
            {!getInvitesQuery.loading
              ? getInvitesQuery.data?.invites.map((invite) => (
                  <li
                    className="flex justify-between text-sm"
                    key={invite.email}
                  >
                    <div>{invite.email}</div>
                    <DropDownSelect
                      className="rounded-md px-1 text-gray-400 hover:bg-surface"
                      onSelect={(selection: DropDownItem) => {
                        if (selection.val === 'DELETE') {
                          setAuthorToDelete(invite);
                          return;
                        }
                        updateInviteRole(invite.id, selection.val as TripRole);
                      }}
                      options={roles}
                    >
                      {formatRole(invite.role)}
                    </DropDownSelect>
                  </li>
                ))
              : null}
            {!getInvitesQuery.loading &&
            getInvitesQuery.data?.invites.length === 0 ? (
              <div className="text-gray-400">no pending invites</div>
            ) : null}

            {getInvitesQuery.loading && <Skeleton />}
          </ul>
        </div>
      </div>

      <Modal show={!!authorToDelete}>
        <div className="rounded-sm bg-white p-4 text-xs">
          <p>You sure you want to remove this author from the trip</p>
          <div className="flex justify-end gap-1 pt-2">
            <button
              className="rounded-md bg-error/20 px-4 py-2 text-error duration-100 hover:bg-error/10"
              onClick={() => {
                removeAuthorOnTrip(authorToDelete!);
                setAuthorToDelete(null);
              }}
            >
              Remove
            </button>
            <button
              className="rounded-md px-4 py-2 text-gray duration-100 hover:bg-surface"
              onClick={() => {
                setAuthorToDelete(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Invite;
