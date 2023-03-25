import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AUTHENTICATE } from '~/graphql/mutations/user';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    authenticateMutation({ variables: { username, password } });
  };

  const [authenticateMutation, { loading, error }] = useMutation(AUTHENTICATE, {
    onCompleted: (data) => {
      router.push('/trips');
    },
  });

  return (
    <div className="border-gray-500 w-full rounded-lg border p-5 shadow-lg sm:w-96">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="py-4 text-lg">Bonavoy</h1>
        <div className="w-full pt-2">
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-gray-200 w-full rounded-lg border py-2 px-4 text-sm"
          />
        </div>
        <div className="w-full pt-2">
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-200 w-full rounded-lg border py-2 px-4 text-sm"
          />
        </div>
        <div className="w-full pt-4">
          <button
            className="w-full rounded-lg bg-purple p-1 text-white"
            onClick={login}
          >
            Login
          </button>
        </div>
        <div className="flex w-full justify-between pt-4 text-sm">
          <Link href="/signup">Signup</Link>
          <div>Forget password</div>
        </div>
      </div>
    </div>
  );
}
