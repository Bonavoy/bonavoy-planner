import clsx from 'clsx';
import Link from 'next/link';

type HeaderProps = {
  tripId: string;
  mode: 'planner' | 'transportation';
};

export default function Header({ tripId, mode }: HeaderProps) {
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
    <header className="bg-bonavoy_bg grid h-20 grid-cols-3 items-center justify-between px-8">
      <div className="flex items-center gap-2 text-2xl">
        <i className="fa-solid fa-sailboat" />
        bonavoy
        {/* <Link
          href="/trips"
          className="text-xl font-bold text-black transition-colors duration-150 hover:text-purple"
        >
          <i className="fa-solid fa-angle-left" />
        </Link>
        <input
          type="text"
          autoComplete="off"
          className="w-full min-w-0 rounded-lg bg-bonavoy_bg bg-opacity-0 py-2 px-4 text-xl font-bold text-black transition-colors duration-150 placeholder:font-normal hover:bg-grayPrimary/20 focus:outline-none"
          placeholder="Name your adventure"
        /> */}
      </div>
      <div className="relative">
        <div className="flex justify-center gap-8 rounded">
          {navs.map((nav) => (
            <Link
              key={nav.name}
              href={`/trips/${tripId}/${nav.name}`}
              className={clsx('flex items-center gap-2 text-lg', {
                'text-purple': nav.name === mode,
                'text-grayPrimary': nav.name !== mode,
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
        <button
          title="invite friends"
          type="button"
          className="border-purple text-purple hover:bg-purple flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm transition-colors duration-150 hover:text-white"
        >
          <i className="fa-solid fa-user-plus" />
          invite people
        </button>
        <button type="button">
          <i className="fa-regular fa-gear text-xl text-black transition-colors duration-150 hover:text-primary" />
        </button>
      </div>
    </header>
  );
}
