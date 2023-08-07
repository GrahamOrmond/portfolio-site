import React from 'react';
import { Stack } from '@mantine/core';
import CompanyHeader from './CompanyHeader';
import CompanyList from '../CompanyList';

const CompanyListView = () => {
  return (
    <>
      <CompanyHeader />
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
        <CompanyList />
      </Stack>
    </>
  );
};

CompanyListView.propTypes = {};

export default CompanyListView;
