import React from 'react';
import {
  ActionIcon,
  Group,
  Footer as MantineFooter,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from './Links';
import { SOCIAL_ICONS } from '../../../config/constants';
import { mq } from '../../../config/theme';

const Footer = () => {
  return (
    <MantineFooter fixed={false} sx={{ flex: 1, position: 'relative' }}>
      <Stack
        sx={{
          flex: 1,
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Group
          sx={mq({
            maxWidth: 1100,
            width: '100%',
            alignSelf: 'center',
            gap: [20, 20, 20, 100],
            justifyContent: 'space-between',
            flexDirection: ['column', 'column', 'row'],
            placeItems: ['start', 'start', 'center']
          })}
        >
          <Group
            sx={mq({
              flexDirection: ['column', 'column', 'row'],
              alignItems: ['start', 'start', 'center']
            })}
          >
            {NAV_LINKS.public.map(link => (
              <Text
                color="grey"
                component={link.to ? Link : 'a'}
                href={link.href}
                key={link.key}
                to={link.to}
                weight={500}
              >
                {link.label}
              </Text>
            ))}
          </Group>

          <Group>
            {SOCIAL_ICONS.map(i => (
              <Tooltip key={i.key} label={i.label} position="top">
                <ActionIcon
                  color="dark"
                  component="a"
                  href={i.link}
                  radius="xl"
                  size={30}
                  target="_blank"
                  variant="transparent"
                >
                  {<i.icon size={30} />}
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>
        </Group>
      </Stack>
    </MantineFooter>
  );
};

Footer.propTypes = {};

export default Footer;
