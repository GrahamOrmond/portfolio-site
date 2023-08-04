import React from 'react';
import { Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { mq } from '../../../config/theme';

const ProjectDisplayCard = ({ title, subTitle, description, links, image }) => {
  return (
    <Card
      radius="xl"
      shadow="xl"
      sx={mq({
        display: 'flex',
        flex: 1,
        padding: ['10px !important', '20px !important', '40px !important']
      })}
    >
      <Group
        noWrap
        sx={mq({
          gap: [20, 40, 60],
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: ['column', 'column', 'row']
        })}
      >
        <Stack style={{ flex: 1, alignItems: 'center' }}>
          <Card
            radius="lg"
            shadow="xl"
            style={{ padding: 0 }}
            sx={{ height: 450 }}
          >
            <Image
              height="auto"
              src={image}
              sx={{ position: 'relative', top: 0 }}
              width="100%"
            />
          </Card>
        </Stack>
        <Stack sx={mq({ gap: [10, 20, 20], flex: 1, alignItems: 'center' })}>
          <Stack sx={mq({ flex: 1, gap: [10, 15, 15] })}>
            <Stack sx={{ gap: 0 }}>
              <Text size={20} sx={{ textAlign: 'center' }} weight={700}>
                {title}
              </Text>
              {subTitle && (
                <Text
                  color="dodgerblue"
                  size={16}
                  sx={{ textAlign: 'center' }}
                  weight={700}
                >
                  {subTitle}
                </Text>
              )}
            </Stack>

            <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
              {description}
            </Text>
          </Stack>
          <Group>
            {links.map(link => (
              <Button
                component="a"
                href={link.to}
                key={link.to}
                rightIcon={<link.icon color="#1E90FF" size={20} />}
                sx={{ color: 'dodgerblue' }}
                target="_blank"
                variant="subtle"
              >
                {link.label}
              </Button>
            ))}
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

ProjectDisplayCard.propTypes = {
  description: PropTypes.string,
  image: PropTypes.string,
  links: PropTypes.array,
  subTitle: PropTypes.string,
  title: PropTypes.string
};

export default ProjectDisplayCard;
