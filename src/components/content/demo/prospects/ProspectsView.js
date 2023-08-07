import React from 'react';
import { Stack } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProspectDetails from './ProspectDetails';
import ProspectListView from './ProspectListView';

const ProspectsView = () => {
  return (
    <Stack
      sx={{
        flex: 1,
        alignSelf: 'stretch',
        gap: 0,
        maxHeight: '100%'
      }}
    >
      <Routes>
        <Route element={<ProspectListView />} path="/" />
        <Route element={<ProspectDetails />} path="/:id" />
        <Route element={<Navigate replace to="/demo/prospects" />} path="*" />
      </Routes>
    </Stack>
  );
};

ProspectsView.propTypes = {};

export default ProspectsView;
