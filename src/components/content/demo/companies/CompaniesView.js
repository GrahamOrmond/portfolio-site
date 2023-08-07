import React from 'react';
import { Stack } from '@mantine/core';
import { Navigate, Route, Routes } from 'react-router-dom';
import CompanyDetails from './CompanyDetails';
import CompanyListView from './CompanyListView';

const CompaniesView = () => {
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
        <Route element={<CompanyListView />} path="/" />
        <Route element={<CompanyDetails />} path="/:id/*" />
        <Route element={<Navigate replace to="/demo/companies" />} path="*" />
      </Routes>
    </Stack>
  );
};

CompaniesView.propTypes = {};

export default CompaniesView;
