import React from 'react';
import { Group, Image, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { mq } from '../../config/theme';

const DisplaySection = ({ id, title, header, image, children }) => {
  return (
    <Group
      id={id}
      style={{ flex: 1 }}
      sx={mq({
        justifyContent: 'center',
        alignItems: 'start',
        padding: [20, 40, 80]
      })}
    >
      <Stack style={{ flex: 1, maxWidth: 1100 }}>
        <Group
          style={{ flex: 1 }}
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

DisplaySection.propTypes = {
  children: PropTypes.any,
  header: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string
};

export default DisplaySection;
