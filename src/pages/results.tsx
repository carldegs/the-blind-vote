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

import { CANDIDATES, ISSUE_TITLE } from '../constants';
import useResults from '../hooks/useResults';
import Layout from '../layouts/Layout';
import Card from '../molecules/Card';

const Results: React.FC = () => {
  const { results, topCandidates, topScore } = useResults();

  console.log({ results });
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

      <Divider />

      {results.map(({ id, score, selected }) => (
        <Stack key={`rank/${id}`}>
          <HStack>
            <Text>{CANDIDATES[id].name}</Text>
            <Text>{score}</Text>
          </HStack>
          {true && (
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
