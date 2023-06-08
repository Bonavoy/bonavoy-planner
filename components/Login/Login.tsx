import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AUTHENTICATE } from '~/graphql/mutations/user';
import Spinner from '../Spinner/Spinner';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    authenticateMutation({
      variables: { username, password },
    });
  };

  const [authenticateMutation, { loading, error }] = useMutation(AUTHENTICATE, {
    onCompleted: (data) => {
      if (!data) return;
      router.push('/trips');
    },
  });

  return (
    <form
      className="w-full rounded-lg border border-gray-500 p-5 shadow-lg sm:w-96"
      onSubmit={(e) => {
        e.preventDefault();
        login();
      }}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="py-4 font-heading text-xl font-bold">Bonavoy</h1>
        <div className="text-xs text-error">{error?.message}</div>
        <div className="w-full pt-2">
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none"
          />
        </div>
        <div className="w-full pt-2">
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none"
          />
        </div>
        <div className="w-full pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-primary p-1.5 text-sm text-white duration-100 hover:shadow-lg"
          >
            {loading ? <Spinner /> : 'Login'}
          </button>
        </div>
        <div className="flex w-full justify-between pt-4 text-sm">
          <Link href="/signup">Signup</Link>
          <div>Forget password</div>
        </div>
      </div>
    </form>
  );
}
