import React from 'react';
import {
  Button,
  Card,
  Divider,
  Group,
  Image,
  List,
  Stack,
  Text
} from '@mantine/core';
import PropTypes from 'prop-types';
import { mq } from '../../../config/theme';
import ActionBadge from '../../common/ActionBadge';

const ProjectDisplayCard = ({
  title,
  subTitle,
  description,
  links,
  image,
  features,
  techStack
}) => {
  const halfOfFeatureCount = features ? Math.ceil(features.length / 2) : 0;

  const sortedTechStack = techStack
    ? techStack.sort((a, b) => a.label.localeCompare(b.label))
    : [];

  return (
    <Card
      radius="xl"
      shadow="xl"
      sx={mq({
        display: 'flex',
        flex: 1,
        padding: ['10px !important', '20px !important', '40px !important'],
        border: 'solid 1px #F0F0F0'
      })}
    >
      <Group
        noWrap
        sx={mq({
          gap: [20, 40, 60],
          flex: 1,
          alignSelf: 'stretch',
          flexDirection: ['column-reverse', 'column-reverse', 'row']
        })}
      >
        <Stack style={{ flex: 1, alignItems: 'center' }}>
          <Card
            radius="lg"
            shadow="xl"
            style={{ padding: 0 }}
            sx={{ height: 450 }}
          >
            <Image
              height="auto"
              src={image}
              sx={{ position: 'relative', top: 0 }}
              width="100%"
            />
          </Card>
        </Stack>
        <Stack
          sx={mq({
            gap: [10, 20, 20],
            flex: 1,
            alignItems: 'center',
            alignSelf: 'stretch'
          })}
        >
          <Stack
            sx={mq({
              flex: 1,
              gap: [10, 15, 15],
              justifyContent: 'space-between'
            })}
          >
            <Stack sx={{ gap: 0 }}>
              <Text
                color="dodgerblue"
                size={20}
                sx={{ textAlign: 'center' }}
                weight={700}
              >
                {title}
              </Text>
              {subTitle && (
                <Text size={16} sx={{ textAlign: 'center' }} weight={700}>
                  {subTitle}
                </Text>
              )}
            </Stack>
            {typeof description === 'string' ? (
              <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
                {description}
              </Text>
            ) : (
              description
            )}

            {features.length > 0 && (
              <Stack style={{ gap: 5 }}>
                <Text weight={500}>Key Features</Text>
                <Group
                  sx={mq({
                    gap: [0, 10, 0, 10],
                    justifyContent: [
                      'left',
                      'space-evenly',
                      'left',
                      'space-evenly'
                    ],
                    paddingLeft: [20, 0, 20, 0]
                  })}
                >
                  <List style={{ alignSelf: 'start' }}>
                    {features.slice(0, halfOfFeatureCount)?.map(f => (
                      <List.Item key={f.label}>
                        <Text
                          color="grey"
                          size={16}
                          sx={{ textAlign: 'center' }}
                        >
                          {f.label}
                        </Text>
                      </List.Item>
                    ))}
                  </List>
                  {features.length > 1 && (
                    <List style={{ alignSelf: 'start' }}>
                      {features
                        .slice(halfOfFeatureCount, features.length)
                        ?.map(f => (
                          <List.Item key={f.label}>
                            <Text
                              color="grey"
                              size={16}
                              sx={{ textAlign: 'center' }}
                            >
                              {f.label}
                            </Text>
                          </List.Item>
                        ))}
                    </List>
                  )}
                </Group>
              </Stack>
            )}

            {sortedTechStack.length > 0 && (
              <>
                <Divider />
                <Stack style={{ gap: 5 }}>
                  <Group style={{ flex: 1, justifyContent: 'center' }}>
                    {sortedTechStack.map(t => (
                      <ActionBadge
                        key={t.label}
                        onClick={() => {
                          window.open(t.link, '_blank');
                        }}
                        size="xl"
                      >
                        {t.label}
                      </ActionBadge>
                    ))}
                  </Group>
                </Stack>
                <Divider />
              </>
            )}
          </Stack>
          <Group>
            {links.map(link => (
              <Button
                component="a"
                href={link.to}
                key={link.to}
                rightIcon={<link.icon color="#1E90FF" size={20} />}
                sx={{ color: 'dodgerblue' }}
                target="_blank"
                variant="subtle"
              >
                {link.label}
              </Button>
            ))}
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};

ProjectDisplayCard.propTypes = {
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  features: PropTypes.array,
  image: PropTypes.string,
  links: PropTypes.array,
  subTitle: PropTypes.string,
  techStack: PropTypes.array,
  title: PropTypes.string
};

export default ProjectDisplayCard;
