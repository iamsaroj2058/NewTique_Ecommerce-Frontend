import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Typography } from 'antd';

const { Text } = Typography;

const Header = () => {
  const menuItems = [
    {
      key: 'home',
      label: (
        <Link to='/'>
          <Text strong className='text-base md:text-lg'>Home</Text>
        </Link>
      ),
    },
    {
      key: 'about',
      label: (
        <Link to='/about'>
          <Text strong className='text-base md:text-lg'>About</Text>
        </Link>
      ),
    },
    {
      key: 'contact',
      label: (
        <Link to='/contact'>
          <Text strong className='text-base md:text-lg'>Contact</Text>
        </Link>
      ),
    },
    {
      key: 'signup',
      label: (
        <Link to='/signup'>
          <Text strong className='text-base md:text-lg'>Sign Up</Text>
        </Link>
      ),
    },
  ];

  return (
    <nav className='bg-white shadow-md w-full px-6 md:px-10 mb-[16px]'>
      <div className='flex justify-between items-center h-16 ml-[60px] mr-[60px]'>
        <div className='flex items-center'>
          <img src='/images/logo.png' alt='Logo' className='h-12 rounded-full' />
        </div>

        <Menu
          mode='horizontal'
          className='bg-white border-none flex gap-4 md:gap-6'
          items={menuItems} // ✅ new API
        />
      </div>
    </nav>
  );
};

export default Header;
