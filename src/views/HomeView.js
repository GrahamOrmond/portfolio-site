import React from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Image,
  Stack,
  Text,
  Tooltip
} from '@mantine/core';
import { ExternalLink, Mail, Map } from 'tabler-icons-react';
import HomeSection from '../components/content/home/HomeSection';
import ProjectDisplayCard from '../components/content/home/ProjectDisplayCard';
import { SOCIAL_ICONS } from '../config/constants';
import AwsIcon from '../images/aws-icon.svg';
import bitmojiLaptopReading from '../images/bitmoji-laptop-reading.png';
import bitmojiStudying from '../images/bitmoji-studying.png';
import bitmojiWaveLeft from '../images/bitmoji-wave-right.png';
import CSharpIcon from '../images/c-sharp-icon.svg';
import MysqlIcon from '../images/mysql-icon.svg';
import ReactJsIcon from '../images/react-js-icon.svg';

const TECH_STACK_ICONS = [
  {
    key: 1,
    image: ReactJsIcon,
    label: 'ReactJS',
    link: 'https://react.dev/'
  },
  {
    key: 2,
    image: CSharpIcon,
    label: 'C#',
    link: 'https://dotnet.microsoft.com'
  },
  {
    key: 3,
    image: MysqlIcon,
    label: 'MySQL',
    link: 'https://www.mysql.com/'
  },
  {
    key: 4,
    image: AwsIcon,
    label: 'AWS',
    link: 'https://aws.amazon.com/'
  }
];

const CONTACT_INFO = [
  {
    key: 1,
    icon: <Map color="dodgerblue" sx={{ margin: 'auto' }} />,
    title: 'Location',
    description: 'Ontario, Canada',
    link: 'https://www.google.com/maps/place/Ontario/'
  },
  {
    key: 2,
    icon: <Mail color="dodgerblue" sx={{ margin: 'auto' }} />,
    title: 'Email',
    description: 'ormondwork@gmail.com',
    link: 'mailto:ormondwork@gmail.com'
  }
];

const PROJECT_DISPLAYS = [
  {
    key: 1,
    title: 'Pellentesque convallis nisi lacus',
    description:
      'Pellentesque convallis nisi lacus, at tristique felis blandit ac. Sed mollis odio ut neque tincidunt ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam id tortor id tortor posuere molestie ut nec mauris. Nullam id tincidunt est.',
    links: [
      {
        to: '/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: bitmojiLaptopReading
  },
  {
    key: 2,
    title: 'Pellentesque convallis nisi lacus',
    description:
      'Pellentesque convallis nisi lacus, at tristique felis blandit ac. Sed mollis odio ut neque tincidunt ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam id tortor id tortor posuere molestie ut nec mauris. Nullam id tincidunt est.',
    links: [
      {
        to: '/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: bitmojiLaptopReading
  },
  {
    key: 3,
    title: 'Pellentesque convallis nisi lacus',
    description:
      'Pellentesque convallis nisi lacus, at tristique felis blandit ac. Sed mollis odio ut neque tincidunt ornare. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam id tortor id tortor posuere molestie ut nec mauris. Nullam id tincidunt est.',
    links: [
      {
        to: '/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: bitmojiLaptopReading
  }
];

const HomeView = () => {
  return (
    <Stack sx={{ flex: 1, alignSelf: 'stretch', gap: 0 }}>
      <Group
        id="home"
        sx={{
          height: '100vh',
          backgroundColor: '#262626',
          justifyContent: 'center',
          alignItems: 'start',
          padding: '80px 80px'
        }}
      >
        <Stack sx={{ flex: 1, maxWidth: 1000, gap: 80 }}>
          <Group
            sx={{
              flex: 1,
              alignSelf: 'stretch'
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <Stack sx={{ gap: 5 }}>
                <Stack sx={{ color: '#FFF', gap: 0 }}>
                  <Text size={45} sx={{ lineHeight: '40px' }} weight={700}>
                    Graham Ormond
                  </Text>
                  <Text size={22}>Full-stack Web Developer</Text>
                </Stack>
                <Group>
                  {SOCIAL_ICONS.map(i => (
                    <ActionIcon
                      color="dark"
                      component="a"
                      href={i.link}
                      key={i.key}
                      radius="xl"
                      size={30}
                      target="_blank"
                    >
                      {<i.icon color="#FFF" size={30} />}
                    </ActionIcon>
                  ))}
                </Group>
              </Stack>
            </Stack>
            <Stack
              sx={{
                flex: 1,
                height: 350,
                alignItems: 'end',
                justifyContent: 'center'
              }}
            >
              <Stack
                sx={{
                  width: 300,
                  height: 300,
                  border: 'solid 2px #FFF',
                  borderRadius: 300,
                  overflow: 'hidden',
                  position: 'relative',
                  backgroundColor: 'dodgerblue'
                }}
              >
                <Image
                  height={300}
                  src={bitmojiWaveLeft}
                  sx={{ position: 'absolute', bottom: -20 }}
                  width={300}
                />
              </Stack>
            </Stack>
          </Group>
          <Group sx={{ gap: 30 }}>
            <Text color="#FFF" size={20} weight={500}>
              Tech Stack
            </Text>
            <Divider
              color="#FFF"
              height={20}
              orientation="vertical"
              size={2}
              sx={{ height: 30, alignSelf: 'center' }}
            />
            <Group sx={{ gap: 30 }}>
              {TECH_STACK_ICONS.map(icon => (
                <Tooltip key={icon.key} label={icon.label} position="bottom">
                  <Stack
                    component="a"
                    href={icon.link}
                    sx={{
                      padding: 10,
                      borderRadius: 100,
                      backgroundColor: '#FFF',
                      cursor: 'pointer'
                    }}
                    target="_blank"
                  >
                    <Image
                      fit="contain"
                      height={35}
                      src={icon.image}
                      width={35}
                    />
                  </Stack>
                </Tooltip>
              ))}
            </Group>
          </Group>
        </Stack>
      </Group>

      <HomeSection
        header="About me"
        id="about"
        image={bitmojiStudying}
        title="Full-stack Web Developer"
      >
        <Stack sx={{ gap: 25 }}>
          <Text>
            Pellentesque convallis nisi lacus, at tristique felis blandit ac.
            Sed mollis odio ut neque tincidunt ornare. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Nullam id tortor id tortor posuere molestie
            ut nec mauris. Nullam id tincidunt est. Sed porta blandit cursus.
            Vestibulum hendrerit ante sapien, at tristique nunc euismod eget.
            Sed et lorem a leo tristique sagittis. Sed iaculis ornare eleifend.
            Phasellus vestibulum malesuada posuere. Morbi sed facilisis arcu.
          </Text>
          <Button
            radius="xl"
            sx={{ maxWidth: 200, backgroundColor: 'dodgerblue' }}
          >
            View More
          </Button>
        </Stack>
      </HomeSection>

      <Divider color="#262626" size={7} />

      <HomeSection header="Portfolio" id="projects" title="Projects">
        <Stack sx={{ gap: 60 }}>
          {PROJECT_DISPLAYS.map(p => (
            <ProjectDisplayCard
              description={p.description}
              image={p.image}
              key={p.key}
              links={p.links}
              title={p.title}
            />
          ))}
        </Stack>
      </HomeSection>

      <Divider color="#262626" size={7} />

      <HomeSection header="Contact me" id="contact" title="Open to anything!">
        <Group sx={{ gap: 40, marginTop: 20 }}>
          {CONTACT_INFO.map(info => (
            <Group
              component="a"
              href={info.link}
              key={info.key}
              sx={{
                cursor: 'pointer',
                color: '#000',
                textDecoration: 'none'
              }}
              target="_blank"
            >
              <Card
                shadow="xl"
                style={{ padding: 0 }}
                sx={{
                  width: 55,
                  height: 55,
                  borderRadius: 50,
                  display: 'flex',
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                withBorder
              >
                <Stack>{info.icon}</Stack>
              </Card>
              <Stack sx={{ gap: 0 }}>
                <Text size={18} weight={500}>
                  {info.title}
                </Text>
                <Text color="grey" size={16}>
                  {info.description}
                </Text>
              </Stack>
            </Group>
          ))}
        </Group>
      </HomeSection>
    </Stack>
  );
};

export default HomeView;
