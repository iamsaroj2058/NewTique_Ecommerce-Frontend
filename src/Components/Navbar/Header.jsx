import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Typography } from 'antd';

const { Text } = Typography;

const Header = () => {
  return (
    <nav className='bg-white shadow-md w-full px-6 md:px-10 mb-[16px]'>
      {/* Main container with 60px margin on both sides */}
      <div className='flex justify-between items-center h-16 ml-[60px] mr-[60px]'>

        {/* Logo Section */}
        <div className='flex items-center'>
          <img src='/images/logo.png' alt='Logo' className='h-12 rounded-full' />
        </div>

        {/* Navigation Links with no extra space */}
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

      </div>
    </nav>
  );
};

export default Header;
