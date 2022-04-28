import { Button, ListItem, Spacer, UnorderedList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { CANDIDATES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutDescription,
  QuizLayoutHeader,
  QuizLayoutNextButton,
  QuizLayoutSubtitle,
  QuizLayoutTitle,
} from '../layouts/QuizLayout';
import { selectValidControversiesPage } from '../modules/pollSelectors';
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
        Object.values(CANDIDATES)
          .map(({ id, controversies }) => ({
            id,
            candidateControversies: controversies,
          }))
          .filter(({ candidateControversies }) => candidateControversies.length)
      ),
    []
  );
  const isValid = useAppSelector(selectValidControversiesPage);

  useEffect(() => {
    if (!isValid) {
      router.push(ROUTES.home);
    }
  }, [isValid, router]);

  return (
    <QuizLayout>
      <QuizLayoutHeader>
        <QuizLayoutSubtitle>PART 3</QuizLayoutSubtitle>
        <QuizLayoutTitle>Controversies</QuizLayoutTitle>
        <QuizLayoutDescription>
          Select controversies that you feel are 🚩🚩🚩 and points will be
          deducted to that candidate. You can select up to three.
        </QuizLayoutDescription>
        <QuizLayoutNextButton
          isDisabled={selectedControversies.length > 3}
          onClick={() => {
            router.push(ROUTES.results);
          }}
        />
      </QuizLayoutHeader>
      <QuizLayoutContent
        overflow="auto"
        overscrollBehavior="none"
        flexDir={{ base: 'column', md: 'row' }}
      >
        {controversies.map(({ id, candidateControversies }) => (
          <Card
            key={`controversies/${id}`}
            selected={selectedControversies.includes(id)}
            w={{ base: '90%', md: '350px' }}
            minW="350px"
            h="full"
            maxH={{ base: '500px', md: '500px' }}
          >
            <UnorderedList spacing={4}>
              {candidateControversies.map((cont) => (
                <ListItem key={cont}>{cont}</ListItem>
              ))}
            </UnorderedList>
            <Spacer />

            <Button
              isFullWidth
              colorScheme={
                selectedControversies.includes(id) ? 'green' : 'blue'
              }
              onClick={() => dispatch(toggleControversies(id))}
              mt={4}
            >
              {selectedControversies.includes(id) ? 'SELECTED' : 'SELECT'}
            </Button>
          </Card>
        ))}
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Controversies;
