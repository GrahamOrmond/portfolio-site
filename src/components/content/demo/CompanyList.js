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
import { Building } from 'tabler-icons-react';
import CompanyListFilter from './companies/CompanyListFilter';
import DeleteCompaniesModal from './companies/DeleteCompaniesModal';
import ExportCompaniesModal from './companies/ExportCompaniesModal';
import { Context as PortfolioContext } from '../../../providers/PortfolioProvider';

const initialCompanyListState = {
  selectedCompanies: [],
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

const companyListReducer = (state, action) => {
  switch (action.type) {
    case 'select-companies':
      return {
        ...state,
        selectedCompanies: [
          ...state.selectedCompanies.filter(
            p => !action.payload.some(s => s.id === p.id)
          ),
          ...action.payload
        ]
      };
    case 'unselect-companies':
      return {
        ...state,
        selectedCompanies: [
          ...state.selectedCompanies.filter(
            p => !action.payload.some(s => s.id === p.id)
          )
        ]
      };
    case 'unselect-all-companies':
      return {
        ...state,
        selectedCompanies: [],
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
      return initialCompanyListState;
    default:
      return state;
  }
};

const CompanyList = ({ disabled, hideFilters }) => {
  const hasFetched = useRef(false);
  const { state, fetchCompanies } = useContext(PortfolioContext);
  const [companyListState, dispatchProspectListState] = useReducer(
    companyListReducer,
    initialCompanyListState
  );
  const isLoading = !hasFetched.current || state.companies.loading;
  const areAllCompaniesSelected =
    !isLoading &&
    state.companies.value.length > 0 &&
    state.companies.value.every(p =>
      companyListState.selectedCompanies.some(s => s.id === p.id)
    );

  useEffect(() => {
    fetchCompanies(companyListState.filter);
    hasFetched.current = true;
  }, [companyListState.filter]);

  return (
    <Stack sx={{ gap: 0, maxHeight: '100%', overflow: 'hidden' }}>
      {!hideFilters && (
        <CompanyListFilter
          filterState={companyListState.filter}
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
          onRefresh={() => fetchCompanies(companyListState.filter)}
          showActionMenu={companyListState.selectedCompanies.length > 0}
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
                      checked={areAllCompaniesSelected}
                      onChange={() => {
                        if (areAllCompaniesSelected) {
                          dispatchProspectListState({
                            type: 'unselect-all-companies'
                          });
                        } else {
                          dispatchProspectListState({
                            type: 'select-companies',
                            payload: state.companies.value
                          });
                        }
                      }}
                    />
                  )}
                  <Text>Name</Text>
                </Group>
              </th>
              <th>
                <Text>Domain</Text>
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
                </tr>
              ))
            ) : state.companies.value.length === 0 ? (
              <tr>
                <td colSpan={3}>
                  <Text
                    sx={{ textAlign: 'center', padding: '30px 0px' }}
                    weight={500}
                  >
                    No Companies
                  </Text>
                </td>
              </tr>
            ) : (
              state.companies.value.map(e => {
                const isSelected = companyListState.selectedCompanies.some(
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
                                  type: 'unselect-companies',
                                  payload: [e]
                                });
                              } else {
                                dispatchProspectListState({
                                  type: 'select-companies',
                                  payload: [e]
                                });
                              }
                            }}
                          />
                        )}
                        <Group sx={{ gap: 15 }}>
                          <Avatar radius={'xl'} size={38} variant="filled">
                            <Building size={25} />
                          </Avatar>
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
                              to={`/demo/companies/${e.id}`}
                              weight={500}
                            >
                              {e.name}
                            </Text>
                            <Text
                              color="grey"
                              component={Link}
                              sx={{
                                gap: 0,
                                textDecoration: 'none',
                                '&:hover': {
                                  textDecoration: 'underline'
                                }
                              }}
                              to={`/demo/companies/${e.id}`}
                            >
                              {e.prospects.length}{' '}
                              {e.prospects.length === 1
                                ? 'prospect'
                                : 'prospects'}
                            </Text>
                          </Stack>
                        </Group>
                      </Group>
                    </td>
                    <td>
                      <Text>{e.domain}</Text>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </Table>
      </Stack>
      <ExportCompaniesModal
        companies={companyListState.selectedCompanies}
        isOpen={
          companyListState.actionModal.isOpen &&
          companyListState.actionModal.action === 'EXPORT'
        }
        onClose={() =>
          dispatchProspectListState({
            type: 'close-modal'
          })
        }
      />
      <DeleteCompaniesModal
        companies={companyListState.selectedCompanies}
        isOpen={
          companyListState.actionModal.isOpen &&
          companyListState.actionModal.action === 'DELETE'
        }
        onClose={() =>
          dispatchProspectListState({
            type: 'close-modal'
          })
        }
        onDelete={() =>
          dispatchProspectListState({
            type: 'unselect-all-companies'
          })
        }
      />
    </Stack>
  );
};

CompanyList.propTypes = {
  disabled: PropTypes.bool,
  hideFilters: PropTypes.bool
};

export default CompanyList;
