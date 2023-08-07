import React, { useState } from 'react';
import { Group, Stack, Tabs, Text } from '@mantine/core';
import DashboardInfoCard from './DashboardInfoCard';
import { mq } from '../../../../config/theme';
import CompanyList from '../CompanyList';
import ProspectList from '../ProspectList';

const DashboardRecentActivityCard = () => {
  const [activeTab, setActiveTab] = useState('companies');

  return (
    <DashboardInfoCard>
      <Stack sx={{ gap: 0, maxWidth: '100%' }}>
        <Group
          sx={mq({
            padding: 10,
            justifyContent: 'space-between',
            maxWidth: '100%',
            flexDirection: ['column', 'row']
          })}
        >
          <Stack style={{ flex: 1 }}>
            <Text weight={500}>Recent Activity</Text>
          </Stack>
          <Group noWrap sx={{ gap: 20 }}>
            <Tabs
              defaultValue="companies"
              onTabChange={setActiveTab}
              value={activeTab}
              variant="pills"
            >
              <Tabs.List>
                <Tabs.Tab sx={{ fontWeight: 500 }} value="companies">
                  Companies
                </Tabs.Tab>
                <Tabs.Tab sx={{ fontWeight: 500 }} value="prospects">
                  Prospects
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>
        </Group>
        <Stack
          sx={{
            padding: 0,
            maxHeight: 400,
            maxWidth: '100%',
            overflow: 'auto'
          }}
        >
          {activeTab === 'companies' ? (
            <CompanyList disabled hideFilters />
          ) : (
            <ProspectList disabled hideFilters />
          )}
        </Stack>
      </Stack>
    </DashboardInfoCard>
  );
};

export default DashboardRecentActivityCard;
