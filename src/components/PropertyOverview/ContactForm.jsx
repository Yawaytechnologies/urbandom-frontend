import React from "react";

const ContactForm = () => {
  return (
    <section className="mb-12 bg-gray-100 p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact / Enquire</h2>
      <form className="space-y-6 max-w-lg mx-auto">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-lg font-semibold text-gray-700">Your Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-lg font-semibold text-gray-700">Your Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-4 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg text-lg font-medium transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
