import {
  Avatar,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CANDIDATES, ISSUE_TITLE } from '../constants';
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
import { Issue } from '../types/Issue';

const Results: React.FC = () => {
  const router = useRouter();
  const results = useAppSelector(selectResults);
  const { topCandidates, topScore } = useAppSelector(selectTopResults);
  const isValid = useAppSelector(selectValidResultsPage);
  const profile = useAppSelector(selectProfile);
  const issues = useAppSelector(selectStands);
  const controversies = useAppSelector(selectControversies);

  useEffect(() => {
    if (!isValid) {
      // router.push(ROUTES.home);
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
                w="175px"
                h="175px"
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
              <Button mt={2}>Learn More</Button>
            </Flex>
          ))}
        </Flex>
        <Text w="full" textAlign="center" mt={8}>
          Share your results
        </Text>
        <HStack spacing={2}>
          <Button>TWITTER</Button>
          <Button>FACEBOOK</Button>
          <Button>EMAIL</Button>
        </HStack>

        <Divider my={8} />

        <Heading fontSize="3xl">Why them?</Heading>
        <Text fontSize="lg">{`YOUR TOP CANIDADATE${
          topCandidates.length > 1 ? 'S' : ''
        } GOT ${topScore}PT${topScore > 1 ? 'S' : ''}.`}</Text>

        <SimpleGrid columns={{ base: 1, md: 3 }} mt={-12}>
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
        <SimpleGrid columns={{ base: 1, md: 3 }} mt={-12} mb={24}>
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
              borderRadius="md"
              my={2}
              w="full"
              px={6}
              py={4}
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
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Results;
