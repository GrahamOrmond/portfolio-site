import React, { useContext, useEffect, useRef } from 'react';
import { Button, Group, Loader, Stack, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import DashboardInfoCard from './DashboardInfoCard';
import DashboardRecentActivityCard from './DashboardRecentActivityCard';
import { mq } from '../../../../config/theme';
import { Context as PortfolioContext } from '../../../../providers/PortfolioProvider';

const DashboardView = () => {
  const hasFetched = useRef(false);
  const { state, fetchDashboardInfo } = useContext(PortfolioContext);
  const isLoading = !hasFetched.current || state.dashboard.loading;

  useEffect(() => {
    fetchDashboardInfo();
    hasFetched.current = true;
  }, []);

  return (
    <Stack
      sx={{
        flex: 1,
        alignSelf: 'stretch',
        gap: 0,
        padding: 10
      }}
    >
      <Stack>
        <Group
          sx={mq({
            flexDirection: ['column', 'row'],
            flex: 1,
            alignSelf: 'stretch'
          })}
        >
          <DashboardInfoCard>
            <Stack sx={{ gap: 15, flex: 1, padding: 20, minHeight: 250 }}>
              <Stack
                sx={{
                  textAlign: 'center',
                  gap: 0,
                  alignSelf: 'stetch',
                  justifyContent: 'center',
                  flex: 1
                }}
              >
                {isLoading ? (
                  <Loader color="dark" size={46} sx={{ alignSelf: 'center' }} />
                ) : (
                  <Text size={30} weight={500}>
                    {state.dashboard.value?.companyCount}
                  </Text>
                )}

                <Text size={30} weight={500}>
                  Companies
                </Text>
              </Stack>
              <Button
                compact
                component={Link}
                sx={{ alignSelf: 'center', width: '100%', maxWidth: 100 }}
                to="/demo/companies"
                variant="outline"
              >
                View
              </Button>
            </Stack>
          </DashboardInfoCard>

          <DashboardInfoCard>
            <Stack sx={{ gap: 15, flex: 1, padding: 20, minHeight: 250 }}>
              <Stack
                sx={{
                  textAlign: 'center',
                  gap: 0,
                  alignSelf: 'stetch',
                  justifyContent: 'center',
                  flex: 1
                }}
              >
                {isLoading ? (
                  <Loader color="dark" size={46} sx={{ alignSelf: 'center' }} />
                ) : (
                  <Text size={30} weight={500}>
                    {state.dashboard.value?.prospectCount}
                  </Text>
                )}
                <Text size={30} weight={500}>
                  Prospects
                </Text>
              </Stack>
              <Button
                compact
                component={Link}
                sx={{ alignSelf: 'center', width: '100%', maxWidth: 100 }}
                to="/demo/prospects"
                variant="outline"
              >
                View
              </Button>
            </Stack>
          </DashboardInfoCard>
        </Group>
        <DashboardRecentActivityCard />
      </Stack>
    </Stack>
  );
};

DashboardView.propTypes = {};

export default DashboardView;
