import React, { useEffect, useState } from 'react';
import {
  Header as MantineHeader,
  Group,
  Stack,
  Text,
  Drawer,
  ActionIcon,
  Divider,
  Button,
  Burger,
  NavLink
} from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'tabler-icons-react';
import { NAV_LINKS } from './Links';
import { mq } from '../../../config/theme';

const Header = () => {
  const { pathname } = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isPageAtTop, setIsPageAtTop] = useState(window.pageYOffset === 0);

  useEffect(() => {
    setIsPageAtTop(window.pageYOffset === 0);
    window.onscroll = () => setIsPageAtTop(window.pageYOffset === 0);

    return () => (window.onscroll = null);
  }, [pathname]);

  return (
    <MantineHeader
      fixed
      height={60}
      sx={mq({
        flex: 1,
        display: 'flex',
        padding: ['5px 20px', '5px 20px', '5px 20px', '5px 80px'],
        backgroundColor: isPageAtTop ? '#262626' : '#FFF',
        border: 'none'
      })}
    >
      <Group noWrap sx={{ flex: 1, justifyContent: 'space-between' }}>
        <Stack component={Link} sx={{ gap: 5, textDecoration: 'none' }} to="/">
          <Text
            color={isPageAtTop ? '#FFF' : '#000'}
            sx={mq({ fontSize: [18, 24, 24, 26], lineHeight: '20px' })}
            weight={700}
          >
            Graham Ormond
          </Text>
          <Text
            color={isPageAtTop ? '#FFF' : '#000'}
            sx={mq({ fontSize: 14, lineHeight: '20px' })}
          >
            Full-stack developer
          </Text>
        </Stack>
        <Group
          sx={mq({
            flex: 1,
            justifyContent: 'end',
            color: isPageAtTop ? '#FFF' : '#000',
            fontSize: 13,
            gap: 20,
            display: ['none', 'none', 'flex']
          })}
        >
          {NAV_LINKS.public.map(link => (
            <Stack key={link.key} sx={{ display: 'inline-block', fontSize: 0 }}>
              <Text
                component="a"
                href={link.href}
                sx={{
                  display: 'inline-block',
                  textAlign: 'center',
                  fontSize: 13,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
                weight={link.isSelected(pathname) ? 500 : 'normal'}
              >
                {link.label}
              </Text>
            </Stack>
          ))}
        </Group>
        <Group sx={mq({ marginRight: 5, display: ['flex', 'flex', 'none'] })}>
          <Drawer
            onClose={() => setMobileDrawerOpen(false)}
            opened={mobileDrawerOpen}
            position="right"
            size={'100%'}
            styles={{
              content: mq({
                maxWidth: ['100%', '320px !important'],
                backgroundColor: isPageAtTop ? '#262626' : '#FFF'
              }),
              body: {
                padding: 0,
                height: '100%'
              }
            }}
            withCloseButton={false}
          >
            <Stack sx={{ gap: 0, height: '100%' }}>
              <Group
                noWrap
                sx={{ padding: 10, justifyContent: 'space-between' }}
              >
                <Group noWrap>
                  <Link
                    onClick={() => setMobileDrawerOpen(false)}
                    style={{
                      textDecoration: 'none',
                      color: 'black'
                    }}
                    to="/lanes"
                  >
                    <Group
                      component={Link}
                      noWrap
                      sx={{ gap: 10, textDecoration: 'none' }}
                      to="/"
                    >
                      <Text
                        color={isPageAtTop ? '#FFF' : '#000'}
                        size={18}
                        weight={700}
                      >
                        Graham Ormond
                      </Text>
                    </Group>
                  </Link>
                </Group>
                <ActionIcon onClick={() => setMobileDrawerOpen(false)}>
                  <X />
                </ActionIcon>
              </Group>
              <Divider />
              <Stack sx={{ gap: 20, padding: 20 }}>
                <Button
                  component={Link}
                  onClick={() => setMobileDrawerOpen(false)}
                  sx={{
                    backgroundColor: '#ffdb4d',
                    '&:hover': {
                      backgroundColor: '#e6c545'
                    },
                    textTransform: 'uppercase',
                    color: '#000',
                    boxShadow: '1px 6px 12px 0px #828581',
                    fontSize: 16
                  }}
                  to="/contact-us"
                >
                  Log In
                </Button>
                <Button
                  color="dark"
                  component={Link}
                  onClick={() => setMobileDrawerOpen(false)}
                  sx={{
                    color: isPageAtTop ? '#FFF' : '#000',
                    border: isPageAtTop ? 'solid 1px #FFF' : 'solid 1px #000'
                  }}
                  to="/contact-us"
                  variant="outline"
                >
                  Register
                </Button>
              </Stack>

              <Divider />
              <Stack sx={{ padding: 10, gap: 5 }}>
                {NAV_LINKS.public.map(link => (
                  <NavLink
                    active={link.isSelected(pathname)}
                    color="yellow"
                    component={link.to ? Link : 'a'}
                    href={link.href}
                    icon={link.icon}
                    key={link.key}
                    label={link.label}
                    onClick={() => setMobileDrawerOpen(false)}
                    styles={{
                      root: {
                        backgroundColor: isPageAtTop
                          ? link.isSelected(pathname)
                            ? 'rgba(255, 249, 219, 1) !important'
                            : 'transparent !important'
                          : 'unset',
                        '&:hover': {
                          backgroundColor: isPageAtTop
                            ? 'rgba(255, 249, 219, 1) !important'
                            : 'rgba(255, 249, 219, 1) !important',
                          color: '#fab005'
                        }
                      }
                    }}
                    sx={{ color: isPageAtTop ? '#FFF' : '#000' }}
                    to={link.to}
                  />
                ))}
              </Stack>
              <Divider />
            </Stack>
          </Drawer>
          <Group position="center">
            <Burger
              color={isPageAtTop ? '#FFF' : '#000'}
              onClick={() => setMobileDrawerOpen(true)}
              opened={mobileDrawerOpen}
            />
          </Group>
        </Group>
      </Group>
    </MantineHeader>
  );
};

Header.propTypes = {};

export default Header;
