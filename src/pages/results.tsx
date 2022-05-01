import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { EnvelopeSimple, FacebookLogo, TwitterLogo } from 'phosphor-react';
import { useEffect, useMemo } from 'react';

import Footer from '../atoms/Footer';
import {
  CANDIDATES,
  CANDIDATE_URL,
  ISSUE_TITLE,
  REFERENCES,
} from '../constants';
import { useAppSelector } from '../hooks/reduxHooks';
import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutHeader,
  QuizLayoutTitle,
} from '../layouts/QuizLayout';
import {
  selectControversies,
  selectProfile,
  selectResults,
  selectStands,
  selectTopResults,
  selectValidResultsPage,
} from '../modules/pollSelectors';
import ControversyCard from '../organisms/ControversyCard';
import IssueCard from '../organisms/IssueCard';
import ProfileCard from '../organisms/ProfileCard';
import { ROUTES } from '../routes';
import { Issue } from '../types/Issue';

const Results: React.FC = () => {
  const router = useRouter();
  const results = useAppSelector(selectResults);
  const { topCandidates, topScore } = useAppSelector(selectTopResults);
  const isValid = useAppSelector(selectValidResultsPage);
  const profile = useAppSelector(selectProfile);
  const issues = useAppSelector(selectStands);
  const controversies = useAppSelector(selectControversies);
  const topListString = useMemo(() => {
    const topList = topCandidates
      .map(({ id }, i) => {
        let joiner = '';
        if (i === topCandidates.length - 2) {
          joiner = ' and ';
        } else if (topCandidates.length > 1) {
          joiner = ', ';
        }

        return `${CANDIDATES[id].name}${joiner}`;
      })
      .join('');

    const isMultiple = topCandidates.length > 1;

    return `I took The Blind Vote and my top candidate${
      isMultiple ? 's are ' : ' is '
    }${topList}.\n\n`;
  }, [topCandidates]);

  useEffect(() => {
    if (!isValid) {
      router.push(ROUTES.home);
    }
  }, [isValid, router]);

  return (
    <QuizLayout center={false}>
      <QuizLayoutHeader minH={{ base: '150px', md: '200px' }}>
        <QuizLayoutTitle>{`Your top candidate${
          topCandidates.length > 1 ? 's' : ''
        }`}</QuizLayoutTitle>
      </QuizLayoutHeader>
      <QuizLayoutContent flexDir="column">
        <Flex align="center" mt={-16} flexDir={{ base: 'column', md: 'row' }}>
          {topCandidates.map(({ id }) => (
            <Flex
              flexDir="column"
              align="center"
              key={`/top-candidate/${id}`}
              mx={{ base: 0, md: 3 }}
              my={{ base: 3, md: 0 }}
            >
              <Avatar
                w={{ base: '125px', md: '175px' }}
                h={{ base: '125px', md: '175px' }}
                name={CANDIDATES[id].name}
                src={`img/candidate-${CANDIDATES[id].ballotNumber}.png`}
                mr={3}
                border="0"
              />
              <Flex mt={4} align="center" justify="center">
                <Flex
                  bg="black"
                  color="white"
                  h="34px"
                  w="30px"
                  borderRadius="50%"
                  textAlign="center"
                  align="center"
                  justify="center"
                  fontWeight="bold"
                  fontSize="xl"
                >
                  {CANDIDATES[id].ballotNumber}
                </Flex>
                <Text fontSize="2xl" ml={2}>
                  {CANDIDATES[id].name}
                </Text>
              </Flex>
              <Button
                mt={2}
                onClick={() => {
                  window.open(`${CANDIDATE_URL}/${CANDIDATES[id].url}.html`);
                }}
              >
                Learn More
              </Button>
            </Flex>
          ))}
        </Flex>
        <Text w="full" textAlign="center" fontWeight="bold" mt={8} mb={4}>
          SHARE YOUR RESULTS
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<TwitterLogo weight="duotone" size={28} />}
            colorScheme="twitter"
            aria-label="Twitter"
            size="lg"
            onClick={() => {
              window.open(
                `https://twitter.com/intent/tweet?text=${encodeURI(
                  topListString
                )}`
              );
            }}
          />
          <IconButton
            icon={<FacebookLogo weight="duotone" size={28} />}
            colorScheme="facebook"
            aria-label="Facebook"
            size="lg"
          />
          <IconButton
            icon={<EnvelopeSimple weight="duotone" size={28} />}
            colorScheme="cyan"
            aria-label="Twitter"
            size="lg"
          />
        </HStack>

        <Divider my={8} />

        <Heading fontSize="3xl">Why them?</Heading>
        <Text fontSize="lg">{`YOUR TOP CANIDADATE${
          topCandidates.length > 1 ? 'S' : ''
        } GOT ${topScore}PT${topScore > 1 ? 'S' : ''}.`}</Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} mt={-12}>
          {!!(
            profile && !!topCandidates.find(({ id }) => id === profile)?.id
          ) && (
            <Flex justify="center" mt={16}>
              <ProfileCard
                id={profile}
                personalProfile={CANDIDATES[profile].personalProfile}
                governmentProfile={CANDIDATES[profile].governmentProfile}
                candidateDetails={{
                  name: CANDIDATES[profile].name,
                  image: `img/candidate-${CANDIDATES[profile].ballotNumber}.png`,
                  category: 'Profile',
                  points: 1,
                }}
              />
            </Flex>
          )}
          {issues &&
            Object.entries(issues)
              .filter(
                (issue) => !!topCandidates.find(({ id }) => id === issue[1])?.id
              )
              .map(
                ([issue, selectedIssue]) =>
                  selectedIssue && (
                    <Flex justify="center" mt={16}>
                      <IssueCard
                        id={selectedIssue}
                        issue={issue as unknown as Issue}
                        candidateDetails={{
                          name: CANDIDATES[selectedIssue].name,
                          image: `img/candidate-${CANDIDATES[selectedIssue].ballotNumber}.png`,
                          category: ISSUE_TITLE[issue],
                          points: 1,
                        }}
                        stand={CANDIDATES[selectedIssue].stands[issue]}
                      />
                    </Flex>
                  )
              )
              .filter((item) => !!item)}
          {!!(
            controversies?.length &&
            !!topCandidates.find(({ id }) => id === profile)?.id
          ) &&
            controversies.map((controversy) => {
              <Flex justify="center" mt={16}>
                <ControversyCard
                  id={controversy}
                  key={`controversy/${controversy}`}
                  controversies={CANDIDATES[controversy].controversies}
                  candidateDetails={{
                    name: CANDIDATES[controversy].name,
                    image: `img/candidate-${CANDIDATES[controversy].ballotNumber}.png`,
                    category: 'Controversy',
                    points: -1,
                  }}
                />
              </Flex>;
            })}
        </SimpleGrid>

        <Text fontSize="xl" mt={32} fontWeight="bold" letterSpacing="widest">
          YOUR OTHER CHOICES
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} mt={-12} mb={24}>
          {!!(
            profile && !topCandidates.find(({ id }) => id === profile)?.id
          ) && (
            <Flex justify="center" mt={16}>
              <ProfileCard
                id={profile}
                personalProfile={CANDIDATES[profile].personalProfile}
                governmentProfile={CANDIDATES[profile].governmentProfile}
                candidateDetails={{
                  name: CANDIDATES[profile].name,
                  image: `img/candidate-${CANDIDATES[profile].ballotNumber}.png`,
                  category: 'Profile',
                  points: 1,
                }}
              />
            </Flex>
          )}
          {issues &&
            Object.entries(issues)
              .filter(
                (issue) => !topCandidates.find(({ id }) => id === issue[1])?.id
              )
              .map(
                ([issue, selectedIssue]) =>
                  selectedIssue && (
                    <Flex justify="center" mt={16}>
                      <IssueCard
                        id={selectedIssue}
                        issue={issue as unknown as Issue}
                        candidateDetails={{
                          name: CANDIDATES[selectedIssue].name,
                          image: `img/candidate-${CANDIDATES[selectedIssue].ballotNumber}.png`,
                          category: ISSUE_TITLE[issue],
                          points: 1,
                        }}
                        stand={CANDIDATES[selectedIssue].stands[issue]}
                      />
                    </Flex>
                  )
              )
              .filter((item) => !!item)}

          {controversies
            .filter(
              (controversy) =>
                !topCandidates.find(({ id }) => controversy === id)?.id
            )
            .map((controversy) => (
              <Flex justify="center" mt={16} key={`controversy/${controversy}`}>
                <ControversyCard
                  id={controversy}
                  key={`controversy/${controversy}`}
                  controversies={CANDIDATES[controversy].controversies}
                  candidateDetails={{
                    name: CANDIDATES[controversy].name,
                    image: `img/candidate-${CANDIDATES[controversy].ballotNumber}.png`,
                    category: 'Controversy',
                    points: -1,
                  }}
                />
              </Flex>
            ))}
        </SimpleGrid>
        <Divider my={8} />
        <Heading fontSize="3xl">Points Breakdown</Heading>
        <Flex w="full" maxW="container.md" flexDir="column">
          {results.map(({ id, score }) => (
            <Flex
              key={id}
              boxShadow="lg"
              justify="center"
              align="center"
              border="1px"
              borderColor="gray.100"
              borderRadius="lg"
              my={1}
              w="full"
              px={6}
              py={4}
              bg="purple.300"
              color="purple.900"
            >
              <Avatar
                size="md"
                name={CANDIDATES[id].name}
                src={`img/candidate-${CANDIDATES[id].ballotNumber}.png`}
                mr={3}
              />
              <Heading fontSize="xl">{CANDIDATES[id].name}</Heading>
              <Spacer />
              <Text fontWeight="bold">{`${score > 0 ? '+' : ''}${score}`}</Text>
            </Flex>
          ))}
        </Flex>

        <Divider my={8} />
        <Heading fontSize="3xl">References</Heading>
        <Stack mt={4} mx={4}>
          {REFERENCES.map(({ title, link }, i) => (
            <HStack key={title}>
              <Text>{`[${i + 1}] ${title}`}</Text>
              <Link
                isExternal
                href={link}
                color="blue.400"
                display="inline-block"
              >
                <Text as="span">Link</Text>
              </Link>
            </HStack>
          ))}
        </Stack>

        <Footer mt={16} />
        <HStack
          display="inline-block"
          alignItems="center"
          textAlign="center"
          mt={3}
          mb={8}
          mx={2}
        >
          <Text
            as="span"
            letterSpacing="widest"
            fontSize="sm"
            fontWeight="black"
          >
            FOR QUESTIONS, COMMENTS, OR SUGGESTIONS, SEND AN EMAIL AT
          </Text>
          <Link
            href="mailto:carl@carldegs.com"
            fontSize="sm"
            fontWeight="black"
            color="blue.400"
            as="a"
          >
            carl@carldegs.com
          </Link>
        </HStack>
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Results;
