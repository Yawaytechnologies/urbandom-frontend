import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-text-primary py-10 px-6 select-none cursor-default">
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
            <li>
              <a href="#" className="hover:underline hover:text-white transition">
                Post Property
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-white transition">
                User Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline hover:text-white transition">
                Co-living / PG
              </a>
            </li>
          </ul>
        </div>

        {/* Popular Cities */}
        <div>
          <h4 className="font-semibold text-base mb-2">Popular Cities</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Chennai</li>
            <li>Bangalore</li>
            <li>Hyderabad</li>
            <li>Pune</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold text-base mb-2">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Email: support@urbandom.com</li>
            <li>Phone: +91 70927 04551</li>
            <li>Address: Chennai, India</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-10 pt-4 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} <span className="font-semibold text-white">Urbandom.com</span> | All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
