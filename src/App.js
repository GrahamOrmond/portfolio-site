import React from 'react';
import { AppShell, Box, MantineProvider, Stack } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import Footer from './components/content/navigation/Footer';
import Header from './components/content/navigation/Header';
import GlobalStyles from './config/GlobalStyles';
import { theme } from './config/theme';
import { Provider as PortfolioProvider } from './providers/PortfolioProvider';
import AboutView from './views/AboutView';
import HomeView from './views/HomeView';

const App = () => {
  return (
    <AppShell
      footer={<Footer />}
      header={<Header />}
      padding={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%',
        justifyContent: 'space-between'
      }}
    >
      <Box
        sx={{
          flex: 1,
          flexDirection: 'column',
          display: 'flex'
        }}
      >
        <Stack
          sx={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <Routes>
            <Route element={<HomeView />} path="/" />
            <Route element={<AboutView />} path="/about" />
            <Route element={<Navigate replace to="/" />} path="*" />
          </Routes>
        </Stack>
      </Box>
    </AppShell>
  );
};

export default () => (
  <PortfolioProvider>
    <MantineProvider theme={theme}>
      <Notifications position="top-right" />
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </MantineProvider>
  </PortfolioProvider>
);
