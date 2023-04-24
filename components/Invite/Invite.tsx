import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';

import { TripRole } from '~/graphql/generated/graphql';
import { SEND_INVITE } from '~/graphql/mutations/invite';
import { GET_AUTHORS_ON_TRIP } from '~/graphql/queries/authorsOnTrips';

import Spinner from '../Spinner/';
import DropDownSelect, { DropDownItem } from '../DropDownSelect/DropDownSelect';
import { GET_INVITES } from '~/graphql/queries/invite';

const roles: DropDownItem[] = [
  {
    val: TripRole.Author,
    view: (
      <div className="flex items-center justify-between px-2 text-sm">
        Author
      </div>
    ),
  },
  {
    val: TripRole.Editor,
    view: (
      <div className="flex items-center justify-between px-2 text-sm">
        Editor
      </div>
    ),
  },
  {
    val: TripRole.Viewer,
    view: (
      <div className="flex items-center justify-between px-2 text-sm">
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

  const getAuthorsOnTripQuery = useQuery(GET_AUTHORS_ON_TRIP, {
    variables: { tripId },
  });
  const getInvitesQuery = useQuery(GET_INVITES, { variables: { tripId } });
  const [sendInvite, sendInviteResult] = useMutation(SEND_INVITE); // TODO: optimistic ui update

  return (
    <div className="h-fit w-4/12 rounded-md bg-white px-4 py-3 text-black">
      <div className="flex items-start justify-between">
        <h1 className="font-heading text-3xl font-semibold">Invite</h1>
        <button className="text-sm text-grayPrimary" onClick={onClose}>
          <i className="fa-solid fa-x" />
        </button>
      </div>
      <form
        className="flex gap-3 pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          sendInvite({
            variables: { tripId, invitee: { email, role } },
            refetchQueries: [
              { query: GET_INVITES, variables: { tripId } },
              { query: GET_AUTHORS_ON_TRIP, variables: { tripId } },
            ],
          });
          setEmail('');
        }}
      >
        <div className="flex flex-1 items-center rounded-md border border-grayPrimary">
          <input
            placeholder="send an email invite to anyone you want to come"
            className=" flex-1 bg-transparent px-4 py-2 text-sm outline-none"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="px-2">
            <DropDownSelect
              onSelect={(selection: DropDownItem) => {
                setRole(selection.val);
              }}
              options={roles}
              value={roles.find((roleItem) => roleItem.val === role)!}
            />
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

      <div>
        {getAuthorsOnTripQuery.data?.authorsOnTrips.length &&
        getAuthorsOnTripQuery.data.authorsOnTrips.length > 0 ? (
          <ul className="pt-4">
            {getAuthorsOnTripQuery.data.authorsOnTrips.map((author) => (
              <div
                className="flex justify-between py-1 text-sm"
                key={author.user.id}
              >
                <div>{author.user.email}</div>
                <div className="text-gray-500">{author.role}</div>
              </div>
            ))}
          </ul>
        ) : (
          <div className="text-center text-sm text-grayTertiary">
            Seems pretty lonely... maybe you should invite some people
          </div>
        )}
      </div>
      <div className="pt-4">
        <h2 className="font-heading font-semibold">Pending Invites</h2>
        <ul className="text-sm">
          {!getInvitesQuery.loading ? (
            getInvitesQuery.data?.invites.map((invite) => (
              <li
                className="flex justify-between py-1 text-sm"
                key={invite.email}
              >
                <div>{invite.email}</div>
                <div className="text-gray-500">{invite.role}</div>
              </li>
            ))
          ) : (
            <Spinner />
          )}
          {!getInvitesQuery.loading &&
          getInvitesQuery.data?.invites.length === 0 ? (
            <div className="text-gray-400">no pending invites</div>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Invite;
