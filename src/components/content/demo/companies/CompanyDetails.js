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
  TextInput,
  Textarea
} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { Building, Plus, Search } from 'tabler-icons-react';
import CompanyHeader from './CompanyHeader';
import { triggerNotification } from '../../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../../providers/PortfolioProvider';
import ProspectList from '../ProspectList';

const CompanyDetails = () => {
  const { id } = useParams();
  const hasFetched = useRef(false);
  const { state, fetchCompany, updateCompany } = useContext(PortfolioContext);
  const [prospectModalState, setProspectModalState] = useState({
    isOpen: false,
    action: ''
  });
  const [formState, setFormState] = useState({
    editable: false,
    name: '',
    domain: '',
    description: '',
    isLoading: false
  });
  const company =
    state.company.value?.id.toString() === id ? state.company.value : null;

  useEffect(() => {
    fetchCompany(id);
    hasFetched.current = true;
  }, [id]);

  useEffect(() => {
    if (company) {
      setFormState({
        editable: false,
        name: company.name,
        domain: company.domain,
        description: company.description,
        isLoading: false
      });
    }
  }, [company]);

  return (
    <>
      <CompanyHeader company={state.company.value} />

      {company && (
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
                updateCompany(
                  company.id,
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
                            name: company.name,
                            domain: company.domain,
                            description: company.description,
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
                    <Building size={60} />
                  </Avatar>
                  {formState.editable ? (
                    <Group noWrap style={{ gap: 20, flex: 1 }}>
                      <Stack sx={{ gap: 10, flex: 1 }}>
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              name: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="Company Name"
                          required
                          sx={{ flex: 1 }}
                          value={formState.name}
                        />
                        <TextInput
                          onChange={e =>
                            setFormState({
                              ...formState,
                              domain: e.currentTarget.value.substring(0, 255)
                            })
                          }
                          placeholder="domain"
                          sx={{ flex: 1 }}
                          value={formState.domain}
                        />
                      </Stack>
                      <Stack sx={{ gap: 0, flex: 2, alignSelf: 'stretch' }}>
                        <Textarea
                          onChange={e =>
                            setFormState({
                              ...formState,
                              description: e.currentTarget.value.substring(
                                0,
                                500
                              )
                            })
                          }
                          placeholder="description"
                          styles={{
                            wrapper: { height: '100%' },
                            input: { height: '100%' }
                          }}
                          sx={{ flex: 1, alignSelf: 'stretch', height: '100%' }}
                          value={formState.description}
                        />
                      </Stack>
                    </Group>
                  ) : (
                    <Group noWrap sx={{ gap: 20 }}>
                      <Stack sx={{ gap: 0, flex: 1 }}>
                        <Text size={20} weight={500}>
                          {company.name}
                        </Text>
                        <Anchor href={company.domain} target="_blank">
                          {company.domain}
                        </Anchor>
                      </Stack>
                      <Stack sx={{ gap: 0, flex: 2 }}>
                        <Text size={13}>{company.description}</Text>
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
                <Text weight={500}>Prospects</Text>
                <Group>
                  <Button
                    compact
                    leftIcon={<Search size={20} />}
                    onClick={() =>
                      setProspectModalState({
                        isOpen: true,
                        action: 'FIND'
                      })
                    }
                    variant="outline"
                  >
                    Find
                  </Button>
                  <Button
                    compact
                    leftIcon={<Plus size={20} />}
                    onClick={() =>
                      setProspectModalState({
                        isOpen: true,
                        action: 'ADD'
                      })
                    }
                    variant="outline"
                  >
                    Add
                  </Button>
                </Group>
              </Group>
              <Divider color="#dee2e6" />
              <Stack sx={{ maxHeight: 450, overflow: 'auto', gap: 0 }}>
                <ProspectList
                  company={company}
                  modalAction={
                    prospectModalState.isOpen ? prospectModalState.action : null
                  }
                  onCloseModal={() =>
                    setProspectModalState({
                      ...prospectModalState,
                      isOpen: false
                    })
                  }
                />
              </Stack>
            </Stack>
          </Card>
        </Stack>
      )}
    </>
  );
};

CompanyDetails.propTypes = {};

export default CompanyDetails;
