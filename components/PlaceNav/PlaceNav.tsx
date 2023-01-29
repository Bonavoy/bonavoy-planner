export default function LocationNav() {
  const places = ['edmonton', 'calgary'];
  return (
    <nav className="flex items-center gap-2 text-sm">
      {places.map((place) => (
        <span key={place} className="rounded-2xl border px-3 py-1">
          {place}
        </span>
      ))}
      <span className="flex h-7 w-7 items-center justify-center rounded-full text-lg hover:bg-black/10">
        <i className="fa-regular fa-ellipsis-vertical" />
      </span>
    </nav>
  );
}
