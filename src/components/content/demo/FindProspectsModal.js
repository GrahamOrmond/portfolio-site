import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Center,
  Divider,
  Group,
  Pagination,
  Stack,
  Text,
  TextInput,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { InfoCircle, Plus, Search } from 'tabler-icons-react';
import FoundProspectListItem from './prospects/FoundProspectListItem';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as PortfolioContext } from '../../../providers/PortfolioProvider';
import ResponsiveModal from '../../common/ResponsiveModal';

const FindProspectsModal = ({ isOpen, onClose, company, onAdd }) => {
  const MAX_PAGE_COUNT = 5;
  const { findProspects, createProspects } = useContext(PortfolioContext);
  const [modalState, setModalState] = useState({
    companyName: '',
    searchTerm: '',
    filterSearch: '',
    prospects: [],
    selectedProspects: [],
    pageIndex: 1,
    showProspectResult: false,
    isLoading: false
  });

  const filteredProspects = modalState.prospects
    .sort((a, b) => a.titleRank - b.titleRank)
    .filter(
      p =>
        !modalState.filterSearch ||
        `${p.firstName.toLowerCase()}${p.lastName.toLowerCase()}`.includes(
          modalState.filterSearch.toLowerCase()
        ) ||
        p.title.toLowerCase().includes(modalState.filterSearch.toLowerCase())
    );
  const t = [];

  useEffect(() => {
    if (isOpen) {
      setModalState({
        companyName: company?.name ?? '',
        searchTerm: company?.name ?? '',
        filterSearch: '',
        prospects: [],
        selectedProspects: [],
        pageIndex: 1,
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
      title={
        <Title order={3}>
          {modalState.showProspectResult ? 'Add Prospects' : 'Find Prospects'}
        </Title>
      }
      withinPortal
    >
      {modalState.showProspectResult ? (
        <Stack sx={{ gap: 0 }}>
          <Stack sx={{ gap: 20, padding: 15 }}>
            <Alert icon={<InfoCircle />}>
              <Text weight={500}>Add prospects from the list below</Text>
            </Alert>

            <Stack sx={{ gap: 10 }}>
              {modalState.prospects.length > 0 && (
                <TextInput
                  onChange={e =>
                    setModalState({
                      ...modalState,
                      filterSearch: e.currentTarget.value,
                      pageIndex: 1
                    })
                  }
                  placeholder="Search prospects..."
                  value={modalState.filterSearch}
                />
              )}

              {filteredProspects.length === 0 ? (
                <Stack sx={{ border: 'solid 1px lightgrey' }}>
                  <Text
                    sx={{ textAlign: 'center', padding: '30px 10px' }}
                    weight={500}
                  >
                    No prospects found
                  </Text>
                </Stack>
              ) : (
                <Stack sx={{ gap: 10 }}>
                  <Stack
                    sx={{
                      border: 'solid 1px lightgrey',
                      borderBottom: 'none',
                      gap: 0
                    }}
                  >
                    {filteredProspects
                      .slice(
                        MAX_PAGE_COUNT * (modalState.pageIndex - 1),
                        MAX_PAGE_COUNT * (modalState.pageIndex - 1) +
                          MAX_PAGE_COUNT
                      )
                      .map(p => {
                        const isSelected = modalState.selectedProspects.some(
                          s =>
                            s.pkProspectHunterCompanyProspect ===
                            p.pkProspectHunterCompanyProspect
                        );
                        return (
                          <FoundProspectListItem
                            disabled={modalState.isLoading}
                            isSelected={isSelected}
                            key={p.pkProspectHunterCompanyProspect}
                            onSelect={() => {
                              if (isSelected) {
                                setModalState({
                                  ...modalState,
                                  selectedProspects: [
                                    ...modalState.selectedProspects.filter(
                                      f =>
                                        f.pkProspectHunterCompanyProspect !==
                                        p.pkProspectHunterCompanyProspect
                                    )
                                  ]
                                });
                              } else {
                                setModalState({
                                  ...modalState,
                                  selectedProspects: [
                                    ...modalState.selectedProspects,
                                    p
                                  ]
                                });
                              }
                            }}
                            prospect={p}
                          />
                        );
                      })}
                  </Stack>
                  <Center sx={{ marginBottom: 10 }}>
                    <Pagination
                      onChange={pageIndex =>
                        setModalState({
                          ...modalState,
                          pageIndex
                        })
                      }
                      page={modalState.pageIndex}
                      total={Math.ceil(
                        filteredProspects.length / MAX_PAGE_COUNT
                      )}
                    />
                  </Center>
                </Stack>
              )}
            </Stack>
          </Stack>
          <Divider />
          <Group sx={{ flex: 1, padding: 15 }}>
            <Button
              color="dark"
              disabled={modalState.isLoading}
              onClick={onClose}
              sx={{ flex: 1 }}
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={modalState.selectedProspects.length === 0}
              leftIcon={<Plus />}
              loading={modalState.isLoading}
              onClick={() => {}}
              onClickCapture={() => {
                setModalState({
                  ...modalState,
                  isLoading: true
                });
                createProspects(
                  {
                    prospects: modalState.selectedProspects.map(p => ({
                      firstName: p.firstName,
                      lastName: p.lastName,
                      email: p.email,
                      title: p.title,
                      fkCompany: company.id
                    }))
                  },
                  prospects => {
                    onClose();
                    if (onAdd) {
                      onAdd();
                    }
                  },
                  errorMessage => {
                    triggerNotification(errorMessage);
                    setModalState({
                      ...modalState,
                      isLoading: false
                    });
                  }
                );
              }}
              sx={{ flex: 1 }}
              type="submit"
            >
              Add{' '}
              {modalState.selectedProspects.length > 0 &&
                `(${modalState.selectedProspects.length})`}
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack
          component="form"
          onSubmit={e => {
            e.preventDefault();
            setModalState({
              ...modalState,
              isLoading: true
            });
            findProspects(
              {
                companyName: modalState.companyName,
                searchTerm: modalState.searchTerm
              },
              prospects => {
                setModalState({
                  ...modalState,
                  prospects,
                  filterSearch: '',
                  pageIndex: 1,
                  showProspectResult: true,
                  isLoading: false
                });
              },
              error => {
                triggerNotification(error);
                setModalState({
                  ...modalState,
                  isLoading: false
                });
              }
            );
          }}
          sx={{ gap: 0 }}
        >
          <Stack sx={{ gap: 20, padding: '30px 15px' }}>
            <Text sx={{ textAlign: 'center' }}>
              Find top prospects for <b>{company.name}</b>!
            </Text>
          </Stack>
          <Divider />
          <Group sx={{ flex: 1, padding: 15 }}>
            <Button
              color="dark"
              disabled={modalState.isLoading}
              onClick={onClose}
              sx={{ flex: 1 }}
              type="button"
            >
              Cancel
            </Button>
            <Button
              leftIcon={<Search />}
              loading={modalState.isLoading}
              onClick={() => {}}
              sx={{ flex: 1 }}
              type="submit"
            >
              Search
            </Button>
          </Group>
        </Stack>
      )}
    </ResponsiveModal>
  );
};

FindProspectsModal.propTypes = {
  company: PropTypes.object,
  isOpen: PropTypes.bool,
  onAdd: PropTypes.func,
  onClose: PropTypes.func
};

export default FindProspectsModal;
