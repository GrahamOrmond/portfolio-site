import React from 'react';
import { Button, Card, Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const ProjectDisplayCard = ({ title, description, links, image }) => {
  return (
    <Card
      radius="xl"
      shadow="xl"
      style={{ padding: 40 }}
      sx={{ display: 'flex', flex: 1 }}
    >
      <Group noWrap sx={{ gap: 20, flex: 1, alignSelf: 'stretch' }}>
        <Stack style={{ flex: 1, alignItems: 'center' }}>
          <Image height={300} src={image} width={300} />
        </Stack>
        <Stack sx={{ gap: 20, flex: 1, alignItems: 'center' }}>
          <Stack style={{ flex: 1 }}>
            <Text size={20} sx={{ textAlign: 'center' }} weight={700}>
              {title}
            </Text>
            <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
              {description}
            </Text>
          </Stack>
          <Group>
            {links.map(link => (
              <Button
                key={link.to}
                rightIcon={<link.icon color="#1E90FF" size={20} />}
                sx={{ color: 'dodgerblue' }}
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
  title: PropTypes.string
};

export default ProjectDisplayCard;
