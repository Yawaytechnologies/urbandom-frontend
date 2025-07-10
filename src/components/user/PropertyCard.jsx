const PropertyCard = ({ data }) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-md transition-all">
      <h3 className="text-lg font-semibold">{data.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{data.description}</p>
      <p className="text-emerald-600 font-bold mt-2">{data.price}</p>
    </div>
  );
};

export default PropertyCard;
