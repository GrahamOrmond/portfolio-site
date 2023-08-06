import React from 'react';
import { Stack } from '@mantine/core';
import ProspectHeader from './ProspectHeader';
import ProspectList from '../ProspectList';

const ProspectListView = () => {
  return (
    <>
      <ProspectHeader />
      <Stack
        sx={{
          backgroundColor: '#FFF',
          flex: 1,
          alignSelf: 'stretch',
          gap: 0,
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <ProspectList />
      </Stack>
    </>
  );
};

ProspectListView.propTypes = {};

export default ProspectListView;
