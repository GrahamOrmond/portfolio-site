import React, { useContext, useState } from 'react';
import { Alert, Button, Stack, Text, TextInput, Title } from '@mantine/core';
import PropTypes from 'prop-types';
import { AlertCircle } from 'tabler-icons-react';
import { Context as AuthContext } from '../../../../providers/AuthProvider';

const Login = ({ onModalViewChange }) => {
  const { login, toggleAuthModal } = useContext(AuthContext);
  const [formState, setFormState] = useState({
    username: 'ormondwork@gmail.com',
    password: '12345678',
    isLoading: false,
    error: null
  });

  return (
    <Stack sx={{ gap: 20 }}>
      <Stack sx={{ gap: 5 }}>
        <Title order={3}>Log In</Title>
      </Stack>
      <Stack
        component="form"
        onSubmit={e => {
          e.preventDefault();
          setFormState({
            ...formState,
            error: null,
            isLoading: true
          });
          login(
            formState,
            () => {
              toggleAuthModal(false);
            },
            message => {
              setFormState({
                ...formState,
                isLoading: false,
                error: message
              });
            }
          );
        }}
        sx={{ gap: 10 }}
      >
        <TextInput
          disabled
          onChange={e => {}}
          placeholder="Username"
          required
          value={formState.username}
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

        <Button loading={formState.isLoading} type="submit">
          Log In
        </Button>
        <Text size={13}>
          Forgot your{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('forgot-password')}
            sx={{ cursor: 'pointer' }}
          >
            password
          </Text>
          ?
        </Text>
        <Text size={13} sx={{ marginTop: 10 }}>
          Don't have an account?{' '}
          <Text
            color="dodgerblue"
            component="a"
            onClick={() => onModalViewChange('register')}
            sx={{ cursor: 'pointer' }}
          >
            Sign Up
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

Login.propTypes = {
  onModalViewChange: PropTypes.func
};

export default Login;
