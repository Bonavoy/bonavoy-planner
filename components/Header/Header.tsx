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
    <header className="flex h-20 items-center justify-between border-b border-b-grayPrimary/20 bg-background px-8 shadow-lg flex-shrink-0">
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

      <div className="flex items-center justify-end gap-5">
        <i className="fa-regular fa-solid fa-circle-user text-3xl text-primary" />
        {/* <button
          title="invite friends"
          type="button"
          className="flex items-center gap-2 rounded-xl border-2 border-primary px-4 py-2 text-sm text-primary transition-colors duration-150 hover:bg-primary hover:text-white"
        >
          <i className="fa-solid fa-user-plus" />
          invite people
        </button> */}
        <button type="button">
          <i className="fa-regular fa-gear text-xl text-grayPrimary transition-colors duration-150 hover:text-primary" />
        </button>
      </div>
    </header>
  );
}
