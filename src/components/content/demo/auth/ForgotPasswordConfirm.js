import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const ForgotPasswordConfirm = ({ onModalViewChange }) => {
  const { state, resetPassword } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    code: '12345',
    email: 'ormondwork@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    isLoading: false,
    error: ''
  });

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Reset Password</Title>
      </Stack>
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({ ...formState, isLoading: true, error: '' });
          resetPassword(
            {
              username: state.username ? state.username : formState.username,
              code: formState.code,
              newPassword: formState.password
            },
            () => {
              triggerNotification('Password Reset!', 'Success', 'green');
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
        {!state.username && (
          <TextInput
            disabled
            onChange={e => {}}
            required
            value={formState.email}
          />
        )}
        <TextInput
          autoComplete="on"
          disabled
          onChange={e => {}}
          required
          type="password"
          value={formState.password}
        />
        <TextInput
          autoComplete="on"
          disabled
          onChange={e => {}}
          required
          type="password"
          value={formState.confirmPassword}
        />
        <Button loading={formState.isLoading} type="submit">
          Continue
        </Button>

        <Text size={13} sx={{ marginTop: 10 }}>
          Remember your password?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('login')}
            sx={{ cursor: 'pointer' }}
          >
            Log in
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

ForgotPasswordConfirm.propTypes = {
  onModalViewChange: PropTypes.func
};

export default ForgotPasswordConfirm;
