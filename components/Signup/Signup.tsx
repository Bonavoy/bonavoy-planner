import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import { SIGNUP } from '~/graphql/mutations/user';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signup = async () => {
    const mut = await signupMutation({
      variables: {
        userInput: {
          email,
          firstname,
          lastname,
          username,
          password,
        },
      },
    });
  };

  const [signupMutation, { data, loading, error }] = useMutation(SIGNUP);

  return (
    <div className="border-gray-500 w-full rounded-lg border p-5 shadow-lg sm:w-96">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="py-4 text-lg">Bonavoy</h1>
        <div className="w-full pt-2">
          <input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-200 w-full rounded-lg border py-2 px-4 text-sm"
          />
        </div>
        <div className="w-full pt-2">
          <input
            placeholder="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            className="border-gray-200 w-full rounded-lg border py-2 px-4 text-sm"
          />
        </div>

        <div className="w-full pt-2">
          <input
            placeholder="lastname"
            onChange={(e) => setLastname(e.target.value)}
            className="border-gray-200 w-full rounded-lg border py-2 px-4 text-sm"
          />
        </div>

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
            onClick={() => signup()}
          >
            Signup
          </button>
        </div>
        <div className="flex w-full justify-between pt-4 text-sm">
          <Link href="/login">Login</Link>
          <div>Forget password</div>
        </div>
      </div>
    </div>
  );
}
