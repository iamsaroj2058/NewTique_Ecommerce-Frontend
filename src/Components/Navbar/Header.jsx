import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  return (
    <nav className='bg-white text-black flex justify-between items-center h-16 w-full max-w-[1105px] mx-auto px-10'>
      {/* Logo Section */}
      <div className='flex items-center'>
        <img src='/images/NavLogo.png' alt='Logo' className='w-12 rounded-full mr-3' />
      </div>



      {/* Navigation Links */}
      <div className='flex gap-6'>
        <Link to='/' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-200 transition'>Home</Link>
        <Link to='/about' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-200 transition'>About</Link>
        <Link to='/contact' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-200 transition'>Contact</Link>
        <Link to='/signup' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-200 transition'>Sign Up</Link>
      </div>

      {/* Search Box, Wishlist & Add to Cart*/}
      {/*serchbox*/}
      <div class className = "flex items-center w-[347px] gap-[24px]">
        <div className='flex items-center border border-gray-300 rounded-md overflow-hidden w-[243px] text-[12px]'>
          <input
            type='text'
            placeholder='What are you looking for?'
            className='px-3 py-2 outline-none w-64'
          />
          <button className=' px-3 py-2 flex items-center justify-center'>
            <FaSearch className='text-gray-600 ' />
          </button>
        </div>
        {/*Wishlist & Add to Cart*/}
        <div className='flex items-center gap-[16px]'>
          <button className='text-gray-600 hover:text-red-500 transition text-xl'>
            <FaHeart />
          </button>
          <button className='text-gray-600 hover:text-blue-500 transition text-xl'>
            <FaShoppingCart />
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Header;
