import React from 'react';
import { NavLink, Stack } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { DEMO_NAV_LINKS } from './DemoLinks';
import { mq } from '../../../../config/theme';

const DemoSidebar = () => {
  const { pathname } = useLocation();

  return (
    <Stack
      sx={mq({
        flex: 1,
        maxWidth: 200,
        borderRight: 'solid 1px lightgrey',
        alignSelf: 'stretch',
        gap: 0,
        display: ['none', 'none', 'flex']
      })}
    >
      <Stack sx={{ gap: 0 }}>
        {DEMO_NAV_LINKS.public.map(link => (
          <NavLink
            active={link.isSelected(pathname)}
            component={Link}
            icon={link.icon}
            key={link.key}
            label={link.label}
            to={link.to}
            variant="subtle"
          />
        ))}
      </Stack>
    </Stack>
  );
};

DemoSidebar.propTypes = {};

export default DemoSidebar;
