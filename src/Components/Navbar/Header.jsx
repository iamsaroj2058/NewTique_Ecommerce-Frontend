import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Typography } from 'antd';

const { Text } = Typography;

const Header = () => {
  return (
    <nav className='bg-white shadow-md w-full  mx-auto px-6 md:px-10 mb-[16px] flex flex-wrap justify-between items-center h-16'>
      {/* Logo Section */}
      <div className='flex items-center'>
        <img src='/images/logo.png' alt='Logo' className='w-12 rounded-full mr-3' />
      </div>

      {/* Navigation Links */}
      <Menu mode='horizontal' className='bg-white border-none flex gap-4 md:gap-6'>
        <Menu.Item key='home'>
          <Link to='/'>
            <Text strong className='text-base md:text-lg'>Home</Text>
          </Link>
        </Menu.Item>
        <Menu.Item key='about'>
          <Link to='/about'>
            <Text strong className='text-base md:text-lg'>About</Text>
          </Link>
        </Menu.Item>
        <Menu.Item key='contact'>
          <Link to='/contact'>
            <Text strong className='text-base md:text-lg'>Contact</Text>
          </Link>
        </Menu.Item>
        <Menu.Item key='signup'>
          <Link to='/signup'>
            <Text strong className='text-base md:text-lg'>Sign Up</Text>
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
};

export default Header;
