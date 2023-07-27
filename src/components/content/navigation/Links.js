import React from 'react';

const NAV_LINKS = {
  public: [
    {
      key: 'home',
      label: 'Home',
      href: '#home',
      icon: <></>,
      isSelected: pathname => pathname === '/'
    },
    {
      key: 'about',
      label: 'About',
      href: '#about',
      icon: <></>,
      isSelected: pathname => pathname === '/about'
    },
    {
      key: 'contact',
      label: 'Contact',
      href: '#contact',
      icon: <></>,
      isSelected: pathname => pathname === '/contact'
    }
  ]
};

export { NAV_LINKS };
