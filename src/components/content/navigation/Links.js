import React from 'react';

const NAV_LINKS = {
  public: [
    {
      key: 'home',
      label: 'Home',
      to: '/',
      icon: <></>,
      isSelected: pathname => pathname === '/'
    },
    {
      key: 'about',
      label: 'About',
      to: '/about',
      icon: <></>,
      isSelected: pathname => pathname === '/about'
    },
    {
      key: 'Ssills',
      label: 'Skills',
      to: '/skills',
      icon: <></>,
      isSelected: pathname => pathname === '/skills'
    },
    {
      key: 'work',
      label: 'Work',
      to: '/work',
      icon: <></>,
      isSelected: pathname => pathname === '/work'
    },
    {
      key: 'experience',
      label: 'Experience',
      to: '/experience',
      icon: <></>,
      isSelected: pathname => pathname === '/experience'
    },
    {
      key: 'examples',
      label: 'Examples',
      to: '/examples',
      icon: <></>,
      isSelected: pathname => pathname === '/examples'
    },
    {
      key: 'contact',
      label: 'Contact',
      to: '/contact',
      icon: <></>,
      isSelected: pathname => pathname === '/contact'
    }
  ]
};

export { NAV_LINKS };
