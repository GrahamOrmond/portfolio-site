import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const ConfirmAccount = ({ onModalViewChange }) => {
  const { state, confirmAccount } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    code: '12345',
    isLoading: false
  });
  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Confirm Account</Title>
      </Stack>
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({ ...formState, isLoading: true, error: '' });
          confirmAccount(
            { username: state.username, code: formState.code },
            () => {
              triggerNotification('Account Confirmed!', 'Success', 'green');
              onModalViewChange('login');
            },
            message =>
              setFormState({ ...formState, isLoading: false, error: message })
          );
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled
          onChange={e => {}}
          required
          value={formState.code}
        />
        <Button loading={formState.isLoading} type="submit">
          Continue
        </Button>

        <Text size={13} sx={{ marginTop: 10 }}>
          Don't have a code?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('confirm-resend')}
            sx={{ cursor: 'pointer' }}
          >
            Resend
          </Text>
        </Text>
        {formState.error && (
          <Alert
            color="red"
            icon={<AlertCircle />}
            sx={{ marginTop: 10 }}
            variant={'outline'}
          >
            <Text weight={500}>{formState.error}</Text>
          </Alert>
        )}
      </Stack>
    </Stack>
  );
};

ConfirmAccount.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ConfirmAccount;
