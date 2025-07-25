import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaBed } from 'react-icons/fa';
import { fetchNeighbourhoodPgs } from '../../redux/actions/pgPageActions';

const NeighbourhoodPGs = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const { neighbourhoodPgs = [], loading } = useSelector(
    (state) => state.pgPage
  );

  useEffect(() => {
    dispatch(fetchNeighbourhoodPgs());
  }, [dispatch]);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const filteredPGs = neighbourhoodPgs?.filter(
    (pg) => pg.pgDetails && pg.pgDetails.pgName
  );

  return (
    <section className="px-4 md:px-12 lg:px-20 py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        Our Top <span className="text-black">Neighbourhood PGs</span>
      </h2>

      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10"
        >
          <FiChevronRight size={20} />
        </button>

        {/* Cards */}
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar px-8"
        >
          {filteredPGs.length === 0 && !loading && (
            <p className="text-gray-500">No PGs available</p>
          )}

          {filteredPGs.map((pg, index) => {
            const image =
              pg.media?.images?.[0] || '/images/pg-default.jpg'; // fallback image
            const sharingTypes =
              pg.pgDetails?.roomDetails?.map((room) => room.roomType) || [];
            const price = pg.pgDetails?.roomDetails?.[0]?.rent || 0;
            const initial = pg.pgDetails?.pgName?.charAt(0).toUpperCase() || '?';

            return (
              <div
                key={pg._id || index}
                className="bg-white rounded-xl shadow-md min-w-[260px] max-w-[260px] flex-shrink-0"
              >
                {/* Image */}
                <img
                  src={image}
                  alt={pg.pgDetails.pgName}
                  className="w-full h-40 object-cover rounded-t-xl"
                />

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    {/* Avatar Initial */}
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                      {initial}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold truncate">
                        {pg.pgDetails.pgName}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {pg.location?.name || 'Unknown Area'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-800">
                        ₹{price.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-gray-400">Onwards</p>
                    </div>
                  </div>

                  {/* Sharing */}
                  <div className="flex items-center gap-2 text-[12px] text-gray-700 mt-4">
                    <FaBed />
                    <p className="truncate">{sharingTypes.join(', ')}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NeighbourhoodPGs;
