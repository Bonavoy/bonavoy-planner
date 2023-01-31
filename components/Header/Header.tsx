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
  ];

  return (
    <header className="flex h-16 items-center justify-between border-b border-grayPrimary px-8">
      <div className="text-2xl font-black">bonavoy</div>
      <div className='flex gap-8'>
        {navs.map((nav) => (
          <div className='flex gap-2 items-center text-lg text-grayPrimary'>
            {nav.icon}
            {nav.name}
          </div>
        ))}
      </div>
      <div></div>
    </header>
  );
}
