import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Group,
  Select,
  Stack,
  TextInput,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../providers/PortfolioProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const AddProspectModal = ({ onClose, onAdd, isOpen, fkCompany }) => {
  const navigate = useNavigate();
  const { state, createProspects, fetchCompanies } =
    useContext(PortfolioContext);
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    fkCompany: '',
    isLoading: false
  });

  const companyOptions = state.companies.value.map(c => ({
    label: c.name,
    value: c.id
  }));

  useEffect(() => {
    if (isOpen) {
      fetchCompanies({});

      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        fkCompany: fkCompany ?? '',
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
      title={<Title order={3}>Add Prospect</Title>}
      withinPortal
    >
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();

          setFormState({
            ...formState,
            isLoading: true
          });
          createProspects(
            { prospects: [formState] },
            prospects => {
              if (fkCompany || prospects.length > 1) {
                onClose();
              } else {
                onClose();
                navigate(`/demo/prospects/${prospects[0].id}`);
              }

              if (onAdd) {
                onAdd();
              }
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
          <Select
            clearable
            data={companyOptions}
            disabled={formState.isLoading || fkCompany}
            onChange={value =>
              setFormState({
                ...formState,
                fkCompany: value
              })
            }
            placeholder="Company"
            required
            searchable
            value={formState.fkCompany}
          />
          <Group style={{ flex: 1 }}>
            <TextInput
              disabled={formState.isLoading}
              onChange={e =>
                setFormState({
                  ...formState,
                  firstName: e.currentTarget.value
                })
              }
              placeholder="First Name"
              radius="md"
              required={!formState.lastName}
              sx={{ flex: 1 }}
              value={formState.firstName}
            />
            <TextInput
              disabled={formState.isLoading}
              onChange={e =>
                setFormState({
                  ...formState,
                  lastName: e.currentTarget.value
                })
              }
              placeholder="Last Name"
              radius="md"
              sx={{ flex: 1 }}
              value={formState.lastName}
            />
          </Group>
          <TextInput
            disabled={formState.isLoading}
            onChange={e =>
              setFormState({
                ...formState,
                email: e.currentTarget.value
              })
            }
            placeholder="Email"
            radius="md"
            type="email"
            value={formState.email}
          />
          <TextInput
            disabled={formState.isLoading}
            onChange={e =>
              setFormState({
                ...formState,
                title: e.currentTarget.value
              })
            }
            placeholder="Title"
            radius="md"
            value={formState.title}
          />
        </Stack>

        <Divider />
        <Group sx={{ flex: 1, padding: 15 }}>
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

AddProspectModal.propTypes = {
  fkCompany: PropTypes.number,
  isOpen: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func
};

export default AddProspectModal;
