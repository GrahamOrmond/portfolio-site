import React, { useContext, useState } from 'react';
import {
  ActionIcon,
  Avatar,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
  UnstyledButton
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Logout, X } from 'tabler-icons-react';
import { DEMO_NAV_LINKS } from './DemoLinks';
import { mq } from '../../../../config/theme';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const DemoHeader = () => {
  const { pathname } = useLocation();
  const { state, toggleAuthModal, logout } = useContext(AuthContext);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
          <Link
            style={{
              textDecoration: 'none',
              color: 'black'
            }}
            to="/demo"
          >
            <Group
              sx={{
                gap: 1,
                flexWrap: 'nowrap'
              }}
            >
              <Text size={16} weight={700}>
                Local Demo
              </Text>
            </Group>
          </Link>
        </Stack>
      </Group>
      <Group sx={mq({ display: ['none', 'none', 'flex'] })}>
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

      <Group sx={mq({ marginRight: 5, display: ['flex', 'flex', 'none'] })}>
        <Drawer
          onClose={() => setMobileDrawerOpen(false)}
          opened={mobileDrawerOpen}
          position="right"
          size={'100%'}
          styles={{
            content: mq({
              maxWidth: ['100%', '320px !important']
            }),
            body: {
              padding: 0,
              height: '100%'
            },
            overlay: { position: 'absolute' },
            inner: { position: 'absolute' }
          }}
          target=".demo-app"
          withCloseButton={false}
        >
          <Stack sx={{ gap: 0, height: '100%' }}>
            <Group sx={{ padding: 10, justifyContent: 'space-between' }}>
              <Group>
                <Link
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    textDecoration: 'none',
                    color: 'black'
                  }}
                  to="/demo"
                >
                  <Group
                    sx={{
                      gap: 1,
                      flexWrap: 'nowrap'
                    }}
                  >
                    <Text size={16} weight={700}>
                      Local Demo
                    </Text>
                  </Group>
                </Link>
              </Group>
              <ActionIcon onClick={() => setMobileDrawerOpen(false)}>
                <X />
              </ActionIcon>
            </Group>
            <Divider />
            {state.isAuthenticated ? (
              <Stack sx={{ padding: 10, paddingBottom: 13 }}>
                <UnstyledButton
                  component={Link}
                  onClick={() => setMobileDrawerOpen(false)}
                  to={`profile/${state.userData.username}`}
                >
                  <Group sx={{ gap: 10 }}>
                    <Avatar color="dark" radius={100} size={40} />
                    <Stack sx={{ gap: 0 }}>
                      <Text sx={{ lineHeight: '16px' }} weight={500}>
                        {state.userData.firstName} {state.userData.lastName}
                      </Text>
                      <Text
                        color="dimmed"
                        size="xs"
                        sx={{ lineHeight: '16px' }}
                      >
                        {state.userData.email}
                      </Text>
                    </Stack>
                  </Group>
                </UnstyledButton>
              </Stack>
            ) : (
              <Stack sx={{ padding: 10 }}>
                <Button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    toggleAuthModal(true);
                  }}
                  sx={{ height: 40 }}
                >
                  Log In
                </Button>
              </Stack>
            )}
            <Divider />
            <Stack sx={{ padding: 10, gap: 5 }}>
              {DEMO_NAV_LINKS.public.map(link => (
                <NavLink
                  active={link.isSelected(pathname)}
                  component={Link}
                  icon={link.icon}
                  key={link.key}
                  label={link.label}
                  onClick={() => setMobileDrawerOpen(false)}
                  sx={{ color: 'black' }}
                  to={link.to}
                />
              ))}
            </Stack>
            <Divider />

            {state.isAuthenticated && (
              <>
                <Stack sx={{ gap: 0, flex: 1, justifyContent: 'end' }}>
                  <Divider />

                  <Stack sx={{ padding: 20 }}>
                    <Button
                      onClick={() => {
                        logout();
                      }}
                      variant="outline"
                    >
                      Logout
                    </Button>
                  </Stack>
                </Stack>
              </>
            )}
          </Stack>
        </Drawer>

        <Group position="center">
          <Burger
            onClick={() => setMobileDrawerOpen(true)}
            opened={mobileDrawerOpen}
          />
        </Group>
      </Group>
    </Group>
  );
};

DemoHeader.propTypes = {};

export default DemoHeader;
