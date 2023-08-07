import React, { useContext, useEffect, useState } from 'react';
import { Button, Divider, Group, Stack, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../../providers/PortfolioProvider';
import ResponsiveModal from '../../../common/ResponsiveModal';

const AddCompanyModal = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const { createCompany } = useContext(PortfolioContext);
  const [formState, setFormState] = useState({
    name: '',
    domain: '',
    isLoading: false
  });

  useEffect(() => {
    if (isOpen) {
      setFormState({
        name: '',
        domain: '',
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
      title={<Title order={3}>Add Company</Title>}
    >
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();

          setFormState({
            ...formState,
            isLoading: true
          });
          createCompany(
            formState,
            company => {
              onClose();
              navigate(`/demo/companies/${company.id}`);
            },
            errorMessage => {
              triggerNotification(errorMessage);
              setFormState({
                ...formState,
                isLoading: false
              });
            }
          );
        }}
        sx={{ gap: 0, flex: 1 }}
      >
        <Stack sx={{ gap: 20, padding: 15 }}>
          <TextInput
            disabled={formState.isLoading}
            onChange={e =>
              setFormState({
                ...formState,
                name: e.currentTarget.value
              })
            }
            placeholder="Company Name"
            radius="md"
            required
            value={formState.name}
          />
          <TextInput
            disabled={formState.isLoading}
            onChange={e =>
              setFormState({
                ...formState,
                domain: e.currentTarget.value
              })
            }
            placeholder="Domain"
            radius="md"
            value={formState.domain}
          />
        </Stack>

        <Divider />

        <Group sx={{ padding: 15 }}>
          <Button
            color="dark"
            disabled={formState.isLoading}
            onClick={onClose}
            sx={{ flex: 1 }}
            type="button"
          >
            Cancel
          </Button>
          <Button loading={formState.isLoading} sx={{ flex: 1 }} type="submit">
            Add
          </Button>
        </Group>
      </Stack>
    </ResponsiveModal>
  );
};

AddCompanyModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default AddCompanyModal;
