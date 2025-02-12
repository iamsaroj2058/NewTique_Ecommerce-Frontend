import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className='bg-white text-black flex justify-between items-center py-4 px-10 shadow-md'>
      <div className='flex items-center'>
        <img src='/images/NavLogo.png' alt='Logo' className='w-12 rounded-full mr-3' />
      </div>
      <div className='flex space-x-6'>
        <Link to='/' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-300 transition'>Home</Link>
        <Link to='/about' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-300 transition'>About</Link>
        <Link to='/contact' className='text-black font-bold px-3 py-2 rounded hover:bg-gray-300 transition'>Contact</Link>
      </div>
    </nav>
  );
};

export default Header;
