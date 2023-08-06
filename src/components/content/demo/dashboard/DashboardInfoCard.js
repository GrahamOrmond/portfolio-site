import React from 'react';
import { Card, Stack } from '@mantine/core';
import PropTypes from 'prop-types';

const DashboardInfoCard = ({ children }) => {
  return (
    <Card
      shadow="xl"
      style={{ padding: 0 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}
    >
      <Stack sx={{ flex: 1 }}>{children}</Stack>
    </Card>
  );
};

DashboardInfoCard.propTypes = {
  children: PropTypes.any
};

export default DashboardInfoCard;
