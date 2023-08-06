import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const Register = ({ onModalViewChange }) => {
  const { signUp } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    email: 'ormondwork@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    error: '',
    isLoading: false
  });

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Sign Up</Title>
      </Stack>
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({
            ...formState,
            isLoading: true
          });
          signUp(
            formState,
            () => {
              onModalViewChange('confirm-code');
            },
            message => {
              setFormState({
                ...formState,
                error: message,
                isLoading: false
              });
            }
          );
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled
          onChange={e => {}}
          placeholder="Email"
          required
          type="email"
          value={formState.email}
        />
        <TextInput
          autoComplete="on"
          disabled
          onChange={e => {}}
          placeholder="Password"
          required
          type="password"
          value={formState.password}
        />
        <TextInput
          autoComplete="on"
          disabled
          onChange={e => {}}
          placeholder="Confirm Password"
          required
          type="password"
          value={formState.confirmPassword}
        />
        <Button loading={formState.isLoading} type="submit">
          Continue
        </Button>

        <Text size={13} sx={{ marginTop: 10 }}>
          Already have an account?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('login')}
            sx={{ cursor: 'pointer' }}
          >
            Log In
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

Register.propTypes = {
  onModalViewChange: PropTypes.func
};

export default Register;
