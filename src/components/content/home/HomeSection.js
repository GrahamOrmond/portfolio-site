import React from 'react';
import { Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { mq } from '../../../config/theme';

const HomeSection = ({ id, title, header, image, children }) => {
  return (
    <Group
      id={id}
      sx={mq({
        justifyContent: 'center',
        alignItems: 'start',
        padding: ['20px 20px', '40px 40px', '80px 80px']
      })}
    >
      <Stack sx={{ flex: 1, maxWidth: 1100 }}>
        <Group
          sx={mq({
            flex: 1,
            alignSelf: 'stretch',
            flexDirection: ['column', 'column', 'row']
          })}
        >
          {image && (
            <Stack style={{ flex: 1, alignItems: 'center' }}>
              <Image height={300} src={image} width={300} />
            </Stack>
          )}

          <Stack style={{ flex: 1, gap: 0, alignSelf: 'stretch' }}>
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
