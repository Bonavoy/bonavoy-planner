import clsx from 'clsx';
import Link from 'next/link';

type HeaderProps = {
  tripId: string;
  mode: 'planner' | 'flights';
};

// {/* <section className="flex h-full items-center">
// <div className="flex h-full items-center bg-[#2F3C7E] px-4 text-white">
//   {/* <span className="text-2xl font-bold">B</span> */}
//   {/* <Link href="/trips" className="fa-solid fa-chevron-left" /> */}
//   <span className="flex cursor-pointer items-center gap-2 text-2xl font-black">
//     {mode}
//     <i className="fa-solid fa-caret-down" />
//   </span>
//   {/* <ul className="flex items-center gap-1">
//     {navs.map((nav) => (
//       <li key={nav.name}>
//         <Link
//           href={`/trips/${tripId}/${nav.name}`}
//           className={
//             'flex items-center justify-center gap-1 rounded-full border border-grayPrimary px-3'
//           }
//         >
//           {nav.icon}
//           {nav.name}
//         </Link>
//       </li>
//     ))}
//   </ul> */}
// </div>
// <div className="flex h-full flex-grow justify-between px-4">
//   <input
//     type="text"
//     autoComplete="off"
//     className="bg-opacity-0 text-xl focus:outline-none"
//     placeholder="Name your adventure"
//   />
// </div>
// </section> */}

export default function Header({ tripId, mode }: HeaderProps) {
  const navs = [
    {
      name: 'planner',
      icon: <i className="fa-regular fa-book" />,
      //   className: 'border-lightBlue bg-lightBlue/50',
    },
    {
      name: 'flights',
      icon: <i className="fa-regular fa-plane" />,
      //   className: 'border-darkOrange bg-darkOrange/50',
    },
    {
      name: 'notes',
      icon: <i className="fa-regular fa-note" />,
      //   className: 'border-darkOrange bg-darkOrange/50',
    },
  ];

  return (
    <header className="grid h-16 grid-cols-3 items-center justify-between border-b border-grayPrimary bg-white px-8">
      <div className="flex items-center gap-4">
        <Link
          href="/trips"
          className="text-xl font-bold text-black transition-colors duration-150 hover:text-purple"
        >
          <i className="fa-solid fa-angle-left" />
        </Link>
        <input
          type="text"
          autoComplete="off"
          className="w-full min-w-0 rounded-lg bg-white bg-opacity-0 py-2 px-4 text-xl font-bold text-black transition-colors duration-150 placeholder:font-normal hover:bg-grayPrimary/20 focus:outline-none"
          placeholder="Name your adventure"
        />
      </div>
      <div className="flex justify-center gap-8">
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
      <div className="flex items-center justify-end gap-5">
        <i className="fa-regular fa-solid fa-circle-user text-3xl text-purple" />
        <button
          title="invite friends"
          type="button"
          className="flex items-center gap-2 rounded-lg border-2 border-purple py-2 px-4 text-sm text-purple transition-colors duration-150 hover:bg-purple hover:text-white"
        >
          <i className="fa-solid fa-user-plus" />
          invite people
        </button>
        <button type="button">
          <i className="fa-regular fa-gear text-xl text-black transition-colors duration-150 hover:text-purple" />
        </button>
      </div>
    </header>
  );
}
