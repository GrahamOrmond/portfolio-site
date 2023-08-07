import React from 'react';
import { ActionIcon, Checkbox, Group, Stack, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { BrandLinkedin } from 'tabler-icons-react';

const FoundProspectListItem = ({
  prospect,
  isSelected,
  onSelect,
  disabled
}) => {
  return prospect ? (
    <Group sx={{ padding: 10, borderBottom: 'solid 1px lightgrey' }}>
      <Group
        noWrap
        onClick={e => {
          if (!disabled) {
            onSelect(e);
          }
        }}
        sx={{ flex: 1, cursor: 'pointer' }}
      >
        <Checkbox
          checked={isSelected}
          disabled={disabled}
          onChange={() => {}}
        />
        <Stack sx={{ gap: 0 }}>
          <Text sx={{ lineHeight: '18px' }} weight={500}>
            {prospect.firstName} {prospect.lastName}
          </Text>
          <Text sx={{ lineHeight: '18px' }}>{prospect.title}</Text>
        </Stack>
      </Group>
      <Group>
        <ActionIcon
          color="blue"
          onClick={() => window.open(prospect.linkedInUrl, '_blank')}
        >
          <BrandLinkedin />
        </ActionIcon>
      </Group>
    </Group>
  ) : (
    <></>
  );
};

FoundProspectListItem.propTypes = {
  disabled: PropTypes.bool,
  isSelected: PropTypes.bool,
  prospect: PropTypes.object,
  onSelect: PropTypes.func
};

export default FoundProspectListItem;
