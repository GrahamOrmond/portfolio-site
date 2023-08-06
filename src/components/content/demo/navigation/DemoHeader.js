import React, { useContext } from 'react';
import { Avatar, Button, Group, Menu, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { ChevronDown, Logout } from 'tabler-icons-react';
import { DEMO_NAV_LINKS } from './DemoLinks';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const DemoHeader = () => {
  const { state, toggleAuthModal, logout } = useContext(AuthContext);

  return (
    <Group
      sx={{
        height: 50,
        borderBottom: 'solid 1px lightgrey',
        gap: 0,
        justifyContent: 'space-between'
      }}
    >
      <Group
        sx={{
          alignSelf: 'stretch',
          width: 200
        }}
      >
        <Stack sx={{ padding: 10, gap: 0 }}>
          <Text weight={500}>Local Demo</Text>
        </Stack>
      </Group>
      <Group>
        {state.isAuthenticated ? (
          <Group sx={{ padding: 10 }}>
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Button compact rightIcon={<ChevronDown />} variant="outline">
                  <Group sx={{ gap: 10 }}>
                    <Avatar
                      color="blue"
                      radius={100}
                      size={20}
                      src={state.userData.avatar}
                    >
                      <Text>
                        {state.userData.firstName[0].toUpperCase()}
                        {state.userData.lastName[0].toUpperCase()}
                      </Text>
                    </Avatar>
                    <Text>My Account</Text>
                  </Group>
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                {DEMO_NAV_LINKS.public.map(link => (
                  <Menu.Item
                    component={Link}
                    icon={link.icon}
                    key={link.key}
                    to={link.to}
                  >
                    {link.label}
                  </Menu.Item>
                ))}

                <Menu.Divider />
                <Menu.Item icon={<Logout size={20} />} onClick={() => logout()}>
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ) : (
          <Group sx={{ padding: 10 }}>
            <Button
              compact
              onClick={() => toggleAuthModal(true, 'register')}
              variant="outline"
            >
              Sign Up
            </Button>
            <Button compact onClick={() => toggleAuthModal(true)}>
              Login
            </Button>
          </Group>
        )}
      </Group>
    </Group>
  );
};

DemoHeader.propTypes = {};

export default DemoHeader;
