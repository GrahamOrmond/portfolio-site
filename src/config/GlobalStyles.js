import React from 'react';
import { Global } from '@mantine/core';
import { mq } from './theme';

const GlobalStyles = () => {
  return (
    <Global
      styles={theme => ({
        'html, body, #root': {
          height: '100%',
          width: '100%',
          margin: 0,
          padding: 0,
          backgroundColor: '#FFF'
        },
        '.mantine-AppShell-body, .mantine-AppShell-main': mq({
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: [
            'calc(100vh - 380px)',
            'calc(100vh - 380px)',
            'calc(100vh - 200px)'
          ],
          flex: 1,
          paddingBottom: 0
        }),
        '.mantine-Select-itemsWrapper, 	.mantine-MultiSelect-itemsWrapper': {
          padding: '0px'
        }
      })}
    />
  );
};

export default GlobalStyles;
