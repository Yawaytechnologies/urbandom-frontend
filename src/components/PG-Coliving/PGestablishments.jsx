import React from "react";

const establishments = [
  {
    name: "PERINBA VILAS COMPLEX",
    icon: "/busStation.e7f5df3b.svg",
    color: "bg-pink-100",
  },
  {
    name: "Dhanavanthri nilayam ayurveda",
    icon: "/shoppingMall.eb656516.svg",
    color: "bg-blue-100",
  },
  {
    name: "Tejas CIMS",
    icon: "/doctor.23e7c0fc.svg",
    color: "bg-yellow-100",
  },
  {
    name: "Shenoy Nagar / Pulla Avenue",
    icon: "/busStation.e7f5df3b.svg",
    color: "bg-purple-100",
  },
];

const EstablishmentsSection = () => {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-semibold mb-6">
        Top Establishments <span className="font-bold">In The City</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl">
        {establishments.map((item, idx) => (
          <div
            key={idx}
            className={`group flex items-center gap-4 rounded-xl shadow-md overflow-hidden border transition-transform duration-300 hover:scale-[1.02]`}
          >
            {/* Colored left bar */}
            <div className={`w-2 h-full ${item.color}`}></div>

            {/* Icon and name */}
            <div className="flex items-center justify-between w-full px-4 py-3">
              <div>
                <h3 className="text-sm sm:text-base text-gray-800 font-medium truncate max-w-[14rem]">
                  {item.name}
                </h3>
              </div>
              <div className={`p-2 rounded-lg ${item.color}`}>
                <img src={item.icon} alt={item.name} className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EstablishmentsSection;
