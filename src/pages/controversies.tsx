import { Heading, Button, Wrap, Text, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CANDIDATES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import Layout from '../layouts/Layout';
import { toggleControversies } from '../modules/pollSlice';
import Card from '../molecules/Card';
import { ROUTES } from '../routes';
import shuffleArray from '../utils/shuffleArray';

const Controversies: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedControversies = useAppSelector(
    ({ poll }) => poll.controversies
  );
  const controversies = useMemo(
    () =>
      shuffleArray(
        Object.values(CANDIDATES).map(({ id, controversies }) => ({
          id,
          candidateControversies: controversies,
        }))
      ),
    []
  );

  return (
    <Layout center>
      <Heading>Controversies</Heading>
      <Wrap>
        {controversies.map(({ id, candidateControversies }) => (
          <Card
            key={`controversies/${id}`}
            onClick={() => dispatch(toggleControversies(id))}
            selected={selectedControversies.includes(id)}
          >
            {candidateControversies.map((contro) => (
              <Text key={`controversies/${id}/${contro}`}>{contro}</Text>
            ))}

            {process.env.NODE_ENV === 'development' && <Text>{id}</Text>}
          </Card>
        ))}
      </Wrap>
      <HStack spacing={4}>
        <Button
          onClick={() => {
            router.push(ROUTES.issue);
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            router.push(ROUTES.results);
          }}
          disabled={selectedControversies.length > 3}
        >
          Next
        </Button>
      </HStack>
    </Layout>
  );
};

export default Controversies;
