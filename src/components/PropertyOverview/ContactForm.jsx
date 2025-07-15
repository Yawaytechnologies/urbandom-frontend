import React from "react";
import { FaWhatsapp, FaCheck } from "react-icons/fa";

const ContactForm = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-md p-5 text-gray-800">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">Contact Seller</h2>

      {/* Developer Info */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-500 text-white rounded-md w-10 h-10 flex items-center justify-center font-bold text-sm">
          DE
        </div>
        <div>
          <p className="text-sm font-medium">Deccan Estates Pvt Ltd</p>
          <p className="text-xs text-gray-500">Developer</p>
          <p className="text-sm font-semibold text-black mt-1">+9178258.....</p>
        </div>
      </div>

      {/* Contact Prompt */}
      <p className="text-sm mb-3 font-medium">Please share your contact</p>

      {/* Form */}
      <form className="space-y-5 text-sm">
        {/* Name */}
        <div>
          <label className="block mb-1 text-gray-600">Name</label>
          <div className="flex items-center border-b border-gray-300">
            <input
              type="text"
              placeholder="Enter your name"
              className="flex-1 bg-transparent outline-none py-1"
              defaultValue="Name"
            />
            <FaCheck className="text-purple-600" />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 text-gray-600">Phone</label>
          <div className="flex items-center border-b border-gray-300">
            <span className="pr-2 text-gray-800 font-medium">+91</span>
            <input
              type="tel"
              placeholder="Enter phone number"
              className="flex-1 bg-transparent outline-none py-1"
              defaultValue="############"
            />
            <FaCheck className="text-purple-600" />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <div className="flex items-center border-b border-gray-300">
            <input
              type="email"
              placeholder="Enter email (optional)"
              className="flex-1 bg-transparent outline-none py-1"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2 mt-2">
          <input
            type="checkbox"
            id="agree"
            defaultChecked
            className="accent-purple-600 mt-1"
          />
          <label htmlFor="agree" className="text-sm leading-tight text-gray-800">
            I agree to be contacted by Housing and agents via{" "}
            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
              <FaWhatsapp className="inline-block" /> WhatsApp
            </span>
            , SMS, phone, email etc
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 bg-purple-600 text-white font-medium rounded-full shadow-md hover:bg-purple-700 transform hover:scale-105 transition-all duration-300"
        >
          Get Contact Details
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
