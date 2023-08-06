import React, { useState } from 'react';
import { Anchor, Breadcrumbs, Button, Group, Text } from '@mantine/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Plus } from 'tabler-icons-react';
import AddCompanyModal from './AddCompanyModal';

const CompanyHeader = ({ company }) => {
  const [showAddCompany, setShowAddCompany] = useState(false);

  return (
    <Group
      sx={{
        padding: 10,
        justifyContent: 'space-between'
      }}
    >
      <Group>
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
      <Group>
        <Button
          compact
          leftIcon={<Plus />}
          onClick={() => setShowAddCompany(true)}
          radius="xl"
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
