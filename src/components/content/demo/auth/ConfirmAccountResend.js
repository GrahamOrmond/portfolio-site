import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const ConfirmAccountResend = ({ onModalViewChange }) => {
  const { sendConfirmationCode } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: 'ormondwork@gmail.com',
    isLoading: false,
    error: ''
  });
  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Resend Confirmation Code</Title>
      </Stack>
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({ ...formState, isLoading: true, error: '' });
          sendConfirmationCode(
            formState,
            () => onModalViewChange('confirm-code'),
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
          value={formState.email}
        />
        <Button loading={formState.isLoading} type="submit">
          Continue
        </Button>

        <Text size={13} sx={{ marginTop: 10 }}>
          Already have a code?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('confirm-code')}
            sx={{ cursor: 'pointer' }}
          >
            Confirm Account
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

ConfirmAccountResend.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ConfirmAccountResend;
