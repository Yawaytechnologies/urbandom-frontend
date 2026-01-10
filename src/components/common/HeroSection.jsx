import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaHome, FaBuilding, FaUsers } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

/* ---------- static data (stable refs) ---------- */
const BG_IMAGES = { buy: '/buyCover.jpeg', rent: '/Rent.jpeg', pg: '/pgcover.jpeg' };

const LOCATIONS_BY_TAB = {
  buy: ['Chennai', 'Bengaluru', 'Hyderabad', 'Mumbai'],
  rent: ['HSR Layout', 'Koramangala', 'Whitefield', 'JP Nagar'],
  pg: ['Indiranagar', 'BTM Layout', 'Marathahalli', 'Domlur'],
};

const TABS = [
  { key: 'buy', label: 'Buy', icon: <FaHome />, route: '/buy' },
  { key: 'rent', label: 'Rent', icon: <FaBuilding />, route: '/rent' },
  { key: 'pg', label: 'PG/Co-Living', icon: <FaUsers />, route: '/pg' },
];

/* --- utilities --- */
function useClickOutside(onOutside) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onOutside?.();
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [onOutside]);
  return ref;
}

/* --- dropdown (variant-aware) --- */
function LocationDropdown({ value, onChange, options, variant = 'desktop', icon = null }) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside(() => setOpen(false));
  const label = useMemo(
    () => options.find((c) => c === value) ?? options[0] ?? '',
    [options, value]
  );
  const isMobile = variant === 'mobile';

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className={
          isMobile
            ? [
                'w-full bg-white text-gray-900 text-[12px] pl-8 pr-7 py-1.5 text-left',
                'rounded-full shadow ring-1 ring-black/10',
                'hover:bg-white/95 focus:bg-white outline-none',
                'relative',
              ].join(' ')
            : [
                'w-full bg-transparent text-gray-900 text-sm',
                'pl-3 pr-8 py-2 text-left',
                'transition-colors duration-200',
                'hover:bg-purple-50/50 focus:bg-purple-100/60',
                'outline-none',
              ].join(' ')
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {isMobile && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
            {icon}
          </span>
        )}
        {label}
        <svg
          className={`absolute right-3 top-1/2 -translate-y-1/2 ${
            isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'
          } text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 15.5 5.5 9h13L12 15.5z" />
        </svg>
      </button>

      {/* options */}
      <div
        className={`absolute left-0 right-0 z-50 ${isMobile ? 'mt-1' : ''} origin-top transition-all duration-200 ${
          open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <ul
          className={`rounded-lg shadow-lg ring-1 ring-black/10 bg-white overflow-auto max-h-64 ${
            isMobile ? 'text-[12px]' : 'text-sm'
          }`}
          role="listbox"
        >
          {options.map((city) => (
            <li
              key={city}
              role="option"
              aria-selected={city === value}
              onClick={() => {
                onChange(city);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer ${
                city === value ? 'bg-purple-50 text-gray-900' : 'text-gray-800'
              } hover:bg-purple-100/70`}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --- main component --- */
const HeroSection = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultTab =
    pathname.includes('/rent') ? 'rent' : pathname.includes('/pg') ? 'pg' : 'buy';

  const [tab, setTab] = useState(defaultTab);
  const [location, setLocation] = useState('');
  const [query, setQuery] = useState('');

  // stable constants (not used in deps)
  const bgImages = BG_IMAGES;
  const tabs = TABS;

  useEffect(() => setTab(defaultTab), [defaultTab]);

  // ✅ depends only on `tab` (no local alias of LOCATIONS_BY_TAB)
  useEffect(() => {
    const cities = LOCATIONS_BY_TAB[tab] || [];
    setLocation(cities[0] ?? '');
  }, [tab]);

  const handleTabClick = (key, route) => {
    setTab(key);
    navigate(route);
  };
  const handleSearch = () =>
    navigate(`/search?type=${tab}&location=${location}&query=${query}`);

  const bgPosition = tab === 'buy' ? 'bg-top' : 'bg-center';
  const ACTIVE_UNDERLINE = 'border-purple-600';

  return (
    <>
      {/* Banner */}
      <section
        className={`relative w-full min-h=[280px] md:min-h-[360px] lg:min-h-[400px] ${bgPosition} bg-no-repeat bg-cover flex items-start justify-center pb-6 md:pb-24`}
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(31,49,113,0.44), rgba(31,49,113,0.22)), url('${
            bgImages[tab] || bgImages.buy
          }')`,
        }}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center pt-28 md:pt-40 z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight mb-2 text-white drop-shadow">
            Properties to <span className="capitalize">{tab}</span> in{' '}
            <span className="text-yellow-400 font-bold">Chennai</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-2 text-white font-semibold drop-shadow">
            <span className="font-bold">8K+</span> listings added daily and{' '}
            <span className="font-bold">67K+</span> total verified
          </p>
        </div>

        {/* DESKTOP/TABLET FLOATING PANEL */}
        <div className="hidden sm:block absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-3 z-20">
          <div className="rounded-2xl p-4 shadow-2xl bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-md ring-1 ring-black/5">
            {/* tabs */}
            <div className="flex overflow-x-auto justify-start sm:justify-center gap-4 px-1 pb-2">
              {tabs.map(({ key, label, icon, route }) => {
                const active = tab === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleTabClick(key, route)}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'flex items-center gap-2 px-3 py-1.5 text-sm font-medium whitespace-nowrap',
                      'border-b-2 transition-all duration-300',
                      active
                        ? `text-black ${ACTIVE_UNDERLINE}`
                        : 'text-gray-800 border-transparent hover:text-black hover:border-purple-600',
                    ].join(' ')}
                  >
                    {icon}
                    {label}
                  </button>
                );
              })}
            </div>

            {/* search row */}
            <div className="flex items-stretch w-full sm:max-w-xl gap-0 sm:justify-start mx-auto">
              <div className="relative flex items-stretch flex-1 bg-blue-50/80 rounded-l-lg border border-gray-300 overflow-visible">
                <div className="w-[160px] border-r border-gray-300">
                  <LocationDropdown
                    variant="desktop"
                    value={location}
                    onChange={setLocation}
                    options={LOCATIONS_BY_TAB[tab] || []}
                  />
                </div>
                <div className="relative flex-1">
                  <svg
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-800 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                    />
                  </svg>
                  <input
                    type="text"
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pr-3 pl-7 py-1.5 text-sm text-gray-900 outline-none bg-transparent rounded-none"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-1.5 rounded-r-lg text-sm"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE STACK */}
      <div className="sm:hidden w-full mx-auto px-0 pt-2 pb-4">
        <div className="mx-auto w-[88%] max-w-[340px] space-y-2">
          {/* Location */}
          <LocationDropdown
            variant="mobile"
            value={location}
            onChange={setLocation}
            options={LOCATIONS_BY_TAB[tab] || []}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 2a7 7 0 0 0-7 7c0 4.2 5.1 10 6.4 11.5.3.3.8.3 1.1 0C13.9 19 19 13.2 19 9a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
              </svg>
            }
          />

          {/* Tabs */}
          <div className="grid grid-cols-3 gap-1.5">
            {TABS.map(({ key, label, icon, route }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  onClick={() => handleTabClick(key, route)}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'h-8 text-[11px] font-semibold rounded-md border flex items-center justify-center gap-1 transition-colors',
                    active
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-purple-400',
                  ].join(' ')}
                >
                  <span className="text-[13px]">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="flex w-full">
            <div className="relative flex-1">
              <input
                type="text"
                aria-label="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search areas, projects..."
                className="w-full pl-7 pr-3 py-1.5 h-8 text-[12px] bg-white rounded-l-md shadow ring-1 ring-black/10 outline-none placeholder:text-gray-400"
              />
              <svg
                className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                />
              </svg>
            </div>
            <button
              onClick={handleSearch}
              className="px-3 h-8 text-[12px] font-semibold rounded-r-md bg-purple-600 hover:bg-purple-700 text-white shadow ring-1 ring-black/5"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
