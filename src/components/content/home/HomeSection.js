import React from 'react';
import { Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';

const HomeSection = ({ id, title, header, image, children }) => {
  return (
    <Group
      id={id}
      sx={{
        justifyContent: 'center',
        alignItems: 'start',
        padding: '80px 80px'
      }}
    >
      <Stack sx={{ flex: 1, maxWidth: 1000 }}>
        <Group
          sx={{
            flex: 1,
            alignSelf: 'stretch'
          }}
        >
          {image && (
            <Stack style={{ flex: 1 }}>
              <Image height={300} src={image} width={300} />
            </Stack>
          )}

          <Stack style={{ flex: 1, gap: 0 }}>
            <Text color="dodgerblue" size={20} weight={700}>
              {header}
            </Text>
            <Stack sx={{ gap: 20 }}>
              <Text size={26} weight={900}>
                {title}
              </Text>
              {children}
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Group>
  );
};

HomeSection.propTypes = {
  children: PropTypes.any,
  header: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string
};

export default HomeSection;
