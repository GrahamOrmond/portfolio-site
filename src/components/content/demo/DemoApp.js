import React, { useContext } from 'react';
import { Group, Stack } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthModal from './auth/AuthModal';
import CompaniesView from './companies/CompaniesView';
import DashboardView from './Dashboard/DashboardView';
import DemoHeader from './navigation/DemoHeader';
import DemoSidebar from './navigation/DemoSidebar';
import ProspectsView from './Prospects/ProspectsView';
import { mq } from '../../../config/theme';
import {
  Context as AuthContext,
  Provider as AuthProvider
} from '../../../providers/AuthProvider';

const DemoApp = () => {
  const { state } = useContext(AuthContext);

  return (
    <Stack
      className="demo-app"
      sx={mq({
        flex: 1,
        border: 'solid 1px lightgrey',
        borderRadius: 10,
        maxWidth: '100vw',
        minHeight: 800,
        maxHeight: ['unset', 800],
        overflow: 'hidden',
        gap: 0,
        position: 'relative'
      })}
    >
      <DemoHeader />
      <Group sx={{ flex: 1, gap: 0 }}>
        <DemoSidebar />
        <Stack
          sx={mq({
            flex: 1,
            alignSelf: 'stretch',
            maxHeight: ['unset', 750],
            minHeight: 750,
            overflow: 'auto',
            backgroundColor: '#f8f8f8'
          })}
        >
          <Routes>
            <Route element={<DashboardView />} path="/" />
            <Route element={<CompaniesView />} path="/companies/*" />
            <Route element={<ProspectsView />} path="/prospects/*" />
            <Route element={<Navigate replace to="/demo" />} path="*" />
          </Routes>
        </Stack>
      </Group>
      <AuthModal
        defaultView={state.defaultAuthModalView}
        isOpen={state.showAuthModal}
      />
    </Stack>
  );
};

export default () => (
  <AuthProvider>
    <ModalsProvider>
      <Notifications
        position="top-right"
        sx={{
          '&:first-of-type': {
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            maxWidth: 350
          }
        }}
        target=".demo-app"
      />
      <DemoApp />
    </ModalsProvider>
  </AuthProvider>
);
