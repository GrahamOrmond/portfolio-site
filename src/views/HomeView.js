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
import { BrandGithub, ExternalLink, Mail, Map } from 'tabler-icons-react';
import HomeSection from '../components/content/home/HomeSection';
import ProjectDisplayCard from '../components/content/home/ProjectDisplayCard';
import { SOCIAL_ICONS } from '../config/constants';
import { mq } from '../config/theme';
import AwsIcon from '../images/aws-icon.svg';
import bitmojiStudying from '../images/bitmoji-studying.png';
import bitmojiWaveLeft from '../images/bitmoji-wave-right.png';
import CSharpIcon from '../images/c-sharp-icon.svg';
import DanielTimothyLeadsLanding from '../images/daniel-timothy-leads-landing.png';
import MysqlIcon from '../images/mysql-icon.svg';
import ReactJsIcon from '../images/react-js-icon.svg';
import SportsHeadzRegistrationLanding from '../images/sportsheadz-registration-landing.png';
import WeedstrueProducts from '../images/weedstrue-products.png';

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
  // {
  //   key: 1,
  //   icon: <Map color="dodgerblue" sx={{ margin: 'auto' }} />,
  //   title: 'Location',
  //   description: 'Ontario, Canada',
  //   link: 'https://www.google.com/maps/place/Ontario/'
  // },
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
    title: 'SportsHeadz | Registration',
    subTitle: 'Registration Platform',
    description:
      'As the sole developer, I undertook the ambitious task of developing the SportsHeadz Registration Platform from the ground up. Within the initial 6 months of development, we achieved a significant milestone by successfully finishing the platform and enabling seamless payment processing through Stripe, facilitating secure transactions for users. Beyond the first 6 months, I have continued to work on the project, enhancing and maintaining its functionality. Throughout this ongoing journey, I have had the privilege of receiving valuable guidance and feedback directly from the CTO. The result is an ever-evolving platform that efficiently handles the registration process for kids in sports.',
    links: [
      {
        to: 'https://register.sportsheadz.com/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: SportsHeadzRegistrationLanding
  },
  {
    key: 2,
    title: 'Daniel Timothy Leads',
    subTitle: 'Email Marketing CRM',
    description:
      'Daniel Timothy Leads is a powerful email marketing platform that empowers users to schedule emails using customizable templates. The platform efficiently organizes company and prospect data, streamlining communication and lead management. With a built-in contact finder feature, users can easily discover and reach out to potential clients, enhancing their outreach efforts. This comprehensive and user-friendly solution is designed to optimize email campaigns and maximize engagement, enabling businesses to effectively nurture leads and build lasting relationships with customers.',
    links: [
      {
        to: 'https://github.com/orgs/DanielTimothyLeads/repositories',
        icon: BrandGithub,
        label: 'GitHub'
      },
      {
        to: 'https://danieltimothyleads.com/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: DanielTimothyLeadsLanding
  },
  {
    key: 3,
    title: 'WeedsTrue',
    subTitle: 'Community Forum',
    description:
      'WeedsTrue is a community-oriented product review forum that fosters engaging conversations among its users. The platform provides a space for sharing experiences and insights on various products within a specific industry. With features such as up/down votes on posts, commenting, and user profiles, the forum encourages interactive discussions. It organizes user posts by brand and products, facilitating easy access to relevant information for community members. As the developer of this platform, I utilized my technical skills to create a user-friendly and informative forum. Please note that the specific industry topic is being assessed for compliance with all relevant laws and regulations to ensure a responsible and legal approach to discussions on the platform.',
    links: [
      {
        to: 'https://github.com/orgs/WeedsTrue/repositories',
        icon: BrandGithub,
        label: 'GitHub'
      },
      {
        to: 'https://reviews.weedstrue.ca/',
        icon: ExternalLink,
        label: 'View'
      }
    ],
    image: WeedstrueProducts
  }
];

const HomeView = () => {
  return (
    <Stack sx={{ flex: 1, alignSelf: 'stretch', gap: 0 }}>
      <Group
        id="home"
        sx={mq({
          minHeight: '100vh',
          backgroundColor: '#262626',
          justifyContent: 'center',
          alignItems: 'start',
          padding: [20, 40, 80]
        })}
      >
        <Stack
          sx={mq({
            flex: 1,
            maxWidth: 1000,
            gap: [40, 40, 80]
          })}
        >
          <Group
            sx={{
              alignSelf: 'stretch'
            }}
          >
            <Stack sx={{ flex: 1 }}>
              <Stack sx={{ flex: 1, gap: 5 }}>
                <Stack sx={{ color: '#FFF', gap: 0 }}>
                  <Text size={45} sx={{ lineHeight: '40px' }} weight={700}>
                    Graham Ormond
                  </Text>
                  <Text size={22}>Full-Stack Developer</Text>
                </Stack>
                <Group>
                  {SOCIAL_ICONS.map(i => (
                    <Tooltip key={i.key} label={i.label} position="bottom">
                      <ActionIcon
                        color="dark"
                        component="a"
                        href={i.link}
                        key={i.key}
                        radius="xl"
                        size={30}
                        target="_blank"
                        variant="transparent"
                      >
                        {<i.icon color="#FFF" size={30} />}
                      </ActionIcon>
                    </Tooltip>
                  ))}
                </Group>
              </Stack>
            </Stack>
            <Stack
              sx={mq({
                flex: 1,
                height: 350,
                alignItems: ['center', 'center', 'end'],
                justifyContent: 'center'
              })}
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
          <Group noWrap sx={mq({ gap: 30, alignSelf: ['center', 'start'] })}>
            <Group noWrap sx={mq({ gap: 30, display: ['none', 'flex'] })}>
              <Text
                color="#FFF"
                size={20}
                sx={{ whiteSpace: 'nowrap' }}
                weight={500}
              >
                Tech Stack
              </Text>
              <Divider
                color="#FFF"
                height={20}
                orientation="vertical"
                size={2}
                sx={{ height: 30, alignSelf: 'center' }}
              />
            </Group>
            <Group noWrap sx={{ gap: 30 }}>
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
        title="Full-Stack Developer"
      >
        <Stack sx={{ gap: 15 }}>
          <Text color="grey">
            I am a dedicated and accomplished web developer with a passion for
            building innovative solutions that make a positive impact. My love
            for coding is driven by the opportunity to create impactful and
            user-friendly applications that cater to the needs of both
            businesses and users.
          </Text>

          <Text color="grey">
            Passionate about staying at the forefront of the industry, I am
            dedicated to continuously learning and adopting cutting-edge
            technologies to deliver robust solutions.
          </Text>

          <Text color="grey">
            As a team player, I thrive on collaboration, valuing feedback, and
            learning from others. My positive and adaptable attitude allows me
            to effectively navigate challenges and contribute to a supportive
            and dynamic work environment.
          </Text>

          <Text weight={500}>
            Let's connect and explore how I can contribute my skills and
            experience to your team's success.
          </Text>
        </Stack>
      </HomeSection>

      <Divider color="#262626" size={7} />

      <HomeSection header="Portfolio" id="projects" title="Public Projects">
        <Stack sx={{ gap: 60 }}>
          {PROJECT_DISPLAYS.map(p => (
            <ProjectDisplayCard key={p.key} {...p} />
          ))}
        </Stack>
      </HomeSection>

      <Divider color="#262626" size={7} />

      <HomeSection
        header="Contact me"
        id="contact"
        title="Let's start working!"
      >
        <Group
          sx={mq({
            gap: [20, 20, 40],
            marginTop: [0, 0, 20],
            alignSelf: 'stretch'
          })}
        >
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
