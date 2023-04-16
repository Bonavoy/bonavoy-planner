import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_AUTHORS_ON_TRIP } from '~/graphql/queries/authorsOnTrips';

interface InviteProps {
  tripId: string;
  onClose: () => void;
}

const Invite = ({ tripId, onClose }: InviteProps) => {
  const [email, setEmail] = useState<string>('');
  const { data } = useQuery(GET_AUTHORS_ON_TRIP, { variables: { tripId } });

  return (
    <div className="h-fit w-4/12 rounded-md bg-white  p-2">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-lg font-semibold">Invite</h1>
        <button className="text-sm text-grayPrimary" onClick={onClose}>
          <i className="fa-solid fa-x" />
        </button>
      </div>
      <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="enter in an email"
          className="flex-1 rounded-lg border border-grayPrimary px-4 py-2 text-sm"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="rounded-lg bg-primary px-4 text-xs text-white shadow-lg hover:bg-primary/80"
          type="submit"
        >
          Invite
        </button>
      </form>
      {data?.authorsOnTrips.length && data.authorsOnTrips.length > 0 ? (
        <ul className="pt-4 text-grayPrimary">
          {data.authorsOnTrips.map((author, i) => (
            <div className="flex justify-between text-sm" key={i}>
              <div>{author.user.email}</div>
              <div>{author.role}</div>
            </div>
          ))}
        </ul>
      ) : (
        <div className="text-center text-sm text-grayTertiary">
          Seems pretty lonely... maybe you should invite some people
        </div>
      )}
    </div>
  );
};

export default Invite;
