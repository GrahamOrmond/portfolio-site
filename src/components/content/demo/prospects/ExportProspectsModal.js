import React from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import ResponsiveModal from '../../../common/ResponsiveModal';

const ExportProspectsModal = ({ isOpen, onClose, prospects }) => {
  const downloadCsv = () => {
    const csvData = prospects.map(p => [
      p.id,
      p.firstName,
      p.lastName,
      p.title,
      p.email,
      p.company.name,
      dayjs(p.createdAt).format('DD/MM/YYYY')
    ]);

    const csvContent = Papa.unparse({
      fields: [
        'Id',
        'First Name',
        'Last Name',
        'Title',
        'Email',
        'Company',
        'Date Created'
      ],
      data: csvData
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Prospects Export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ResponsiveModal
      centered
      onClose={onClose}
      opened={isOpen}
      size={450}
      styles={{
        overlay: { position: 'absolute' }
      }}
      target=".demo-app"
      title={<Title order={3}>Export Prospects</Title>}
      withinPortal
    >
      <Stack sx={{ gap: 0 }}>
        <Stack sx={{ gap: 20, padding: '30px 15px' }}>
          <Text sx={{ textAlign: 'center' }}>
            Are you sure you want to export <b>{prospects.length}</b>{' '}
            {prospects.length === 1 ? 'prospect' : 'prospects'}?
          </Text>
        </Stack>
        <Divider />
        <Group sx={{ flex: 1, padding: 15 }}>
          <Button color="dark" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              downloadCsv();
              onClose();
            }}
            style={{ flex: 1 }}
          >
            Export
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

ExportProspectsModal.propTypes = {
  isOpen: PropTypes.bool,
  prospects: PropTypes.array,
  onClose: PropTypes.func
};

export default ExportProspectsModal;
