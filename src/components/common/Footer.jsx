import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--primary)',
        color: 'var(--text-primary)',
      }}
      className="py-10 px-6 select-none cursor-default"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        {/* Company Info */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Urbandom.com</h3>
          <p className="text-gray-400">
            Your trusted platform for buying and renting homes across India.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-base mb-2">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            {['Post Property', 'User Login', 'Co-living / PG'].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Cities */}
        <div>
          <h4 className="font-semibold text-base mb-2">Popular Cities</h4>
          <ul className="space-y-2 text-gray-300">
            {['Chennai', 'Bangalore', 'Hyderabad', 'Pune'].map((city) => (
              <li key={city}>{city}</li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-base mb-2">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Email: support@urbandom.com</li>
            <li>Phone: +91 70927 04551</li>
            <li>Address: Chennai, India</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 text-white">
            <a href="#" className="hover:text-gray-300 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-gray-300 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mt-10 pt-4 text-center text-xs border-t border-white/10 text-gray-400 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0"
      >
        <p>
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-white">Urbandom.com</span> | All rights reserved.
        </p>
        <div className="space-x-4">
          <a href="#" className="hover:text-white transition">Privacy Policy</a>
          <a href="#" className="hover:text-white transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
