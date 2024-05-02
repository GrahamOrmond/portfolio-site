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
import { Link } from 'react-router-dom';
import { BrandGithub, ExternalLink, Mail, Map } from 'tabler-icons-react';
import DisplaySection from '../components/common/DisplaySection';
import ProjectDisplayCard from '../components/content/home/ProjectDisplayCard';
import { SOCIAL_ICONS } from '../config/constants';
import { mq } from '../config/theme';
import AwsIcon from '../images/aws-icon.svg';
import bitmojiStudying from '../images/bitmoji-studying.png';
import bitmojiWaveLeft from '../images/bitmoji-wave-right.png';
import CSharpIcon from '../images/c-sharp-icon.svg';
import DanielTimothyLeadsLanding from '../images/daniel-timothy-leads-landing.png';
import MysqlIcon from '../images/mysql-icon.svg';
import QBTConsoleImage from '../images/qbt-console-landing.png';
import QbtExtendedImage from '../images/qbt-extended-landing.png';
import QbtLoadboardImage from '../images/qbt-loadboard-landing.png';
import ReactJsIcon from '../images/react-js-icon.svg';
import SportsHeadzRegistrationLanding from '../images/sportsheadz-registration-landing.png';
import WeedstrueProducts from '../images/weedstrue-products.png';

const TECH_LINKS_ENUM = {
  react: {
    key: 1,
    image: ReactJsIcon,
    label: 'ReactJS',
    link: 'https://react.dev/'
  },
  cSharp: {
    key: 2,
    image: CSharpIcon,
    label: 'C#',
    link: 'https://dotnet.microsoft.com'
  },
  mySql: {
    key: 3,
    image: MysqlIcon,
    label: 'MySQL',
    link: 'https://www.mysql.com/'
  },
  aws: {
    key: 4,
    image: AwsIcon,
    label: 'AWS',
    link: 'https://aws.amazon.com/'
  },
  salesforce: {
    key: 5,
    image: null,
    label: 'Salesforce',
    link: 'https://www.salesforce.com/ca/'
  },
  outreach: {
    key: 6,
    image: null,
    label: 'Outreach',
    link: 'https://www.outreach.io/'
  },
  google: {
    key: 7,
    image: null,
    label: 'Google API',
    link: 'https://cloud.google.com/apis'
  },
  stripe: {
    key: 8,
    image: null,
    label: 'Stripe',
    link: 'https://stripe.com/en-ca'
  }
};

const TECH_STACK_ICONS = [
  TECH_LINKS_ENUM.react,
  TECH_LINKS_ENUM.cSharp,
  TECH_LINKS_ENUM.mySql,
  TECH_LINKS_ENUM.aws
];

const CONTACT_INFO = [
  {
    key: 1,
    icon: <Map color="dodgerblue" sx={{ margin: 'auto' }} />,
    title: 'Location',
    description: 'Canada',
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
    title: 'Registration Platform',
    subTitle: 'SportsHeadz | Registration',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        <b>Independently developed</b> a platform that registers kids for sports
        programs accross Canada. With <b>80+ associations</b> and{' '}
        <b>over 45,000 registrations a year</b>. SportsHeadz Registration is
        quickly becoming the <b>top choice</b> for associations including{' '}
        <b>OMHA</b> to handle their registration accross Canada.
      </Text>
    ),
    features: [
      {
        label: 'Online Registration'
      },
      {
        label: 'Player Merchandise'
      },
      {
        label: 'Multiple Payment Providers'
      },
      {
        label: 'Offline Payments'
      },
      {
        label: 'Customizable Forms'
      },
      {
        label: 'Scouting & Evaluations'
      },
      {
        label: 'Team Management'
      },
      {
        label: 'Reporting and Analytics'
      }
    ],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql,
      TECH_LINKS_ENUM.stripe
    ],
    links: [
      {
        to: 'https://register.sportsheadz.com/',
        icon: ExternalLink,
        label: 'View'
      },
      {
        to: 'https://www.sportsheadz.com/sportsheadz-registration/',
        icon: ExternalLink,
        label: 'More Info'
      }
    ],
    image: SportsHeadzRegistrationLanding
  },
  {
    key: 2,
    title: 'Email Marketing CRM',
    subTitle: 'Daniel Timothy Leads',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        <b>Email marketing</b> platform that empowers users to{' '}
        <b>schedule and track</b> emails using customizable templates with{' '}
        <b>Microsoft Graph</b>.
      </Text>
    ),
    features: [
      {
        label: 'Email Scheduling'
      },
      {
        label: 'Email Tracking'
      },
      {
        label: 'Email Templates'
      },
      {
        label: 'Prospect Finder'
      },
      {
        label: 'Browser Extension'
      },
      {
        label: '3rd Party Integrations'
      }
    ],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql,
      TECH_LINKS_ENUM.aws
    ],
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
    title: 'Automated lead generation',
    subTitle: 'QB Console',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        Internal buisness tool used to{' '}
        <b>generate leads and schedule campaigns</b>. Finding and verifying{' '}
        <b>1000+ contacts a day</b> and campaigning{' '}
        <b>1000+ companies a week</b>, the QB Console has become a unique game
        changer for generating leads.
      </Text>
    ),
    features: [
      {
        label: 'Prospect Finder'
      },
      {
        label: 'Email Validation'
      },
      {
        label: 'Salesforce Integration'
      },
      {
        label: 'Outreach Integration'
      },
      {
        label: 'User Restrictions'
      },
      {
        label: '3rd Party Data Mapping'
      }
    ],
    links: [],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql,
      TECH_LINKS_ENUM.salesforce,
      TECH_LINKS_ENUM.google,
      TECH_LINKS_ENUM.outreach
    ],
    image: QBTConsoleImage
  },
  {
    key: 4,
    title: 'Transportation spot load bids',
    subTitle: 'QB Load board',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        Internal load board to place <b>spot bids</b> on live{' '}
        <b>transportation autions</b>. Used to centralize all the aution
        providers into one and make it accessable to every sales member.
      </Text>
    ),
    links: [],
    features: [
      {
        label: 'Live Transportation loads'
      },
      {
        label: 'Place & Cancel Bids'
      },
      {
        label: 'Group & Restrict Locations'
      },
      {
        label: 'Multiple Load Providers'
      },
      {
        label: 'Bid history'
      }
    ],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql
    ],
    image: QbtLoadboardImage
  },
  {
    key: 5,
    title: 'Google Alerts Manager',
    subTitle: 'QB Extended',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        Internal <b>browser extension</b> used to manage and sync{' '}
        <b>Salesforce</b> accounts with <b>Google Alerts</b>.
      </Text>
    ),
    links: [],
    features: [
      {
        label: 'Create Google Alerts'
      },
      {
        label: 'Salesforce Integration'
      },
      {
        label: 'Browser Extension'
      },
      {
        label: 'Custom Alert Options'
      },
      {
        label: 'Remove deleted accounts'
      }
    ],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql,
      TECH_LINKS_ENUM.google
    ],
    image: QbtExtendedImage
  },
  {
    key: 6,
    title: 'Community Forum',
    subTitle: 'WeedsTrue',
    description: (
      <Text color="grey" size={16} sx={{ textAlign: 'center' }}>
        Community-oriented <b>product review forum</b> that fosters engaging
        conversations among its users. The platform provides a space to{' '}
        <b>share experiences and insight</b> on various products within a
        specific industry.
      </Text>
    ),
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
    features: [
      {
        label: 'Rate & Review Products'
      },
      {
        label: 'Community Comments'
      },
      {
        label: 'User Profiles'
      },
      {
        label: 'Find & Discover Products'
      },
      {
        label: 'Browser Extension'
      }
    ],
    techStack: [
      TECH_LINKS_ENUM.react,
      TECH_LINKS_ENUM.cSharp,
      TECH_LINKS_ENUM.mySql,
      TECH_LINKS_ENUM.aws
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
            <Stack style={{ flex: 1 }}>
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

      <DisplaySection
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
      </DisplaySection>

      <Divider color="#262626" size={7} />

      <DisplaySection header="Portfolio" id="projects" title="Projects">
        <Stack sx={{ gap: 60 }}>
          {PROJECT_DISPLAYS.map(p => (
            <ProjectDisplayCard key={p.key} {...p} />
          ))}
        </Stack>
        <Stack
          sx={{
            marginTop: 40,
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text size={26} weight={900}>
            Check out this demo!
          </Text>
          <Button
            component={Link}
            onClick={() => {
              window.scrollTo({
                top: 0
              });
            }}
            to="/demo"
          >
            View Demo
          </Button>
        </Stack>
      </DisplaySection>

      <Divider color="#262626" size={7} />

      <DisplaySection
        header="Contact me"
        id="contact"
        title="It's time to grow your business!"
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
      </DisplaySection>
    </Stack>
  );
};

export default HomeView;
