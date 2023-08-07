import React from 'react';
import { Building, Dashboard, Users } from 'tabler-icons-react';

const DEMO_NAV_LINKS = {
  public: [
    {
      key: 'dashboard',
      label: 'Dashboard',
      to: '/demo',
      icon: <Dashboard />,
      isSelected: pathname => pathname === '/demo'
    },
    {
      key: 'companies',
      label: 'Companies',
      to: '/demo/companies',
      icon: <Building />,
      isSelected: pathname => pathname.startsWith('/demo/companies')
    },
    {
      key: 'prospects',
      label: 'Prospects',
      to: '/demo/prospects',
      icon: <Users />,
      isSelected: pathname => pathname.startsWith('/demo/prospects')
    }
  ]
};

export { DEMO_NAV_LINKS };
