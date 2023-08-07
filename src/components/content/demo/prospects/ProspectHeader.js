import React, { useState } from 'react';
import { Anchor, Breadcrumbs, Button, Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import { mq } from '../../../../config/theme';
import AddProspectModal from '../AddProspectModal';

const ProspectHeader = ({ prospect }) => {
  const [showAddProspect, setShowAddProspect] = useState(false);

  return (
    <Group
      sx={mq({
        padding: 10,
        justifyContent: 'space-between',
        gap: 5,
        flexDirection: ['column', 'row']
      })}
    >
      <Group sx={{ alignSelf: 'stretch' }}>
        <Breadcrumbs>
          <Anchor color="dark" component={Link} to="/demo/prospects">
            <Text size={20} weight={500}>
              Prospects
            </Text>
          </Anchor>
          {prospect && (
            <Anchor color="dark">
              <Text size={20} weight={500}>
                {prospect.firstName} {prospect.lastName}
              </Text>
            </Anchor>
          )}
        </Breadcrumbs>
      </Group>
      <Group sx={{ alignSelf: 'stretch' }}>
        <Button
          compact
          leftIcon={<Plus />}
          onClick={() => setShowAddProspect(true)}
          radius="xl"
          sx={mq({ width: '100%', maxWidth: ['unset', 175] })}
        >
          Add Prospect
        </Button>
      </Group>
      <AddProspectModal
        isOpen={showAddProspect}
        onClose={() => setShowAddProspect(false)}
      />
    </Group>
  );
};

ProspectHeader.propTypes = {
  prospect: PropTypes.object
};

export default ProspectHeader;
