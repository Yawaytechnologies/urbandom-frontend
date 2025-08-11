import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const links = {
  product: [
    { label: "Post Property", href: "#" },
    { label: "User Login", href: "#" },
    { label: "Co-living / PG", href: "#" },
    { label: "Owner Dashboard", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Buyers Guide", href: "#" },
    { label: "Renters Guide", href: "#" },
    { label: "Help Center", href: "#" },
  ],
  locations: ["Chennai", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
};

const SOCIALS = [
  { label: "Facebook", href: "#", node: <FaFacebookF size={14} /> },
  { label: "Twitter", href: "#", node: <FaTwitter size={14} /> },
  { label: "Instagram", href: "#", node: <FaInstagram size={14} /> },
  { label: "LinkedIn", href: "#", node: <FaLinkedinIn size={14} /> },
];

const Social = () => (
  <div className="flex items-center gap-3 mt-4">
    {SOCIALS.map(({ label, href, node }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        className="grid place-items-center size-9 rounded-full bg-white/10 text-white/80 hover:text-white hover:bg-white/20 transition ring-1 ring-white/10"
      >
        {node}
      </a>
    ))}
  </div>
);

const Footer = () => {
  return (
    <footer
      className="select-none cursor-default text-sm"
      style={{
        backgroundImage: "linear-gradient(to bottom, #1a1f3b, #2a2f5e, #3a3f7a)",
      }}
    >
      {/* Upper */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 12-col grid: brand=4, each column=2 (so four are even) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand + Newsletter (span 4) */}
          <div className="md:col-span-4 min-w-0">
            <div className="text-white">
              <div className="leading-tight">
                <div className="tracking-[0.14em] font-semibold">URBANDOM</div>
                <div className="tracking-[0.12em]">
                  <span className="bg-[#F5C518] text-black font-semibold px-1 rounded-[3px]">
                    REAL
                  </span>{" "}
                  ESTATE
                </div>
              </div>

              <p className="text-white/80 mt-4">
                Your trusted platform for buying and renting homes across India.
              </p>
            </div>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex items-center gap-2"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Get updates by email"
                className="w-full rounded-lg bg-white/10 text-white placeholder-white/60 px-3 py-2 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="rounded-lg bg-purple-600 text-white font-semibold px-3 py-2 hover:bg-purple-700 transition"
              >
                Subscribe
              </button>
            </form>

            <Social />
          </div>

          {/* Product (span 2) */}
          <div className="md:col-span-2 min-w-0">
            <h4 className="font-semibold mb-3 text-white">Product</h4>
            <ul className="space-y-2 text-white/80">
              {links.product.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources (span 2) */}
          <div className="md:col-span-2 min-w-0">
            <h4 className="font-semibold mb-3 text-white">Resources</h4>
            <ul className="space-y-2 text-white/80">
              {links.resources.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-white transition">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Cities (span 2) */}
          <div className="md:col-span-2 min-w-0">
            <h4 className="font-semibold mb-3 text-white">Popular Cities</h4>
            <ul className="space-y-2 text-white/80">
              {links.locations.map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
          </div>

          {/* Contact (span 2) */}
          <div className="md:col-span-2 min-w-0">
            <h4 className="font-semibold mb-3 text-white">Contact</h4>
            <ul className="space-y-2 text-white/80 break-words">
              <li>
                Email: <span className="break-words">support@urbandom.com</span>
              </li>
              <li>Phone: +91 70927 04551</li>
              <li>Chennai, India</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Lower Bar */}
      <div className="max-w-7xl mx-auto px-6 py-5 text-white/80 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="text-xs">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Urbandom Real Estate</span>. All rights
          reserved.
        </p>

        <div className="flex items-center gap-4 text-xs">
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms
          </a>
          <a href="#" className="hover:text-white transition">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

