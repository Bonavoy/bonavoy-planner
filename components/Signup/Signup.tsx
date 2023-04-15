import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { SIGNUP } from '~/graphql/mutations/user';

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    signupMutation({
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

  const [signupMutation, { data, loading, error }] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      if (!data) return;
      router.push('/login');
    },
  });

  return (
    <form
      className="w-full rounded-lg border border-grayPrimary p-5 sm:w-96"
      onSubmit={(e) => {
        e.preventDefault();
        signup();
      }}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="py-4 font-heading text-xl font-bold">Bonavoy</h1>
        <div className="text-xs text-error">{error?.message}</div>
        <div className="w-full pt-2">
          <label htmlFor="email" className="text-xs text-graySecondary">
            Email
          </label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-gray-200 w-full rounded-lg border border-grayPrimary px-4 py-2 text-sm outline-none"
          />
        </div>
        <div className="w-full pt-2">
          <label htmlFor="firstname" className="text-xs text-graySecondary">
            Firstname
          </label>
          <input
            id="firstname"
            onChange={(e) => setFirstname(e.target.value)}
            className="border-gray-200 w-full rounded-lg border border-grayPrimary px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="w-full pt-2">
          <label htmlFor="lastname" className="text-xs text-graySecondary">
            Lastname
          </label>
          <input
            onChange={(e) => setLastname(e.target.value)}
            className="border-gray-200 w-full rounded-lg border border-grayPrimary px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="w-full pt-2">
          <label htmlFor="username" className="text-xs text-graySecondary">
            Username
          </label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="border-gray-200 w-full rounded-lg border border-grayPrimary px-4 py-2 text-sm outline-none"
          />
        </div>

        <div className="w-full pt-2">
          <label htmlFor="password" className="text-xs text-graySecondary">
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-gray-200 w-full rounded-lg border border-grayPrimary px-4 py-2 text-sm outline-none"
          />
        </div>
        <div className="w-full pt-4">
          <button
            className="w-full rounded-lg bg-primary p-1.5 text-sm text-white duration-100 hover:shadow-lg"
            type="submit"
          >
            Signup
          </button>
        </div>
        <div className="flex w-full justify-between pt-4 text-sm">
          <Link href="/login">Login</Link>
          <div>Forget password</div>
        </div>
      </div>
    </form>
  );
}
