import React, { useState } from 'react';
import { Anchor, Breadcrumbs, Button, Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import AddCompanyModal from './AddCompanyModal';
import { mq } from '../../../../config/theme';

const CompanyHeader = ({ company }) => {
  const [showAddCompany, setShowAddCompany] = useState(false);

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
          <Anchor color="dark" component={Link} to="/demo/companies">
            <Text size={20} weight={500}>
              Companies
            </Text>
          </Anchor>
          {company && (
            <Anchor color="dark">
              <Text size={20} weight={500}>
                {company.name}
              </Text>
            </Anchor>
          )}
        </Breadcrumbs>
      </Group>
      <Group sx={{ alignSelf: 'stretch' }}>
        <Button
          compact
          leftIcon={<Plus />}
          onClick={() => setShowAddCompany(true)}
          radius="xl"
          sx={mq({ width: '100%', maxWidth: ['unset', 175] })}
        >
          Add Company
        </Button>
      </Group>
      <AddCompanyModal
        isOpen={showAddCompany}
        onClose={() => setShowAddCompany(false)}
      />
    </Group>
  );
};

CompanyHeader.propTypes = {
  company: PropTypes.object
};

export default CompanyHeader;
