// src/components/Overview.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverviewHomeData } from '../../redux/actions/overviewHomeActions';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaHome, FaRupeeSign } from 'react-icons/fa';

const Overview = ({ propertyId: propId }) => {
  const dispatch = useDispatch();
  const { id: routeId } = useParams(); // fallback from route if not passed
  const propertyId = propId || routeId;

  const { dataMap, loading, error } = useSelector((state) => state.overviewHome);
  const property = dataMap[propertyId]; // 👈 get from map

  useEffect(() => {
    if (propertyId && !property) {
      dispatch(fetchOverviewHomeData(propertyId));
    }
  }, [dispatch, propertyId, property]);

  if (loading && !property) return <p className="text-center py-8">Loading...</p>;
  if (error && !property) return <p className="text-red-500 py-8">Error: {error}</p>;
  if (!property) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="w-full grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
  {property.media?.images?.length > 0 ? (
    property.media.images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Property Image ${index + 1}`}
        className="w-full h-48 object-cover rounded-md shadow-sm"
      />
    ))
  ) : (
    <img
      src="/fallback.jpg"
      alt="Fallback"
      className="w-full h-64 md:h-96 object-cover rounded-md shadow"
    />
  )}
</div>


        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-primary">{property.title}</h2>

          <div className="flex items-center gap-2 text-gray-600">
            <FaMapMarkerAlt className="text-accent" />
            <p className="text-sm">
              {property.location?.locationName}, {property.location?.district?.districtName}, {property.location?.state?.stateName}, {property.location?.country?.countryName}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mt-4">
            <div className="flex items-center gap-2">
              <FaHome className="text-secondary" />
              <span>{property.propertyType}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRupeeSign className="text-secondary" />
              <span>
                {property.lookingTo === 'sell' && `₹${property.priceDetails?.amount?.toLocaleString()}`}
                {property.lookingTo === 'rent' && `₹${property.priceDetails?.monthlyRent?.toLocaleString()} / month`}
                {property.lookingTo === 'pg-co/living' && `${property.pgDetails?.roomDetails?.length} PG Room(s)`}
              </span>
            </div>
          </div>

          <p className="text-gray-700 text-sm mt-2">{property.description}</p>

          {property.amenities?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">Amenities</h4>
              <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-700">
                {property.amenities.map((item, i) => (
                  <li key={i} className="bg-gray-100 px-3 py-1 rounded-md">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Overview;
