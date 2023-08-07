import React from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Select,
  TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import { ArrowDown, ArrowUp, Dots, Refresh, Search } from 'tabler-icons-react';
import { mq } from '../../../../config/theme';

const CompanyListFilter = ({
  filterState,
  onFilter,
  onRefresh,
  showActionMenu,
  onAction
}) => {
  const orderByDesc = filterState.orderBy === 'desc';

  return (
    <Group
      sx={mq({
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: ['column', 'row']
      })}
    >
      <Group sx={mq({ flex: [1, 'unset'], alignSelf: 'stretch' })}>
        <TextInput
          icon={<Search />}
          onChange={e =>
            onFilter({
              ...filterState,
              searchTerm: e.currentTarget.value
            })
          }
          placeholder="Search..."
          style={{ flex: 1 }}
          value={filterState.searchTerm}
        />
        {showActionMenu && onAction && (
          <Menu shadow="md" width={200} withArrow>
            <Menu.Target>
              <Button
                color="dark"
                onClick={e => e.preventDefault()}
                size="xs"
                sx={{
                  padding: 3,
                  border: 'solid 1px #dee2e6',
                  height: 'unset'
                }}
                variant="outline"
              >
                <Dots />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={e => {
                  e.preventDefault();
                  onAction('EXPORT');
                }}
              >
                Export
              </Menu.Item>
              <Menu.Item
                onClick={e => {
                  e.preventDefault();
                  onAction('DELETE');
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
      <Group sx={mq({ flex: [1, 'unset'], alignSelf: 'stretch' })}>
        <Select
          data={[
            {
              label: 'Date Created',
              value: 'date_created'
            },
            {
              label: 'Name',
              value: 'name'
            }
          ]}
          onChange={value =>
            onFilter({
              ...filterState,
              sortBy: value
            })
          }
          style={{ flex: 1 }}
          value={filterState.sortBy}
        />
        <ActionIcon
          onClick={() =>
            onFilter({
              ...filterState,
              orderBy: orderByDesc ? 'asc' : 'desc'
            })
          }
          radius="xl"
          variant="filled"
        >
          {orderByDesc ? <ArrowDown /> : <ArrowUp />}
        </ActionIcon>
        <ActionIcon onClick={onRefresh} radius="xl" variant="filled">
          <Refresh />
        </ActionIcon>
      </Group>
    </Group>
  );
};

CompanyListFilter.propTypes = {
  filterState: PropTypes.object,
  showActionMenu: PropTypes.bool,
  onAction: PropTypes.func,
  onFilter: PropTypes.func,
  onRefresh: PropTypes.func
};

export default CompanyListFilter;
