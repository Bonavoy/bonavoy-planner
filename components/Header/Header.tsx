import Link from 'next/link';

import PlaceNav from '../PlaceNav/PlaceNav';

export default function Header({ tripId }: { tripId: string }) {
  const navs = [
    {
      name: 'planner',
      icon: <i className="fa-solid fa-book" />,
      //   className: 'border-lightBlue bg-lightBlue/50',
    },
    {
      name: 'flights',
      icon: <i className="fa-solid fa-plane" />,
      //   className: 'border-darkOrange bg-darkOrange/50',
    },
  ];

  return (
    <header>
      <section className="flex items-center border-b py-4 px-8">
        <div className="mr-4 flex items-center border-r pr-4">
          <span className="mr-4 text-xl font-bold">bonavoy</span>
          <ul className="flex items-center gap-2 text-sm">
            {navs.map((nav) => (
              <li key={nav.name}>
                <Link
                  href={`/trip/${tripId}/${nav.name}`}
                  className={
                    'flex items-center justify-center gap-1 rounded-full border py-1 px-4'
                  }
                >
                  {nav.icon}
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-grow justify-between">
          <input
            type="text"
            className="text-xl font-medium focus:outline-none"
            placeholder="Name your trip"
          />
        </div>
      </section>
      <section className="border-b px-8 py-2">
        <div className="w-max">
          <PlaceNav tripId={tripId} />
        </div>
      </section>
    </header>
  );
}
