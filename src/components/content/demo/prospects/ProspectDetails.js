import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Anchor,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  TextInput
} from '@mantine/core';
import { Link, useParams } from 'react-router-dom';
import { Building, User } from 'tabler-icons-react';
import ProspectHeader from './ProspectHeader';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../../providers/PortfolioProvider';

const ProspectDetails = () => {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const { state, fetchProspect, updateProspect } = useContext(PortfolioContext);
  const [formState, setFormState] = useState({
    editable: false,
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    isLoading: false
  });
  const isLoading = !hasFetched.current || state.prospect.loading;
  const prospect =
    state.prospect.value?.id.toString() === id ? state.prospect.value : null;

  useEffect(() => {
    fetchProspect(id);
    hasFetched.current = true;
  }, [id]);

  useEffect(() => {
    if (prospect) {
      setFormState({
        editable: false,
        firstName: prospect.firstName,
        lastName: prospect.lastName,
        email: prospect.email,
        title: prospect.title,
        isLoading: false
      });
    }
  }, [prospect]);

  return (
    <>
      <ProspectHeader prospect={prospect} />

      {prospect && (
        <Stack
          sx={{
            flex: 1,
            alignSelf: 'stretch',
            gap: 20,
            padding: 10,
            paddingTop: 0
          }}
        >
          <Card shadow="xl" style={{ padding: 0 }}>
            <Stack
              component="form"
              onSubmit={e => {
                e.preventDefault();
                setFormState({
                  ...formState,
                  isLoading: true
                });
                updateProspect(
                  prospect.id,
                  formState,
                  () => {
                    setFormState({
                      ...formState,
                      editable: false,
                      isLoading: false
                    });
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
              sx={{ flex: 1, gap: 0 }}
            >
              <Group sx={{ padding: 10, justifyContent: 'space-between' }}>
                <Text weight={500}>Details</Text>
                <Group>
                  {!formState.editable ? (
                    <Button
                      compact
                      disabled={formState.isLoading}
                      onClick={() =>
                        setFormState({
                          ...formState,
                          editable: true
                        })
                      }
                      type="button"
                      variant="outline"
                    >
                      Edit
                    </Button>
                  ) : (
                    <>
                      <Button
                        color="dark"
                        compact
                        disabled={formState.isLoading}
                        onClick={() =>
                          setFormState({
                            editable: false,
                            firstName: prospect.firstName,
                            lastName: prospect.lastName,
                            email: prospect.email,
                            title: prospect.title,
                            isLoading: false
                          })
                        }
                        type="button"
                      >
                        Cancel
                      </Button>
                      <Button
                        compact
                        loading={formState.isLoading}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </>
                  )}
                </Group>
              </Group>
              <Divider color="#dee2e6" />
              <Stack sx={{ padding: 10 }}>
                <Group noWrap>
                  <Avatar radius={100} size={100}>
                    <User size={60} />
                  </Avatar>
                  {formState.editable ? (
                    <Stack style={{ gap: 10, flex: 1 }}>
                      <Group noWrap sx={{ flex: 1 }}>
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              firstName: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="First Name"
                          required={!formState.lastName}
                          style={{ flex: 1 }}
                          value={formState.firstName}
                        />
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              lastName: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="Last Name"
                          required={!formState.firstName}
                          style={{ flex: 1 }}
                          value={formState.lastName}
                        />
                      </Group>
                      <Group noWrap sx={{ flex: 1 }}>
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              title: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="Title"
                          style={{ flex: 1 }}
                          value={formState.title}
                        />
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              email: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="Email"
                          style={{ flex: 1 }}
                          type="email"
                          value={formState.email}
                        />
                      </Group>
                    </Stack>
                  ) : (
                    <Group noWrap sx={{ gap: 20 }}>
                      <Stack sx={{ gap: 0, flex: 1 }}>
                        <Text size={20} weight={500}>
                          {prospect.firstName} {prospect.lastName}
                        </Text>
                        <Text size={14} weight={500}>
                          {prospect.title}
                        </Text>
                        <Anchor
                          href={`mailto:${prospect.email}`}
                          sx={{ fontSize: 14 }}
                          target="_blank"
                        >
                          {prospect.email}
                        </Anchor>
                      </Stack>
                    </Group>
                  )}
                </Group>
              </Stack>
            </Stack>
          </Card>

          <Card shadow="xl" style={{ padding: 0 }}>
            <Stack sx={{ flex: 1, gap: 0 }}>
              <Group sx={{ padding: 10, justifyContent: 'space-between' }}>
                <Text weight={500}>Company</Text>
                <Button
                  compact
                  component={Link}
                  to={`/demo/companies/${prospect.company.id}`}
                  variant="outline"
                >
                  View
                </Button>
              </Group>
              <Divider color="#dee2e6" />
              <Stack sx={{ padding: 10 }}>
                <Group noWrap>
                  <Avatar radius={100} size={100}>
                    <Building size={60} />
                  </Avatar>
                  <Group noWrap sx={{ gap: 20 }}>
                    <Stack sx={{ gap: 0, flex: 1 }}>
                      <Text size={20} weight={500}>
                        {prospect.company.name}
                      </Text>
                      <Anchor
                        href={prospect.company.domain}
                        sx={{ fontSize: 14 }}
                        target="_blank"
                      >
                        {prospect.company.domain}
                      </Anchor>
                    </Stack>
                    <Stack sx={{ gap: 0, flex: 2 }}>
                      <Text size={13}>{prospect.company.description}</Text>
                    </Stack>
                  </Group>
                </Group>
              </Stack>
            </Stack>
          </Card>
        </Stack>
      )}
    </>
  );
};

ProspectDetails.propTypes = {};

export default ProspectDetails;
