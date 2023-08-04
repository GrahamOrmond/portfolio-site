import React from 'react';

const NAV_LINKS = {
  public: [
    {
      key: 'home',
      label: 'Home',
      href: '#home',
      icon: <></>,
      isSelected: hash => !hash || hash === '#home'
    },
    {
      key: 'about',
      label: 'About',
      href: '#about',
      icon: <></>,
      isSelected: hash => hash === '#about'
    },
    {
      key: 'projects',
      label: 'Projects',
      href: '#projects',
      icon: <></>,
      isSelected: hash => hash === '#projects'
    },
    {
      key: 'contact',
      label: 'Contact',
      href: '#contact',
      icon: <></>,
      isSelected: hash => hash === '#contact'
    }
  ]
};

export { NAV_LINKS };
