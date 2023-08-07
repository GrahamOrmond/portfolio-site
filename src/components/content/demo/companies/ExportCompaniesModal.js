import React from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import dayjs from 'dayjs';
import Papa from 'papaparse';
import PropTypes from 'prop-types';
import ResponsiveModal from '../../../common/ResponsiveModal';

const ExportCompaniesModal = ({ isOpen, onClose, companies }) => {
  const downloadCsv = () => {
    const csvData = companies.map(p => [
      p.id,
      p.name,
      p.domain,
      p.description,
      p.prospects.length,
      dayjs(p.createdAt).format('DD/MM/YYYY')
    ]);

    const csvContent = Papa.unparse({
      fields: [
        'Id',
        'Company Name',
        'Domain',
        'Description',
        'Prospect Count',
        'Date Created'
      ],
      data: csvData
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'Companies Export.csv';
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
      title={<Title order={3}>Export Companies</Title>}
      withinPortal
    >
      <Stack sx={{ gap: 0 }}>
        <Stack sx={{ gap: 20, padding: '30px 15px' }}>
          <Text sx={{ textAlign: 'center' }}>
            Are you sure you want to export <b>{companies.length}</b>{' '}
            {companies.length === 1 ? 'company' : 'companies'}?
          </Text>
        </Stack>
        <Divider />
        <Group sx={{ flex: 1, padding: 15 }}>
          <Button color="dark" onClick={onClose} sx={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              downloadCsv();
              onClose();
            }}
            sx={{ flex: 1 }}
          >
            Export
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

ExportCompaniesModal.propTypes = {
  companies: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default ExportCompaniesModal;
