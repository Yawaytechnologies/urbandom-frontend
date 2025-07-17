// src/components/BuyPage/SellPropertySection.jsx
import React from 'react';
import { motion } from 'framer-motion';

const SellPropertySection = () => {
  return (
    <section
      className="relative py-14 px-4 md:px-8 text-center overflow-hidden"
      style={{ background: 'linear-gradient(to right, #f4f6fc, #e1e9f6)' }}
    >
      {/* Decorative Top SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-0 rotate-180">
        <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-10 fill-white">
          <path d="M0.00,0.00 C150.00,100.00 350.00,-100.00 500.00,0.00 L500.00,50.00 L0.00,50.00 Z" />
        </svg>
      </div>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center mb-6"
      >
        <img
          src='/public/sellpage.jpeg'
          alt="Hand Holding Key"
          className="w-32 h-auto drop-shadow-xl"
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Have a property to <span className="text-purple-600">sell?</span>
        </h2>
        <p className="text-md text-gray-600 mb-6">
          List it on our platform and reach thousands of buyers instantly!
        </p>

        <button className="bg-purple-600 text-white hover:bg-purple-700 transition duration-300 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl">
          Sell Your Property
        </button>
      </motion.div>

      {/* Decorative Bottom SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg viewBox="0 0 500 50" preserveAspectRatio="none" className="w-full h-10 fill-white">
          <path d="M0.00,0.00 C150.00,100.00 350.00,-100.00 500.00,0.00 L500.00,50.00 L0.00,50.00 Z" />
        </svg>
      </div>
    </section>
  );
};

export default SellPropertySection;
