import React from 'react';
import { Group, Stack, Text } from '@mantine/core';
import DemoApp from '../components/content/demo/DemoApp';
import { mq } from '../config/theme';

const DemoView = () => {
  return (
    <Stack style={{ flex: 1 }} sx={{ flex: 1, alignSelf: 'stretch', gap: 0 }}>
      <Group
        id="home"
        sx={mq({
          minHeight: 'calc(100vh - 135px)',
          justifyContent: 'center',
          alignItems: 'start',
          padding: [20, 40]
        })}
      >
        <Stack
          style={{ flex: 1 }}
          sx={mq({
            maxWidth: 1000,
            gap: [40, 40]
          })}
        >
          <Stack style={{ flex: 1, gap: 0, alignSelf: 'stretch' }}>
            <Text color="dodgerblue" size={20} weight={700}>
              Local Demo
            </Text>
            <Stack sx={{ gap: 40 }}>
              <Stack sx={{ gap: 20 }}>
                <Text size={26} weight={900}>
                  No Sign Up Required!
                </Text>
                <Group>
                  <DemoApp />
                </Group>
              </Stack>
              <Text color="grey" sx={{ textAlign: 'center' }} weight={500}>
                CRM demo with a built in prospect finder
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Group>
    </Stack>
  );
};

export default DemoView;
