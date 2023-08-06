import React, { useState } from 'react';
import { Anchor, Breadcrumbs, Button, Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import AddProspectModal from '../AddProspectModal';

const ProspectHeader = ({ prospect }) => {
  const [showAddProspect, setShowAddProspect] = useState(false);

  return (
    <Group
      sx={{
        padding: 10,
        justifyContent: 'space-between'
      }}
    >
      <Group>
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
      <Group>
        <Button
          compact
          leftIcon={<Plus />}
          onClick={() => setShowAddProspect(true)}
          radius="xl"
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
