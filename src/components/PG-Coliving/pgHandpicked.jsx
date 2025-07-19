import React from "react";

const CollectionsSection = () => {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-semibold mb-6">
        Our handpicked <span className="font-bold">Collections</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Card 1 */}
        <a
          href="#"
          className="relative overflow-hidden rounded-lg h-44 sm:h-56 shadow-md block"
        >
          <img
            src="/pgHand1.jpg"
            alt="For Guys"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">For Guys</h3>
          </div>
        </a>

        {/* Card 2 */}
        <a
          href="#"
          className="relative overflow-hidden rounded-lg h-44 sm:h-56 shadow-md block"
        >
          <img
            src="/pgHand2.jpg"
            alt="For Girls"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">For Girls</h3>
          </div>
        </a>

        {/* Card 3 */}
        <a
          href="#"
          className="relative overflow-hidden rounded-lg h-44 sm:h-56 shadow-md block"
        >
          <img
            src="/pgHand3.jpg"
            alt="Food Available"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">
              Food Available
            </h3>
          </div>
        </a>

        {/* Card 4 */}
        <a
          href="#"
          className="relative overflow-hidden rounded-lg h-44 sm:h-56 shadow-md block"
        >
          <img
            src="/pgHand4.jpg"
            alt="Private Room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white text-lg font-semibold">Private Room</h3>
          </div>
        </a>
      </div>
    </section>
  );
};

export default CollectionsSection;
