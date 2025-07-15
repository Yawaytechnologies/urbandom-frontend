import React from "react";

const PropertyMap = () => {
  return (
    <section className="mb-12 p-0 sm:p-8 rounded-lg shadow-lg">
      {/* Map Container */}
      <div className="w-full h-80 sm:h-96 lg:h-[400px] rounded-lg overflow-hidden relative">
        <iframe
          title="Vengambakkam Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.568226197942!2d80.12517327483136!3d12.997019114879742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f6de33f0557%3A0x2e1a6808e1783fc2!2sVengambakkam%2C%20Tamil%20Nadu%20600127!5e0!3m2!1sen!2sin!4v1721028044575!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default PropertyMap;
