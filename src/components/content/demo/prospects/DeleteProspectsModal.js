import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Group, Stack, Text, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../../providers/PortfolioProvider';
import ResponsiveModal from '../../../common/ResponsiveModal';

const DeleteProspectsModal = ({ isOpen, onClose, prospects, onDelete }) => {
  const { deleteProspects } = useContext(PortfolioContext);
  const [modalState, setModalState] = useState({
    count: 0,
    isLoading: false
  });

  useEffect(() => {
    if (isOpen) {
      setModalState({
        count: prospects.length,
        isLoading: false
      });
    }
  }, [isOpen]);

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
            Are you sure you want to delete <b>{modalState.count}</b>{' '}
            {modalState.count === 1 ? 'prospect' : 'prospects'}?
          </Text>
        </Stack>
        <Divider />
        <Group sx={{ flex: 1, padding: 15 }}>
          <Button
            color="dark"
            disabled={modalState.isLoading}
            onClick={onClose}
            sx={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            color="red"
            loading={modalState.isLoading}
            onClick={() => {
              setModalState({
                ...modalState,
                isLoading: true
              });
              deleteProspects(
                prospects.map(p => p.id),
                () => {
                  onDelete();
                },
                error => {
                  triggerNotification(error);
                  setModalState({
                    ...modalState,
                    isLoading: false
                  });
                }
              );
            }}
            sx={{ flex: 1 }}
          >
            Delete
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

DeleteProspectsModal.propTypes = {
  isOpen: PropTypes.bool,
  prospects: PropTypes.array,
  onClose: PropTypes.func,
  onDelete: PropTypes.func
};

export default DeleteProspectsModal;
