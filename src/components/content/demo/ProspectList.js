import React, { useContext, useEffect, useReducer, useRef } from 'react';
import {
  Avatar,
  Checkbox,
  Divider,
  Group,
  Skeleton,
  Stack,
  Table,
  Text
} from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddProspectModal from './AddProspectModal';
import FindProspectsModal from './FindProspectsModal';
import DeleteProspectsModal from './prospects/DeleteProspectsModal';
import ExportProspectsModal from './prospects/ExportProspectsModal';
import ProspectListFilter from './Prospects/ProspectListFilter';
import { Context as PortfolioContext } from '../../../providers/PortfolioProvider';

const initialProspectListState = {
  selectedProspects: [],
  actionModal: {
    isOpen: false,
    action: ''
  },
  filter: {
    searchTerm: '',
    sortBy: 'date_created',
    orderBy: 'desc'
  }
};

const prospectListReducer = (state, action) => {
  switch (action.type) {
    case 'select-prospects':
      return {
        ...state,
        selectedProspects: [
          ...state.selectedProspects.filter(
            p => !action.payload.some(s => s.id === p.id)
          ),
          ...action.payload
        ]
      };
    case 'unselect-prospects':
      return {
        ...state,
        selectedProspects: [
          ...state.selectedProspects.filter(
            p => !action.payload.some(s => s.id === p.id)
          )
        ]
      };
    case 'unselect-all-prospects':
      return {
        ...state,
        selectedProspects: [],
        actionModal: {
          ...state.actionModal,
          isOpen: false
        }
      };
    case 'change-filter':
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload
        }
      };
    case 'open-modal':
      return {
        ...state,
        actionModal: {
          isOpen: true,
          action: action.payload
        }
      };
    case 'close-modal':
      return {
        ...state,
        actionModal: {
          ...state.actionModal,
          isOpen: false
        }
      };
    case 'reset':
      return initialProspectListState;
    default:
      return state;
  }
};

const ProspectList = ({
  company,
  disabled,
  hideFilters,
  modalAction,
  onCloseModal
}) => {
  const hasFetched = useRef(false);
  const { state, fetchProspects } = useContext(PortfolioContext);
  const [prospectListState, dispatchProspectListState] = useReducer(
    prospectListReducer,
    initialProspectListState
  );
  const isLoading = !hasFetched.current || state.companies.loading;
  const areAllProspectsSelected =
    !isLoading &&
    state.prospects.value.length > 0 &&
    state.prospects.value.every(p =>
      prospectListState.selectedProspects.some(s => s.id === p.id)
    );

  useEffect(() => {
    fetchProspects({ ...prospectListState.filter, fkCompany: company?.id });
    hasFetched.current = true;
  }, [prospectListState.filter]);

  return (
    <Stack sx={{ gap: 0, maxHeight: '100%', overflow: 'hidden' }}>
      {!hideFilters && (
        <ProspectListFilter
          filterState={prospectListState.filter}
          onAction={action =>
            dispatchProspectListState({
              type: 'open-modal',
              payload: action
            })
          }
          onFilter={filter =>
            dispatchProspectListState({
              type: 'change-filter',
              payload: filter
            })
          }
          onRefresh={() =>
            fetchProspects({
              ...prospectListState.filter,
              fkCompany: company?.id
            })
          }
          showActionMenu={prospectListState.selectedProspects.length > 0}
        />
      )}
      <Divider color="#dee2e6" />
      <Stack
        sx={{
          gap: 0,
          maxHeight: '100%',
          overflow: 'auto',
          background: '#FFF',
          position: 'relative'
        }}
      >
        <Table
          horizontalSpacing="xl"
          striped
          sx={{ borderBottom: '0.0625rem solid #dee2e6' }}
          verticalSpacing="md"
        >
          <thead
            style={{
              borderSpacing: 1,
              background: '#FFF',
              position: 'sticky',
              top: 0,
              zIndex: 1
            }}
          >
            <tr>
              <th>
                <Group noWrap sx={{ gap: 20 }}>
                  {!disabled && (
                    <Checkbox
                      checked={areAllProspectsSelected}
                      onChange={() => {
                        if (areAllProspectsSelected) {
                          dispatchProspectListState({
                            type: 'unselect-all-prospects'
                          });
                        } else {
                          dispatchProspectListState({
                            type: 'select-prospects',
                            payload: state.prospects.value
                          });
                        }
                      }}
                    />
                  )}
                  <Text>Name</Text>
                </Group>
              </th>
              <th>
                <Text>Email</Text>
              </th>
              <th>
                <Text>Company</Text>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from(Array(5)).map((x, i) => (
                <tr key={i}>
                  <td>
                    <Skeleton height={12} width="100%" />
                  </td>
                  <td>
                    <Skeleton height={12} width="100%" />
                  </td>
                  <td>
                    <Skeleton height={12} width="100%" />
                  </td>
                </tr>
              ))
            ) : state.prospects.value.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <Text
                    sx={{ textAlign: 'center', padding: '30px 0px' }}
                    weight={500}
                  >
                    No prospects
                  </Text>
                </td>
              </tr>
            ) : (
              state.prospects.value.map(e => {
                const isSelected = prospectListState.selectedProspects.some(
                  p => p.id === e.id
                );

                return (
                  <tr key={e.id}>
                    <td>
                      <Group noWrap sx={{ gap: 20 }}>
                        {!disabled && (
                          <Checkbox
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                dispatchProspectListState({
                                  type: 'unselect-prospects',
                                  payload: [e]
                                });
                              } else {
                                dispatchProspectListState({
                                  type: 'select-prospects',
                                  payload: [e]
                                });
                              }
                            }}
                          />
                        )}
                        <Group sx={{ gap: 15 }}>
                          <Avatar radius={'xl'} size={38} variant="filled" />
                          <Stack
                            sx={{
                              gap: 0
                            }}
                          >
                            <Text
                              component={Link}
                              size={16}
                              sx={{
                                gap: 0,
                                color: '#000',
                                textDecoration: 'none',
                                lineHeight: '18px',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                              to={`/demo/prospects/${e.id}`}
                              weight={500}
                            >
                              {e.firstName} {e.lastName}
                            </Text>
                            <Text
                              color="grey"
                              sx={{
                                gap: 0
                              }}
                            >
                              {e.title}
                            </Text>
                          </Stack>
                        </Group>
                      </Group>
                    </td>
                    <td>
                      <Text>{e.email}</Text>
                    </td>
                    <td>
                      <Text>{e.company.name}</Text>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Stack>
      <ExportProspectsModal
        isOpen={
          prospectListState.actionModal.isOpen &&
          prospectListState.actionModal.action === 'EXPORT'
        }
        onClose={() =>
          dispatchProspectListState({
            type: 'close-modal'
          })
        }
        prospects={prospectListState.selectedProspects}
      />
      <DeleteProspectsModal
        isOpen={
          prospectListState.actionModal.isOpen &&
          prospectListState.actionModal.action === 'DELETE'
        }
        onClose={() =>
          dispatchProspectListState({
            type: 'close-modal'
          })
        }
        onDelete={() =>
          dispatchProspectListState({
            type: 'unselect-all-prospects'
          })
        }
        prospects={prospectListState.selectedProspects}
      />
      {onCloseModal && (
        <>
          <AddProspectModal
            fkCompany={company?.id}
            isOpen={modalAction === 'ADD'}
            onAdd={() =>
              fetchProspects({
                ...prospectListState.filter,
                fkCompany: company?.id
              })
            }
            onClose={onCloseModal}
          />
          <FindProspectsModal
            company={company}
            isOpen={modalAction === 'FIND'}
            onAdd={() =>
              fetchProspects({
                ...prospectListState.filter,
                fkCompany: company?.id
              })
            }
            onClose={onCloseModal}
          />
        </>
      )}
    </Stack>
  );
};

ProspectList.propTypes = {
  company: PropTypes.object,
  disabled: PropTypes.bool,
  hideFilters: PropTypes.bool,
  modalAction: PropTypes.string,
  onCloseModal: PropTypes.func
};

export default ProspectList;
