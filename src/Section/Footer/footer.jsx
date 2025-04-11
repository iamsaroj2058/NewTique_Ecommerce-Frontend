import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-orange-500 w-full px-10 py-12 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1: Logo + About */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="text-2xl font-bold">NewTique</span>
          </div>
          <p className="text-sm">
            Your go-to destination for deals, new arrivals, and exclusive flash sales.
          </p>
        </div>

        {/* Column 2: Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Shop</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Column 3: Subscribe */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded bg-gray-800 text-orange-200 placeholder-orange-300 outline-none"
            />
            <button
              type="submit"
              className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-orange-600 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="mt-10 border-t border-orange-800 pt-6 text-center text-sm text-orange-400">
        © {new Date().getFullYear()} NewTique. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
