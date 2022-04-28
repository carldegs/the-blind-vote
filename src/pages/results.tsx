import {
  Avatar,
  Button,
  Circle,
  Divider,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { CANDIDATES, ISSUE_TITLE } from '../constants';
import { useAppSelector } from '../hooks/reduxHooks';
import Layout from '../layouts/Layout';
import {
  selectResults,
  selectTopResults,
  selectValidResultsPage,
} from '../modules/pollSelectors';
import Card from '../molecules/Card';
import { ROUTES } from '../routes';

const Results: React.FC = () => {
  const router = useRouter();
  const results = useAppSelector(selectResults);
  const { topCandidates, topScore } = useAppSelector(selectTopResults);
  const isValid = useAppSelector(selectValidResultsPage);

  useEffect(() => {
    if (!isValid) {
      router.push(ROUTES.home);
    }
  }, [isValid, router]);

  return (
    <Layout center>
      <Heading mb={2}>Results</Heading>
      <Heading fontSize="lg" mb={2}>{`YOUR TOP CANDIDATE${
        topCandidates.length > 1 ? 'S' : ''
      } (${topScore}pt${topScore > 1 ? 's' : ''})`}</Heading>
      <HStack>
        {topCandidates.map(({ id }) => (
          <Flex flexDir="column" align="center" key={`/top-candidate/${id}`}>
            <Avatar size="xl" name={CANDIDATES[id].name} />
            <HStack spacing={2} fontSize="2xl">
              <Circle bg="black" color="white" size="32px">
                {CANDIDATES[id].ballotNumber}
              </Circle>
              <Text>{CANDIDATES[id].name}</Text>
            </HStack>
            <Button mt={4}>Learn More</Button>
          </Flex>
        ))}
      </HStack>

      <Text w="full" textAlign="center" mt={4}>
        Share your results
      </Text>
      <HStack spacing={2}>
        <Button>TWITTER</Button>
        <Button>FACEBOOK</Button>
        <Button>EMAIL</Button>
      </HStack>

      <Divider my={8} />

      {results.map(({ id, score, selected }) => (
        <Stack key={`rank/${id}`} align="center">
          <HStack>
            <Text>{CANDIDATES[id].name}</Text>
            <Text>{score}</Text>
          </HStack>
          {(selected.profile ||
            Object.values(selected.stands).some((stand) => stand) ||
            selected.controversies) && (
            <Card>
              <HStack align="center" fontSize="sm" spacing={2}>
                {selected.profile && <Text>Profile +1</Text>}
                {Object.entries(selected.stands).map(
                  ([issue, issueSelected]) =>
                    issueSelected && <Text>{`${ISSUE_TITLE[issue]} +1`}</Text>
                )}
                {selected.controversies && <Text>Controversy -1</Text>}
              </HStack>
            </Card>
          )}
        </Stack>
      ))}
    </Layout>
  );
};

export default Results;
