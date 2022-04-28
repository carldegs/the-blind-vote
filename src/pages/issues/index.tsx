import { Button, Text, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MinusCircle, Question, ThumbsDown, ThumbsUp } from 'phosphor-react';
import { useEffect, useMemo } from 'react';

import { CANDIDATES, ISSUE_TITLE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutDescription,
  QuizLayoutHeader,
  QuizLayoutNextButton,
  QuizLayoutSubtitle,
  QuizLayoutTitle,
} from '../../layouts/QuizLayout';
import {
  selectSelectedIssues,
  selectStands,
  selectValidIssuesPage,
} from '../../modules/pollSelectors';
import { setNextIssue, setStand } from '../../modules/pollSlice';
import Card from '../../molecules/Card';
import { ROUTES } from '../../routes';
import { Alignment } from '../../types/Alignment';
import shuffleArray from '../../utils/shuffleArray';

const ALIGNMENT_OPTIONS = [
  {
    alignment: Alignment.Agree,
    Icon: ThumbsUp,
    text: 'AGREE',
    color: 'green',
  },
  {
    alignment: Alignment.Neutral,
    Icon: MinusCircle,
    text: 'NEUTRAL',
    color: 'yellow',
  },
  {
    alignment: Alignment.Disagree,
    Icon: ThumbsDown,
    text: 'DISAGREE',
    color: 'red',
  },
  {
    alignment: Alignment.NoStatement,
    Icon: Question,
    text: 'NO STATEMENT',
    color: 'purple',
  },
];

const Issue: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedIssues = useAppSelector(selectSelectedIssues);
  const stands = useAppSelector(selectStands);
  const issueIdx = useAppSelector(({ poll }) => poll.issueIdx);
  const isValid = useAppSelector(selectValidIssuesPage);

  useEffect(() => {
    if (!isValid) {
      router.push(ROUTES.home);
    }
  }, [isValid, router]);

  const issue = useMemo(
    () => selectedIssues[issueIdx],
    [issueIdx, selectedIssues]
  );
  const currStand = useMemo(() => stands[issue], [issue, stands]);
  const { candidateStands, hasAlignment } = useMemo(() => {
    let candidateStands = shuffleArray(
      Object.values(CANDIDATES).map(({ id, stands }) => ({
        id,
        stand: stands[issue],
      }))
    );
    let hasAlignment = false;

    if (
      !candidateStands.every(
        ({ stand }) => stand?.alignment === Alignment.NoStatement
      )
    ) {
      candidateStands = candidateStands.filter(
        ({ stand }) => stand?.alignment !== Alignment.NoStatement
      );
      hasAlignment = true;
    }

    return { candidateStands, hasAlignment };
  }, [issue]);

  useEffect(() => {
    if (!selectedIssues.length) {
      router.push(ROUTES.selectIssues);
    }
  }, [router, selectedIssues.length]);

  return (
    <QuizLayout>
      <QuizLayoutHeader>
        <QuizLayoutSubtitle>{`PART 2 | ISSUE ${issueIdx + 1}/${
          selectedIssues.length
        }`}</QuizLayoutSubtitle>
        <QuizLayoutTitle>{ISSUE_TITLE[issue]}</QuizLayoutTitle>
        <QuizLayoutDescription>TODO: Create blurbs</QuizLayoutDescription>
        <QuizLayoutNextButton
          onClick={() => {
            if (issueIdx < selectedIssues.length - 1) {
              dispatch(setNextIssue());
            } else {
              router.push(ROUTES.controversies);
            }
          }}
          isDisabled={!currStand}
        />
      </QuizLayoutHeader>
      <QuizLayoutContent
        overflow="auto"
        overscrollBehavior="none"
        flexDir={{ base: 'column', md: 'row' }}
      >
        {candidateStands.map(({ id, stand }) => {
          const cardColorScheme = ALIGNMENT_OPTIONS.find(
            ({ alignment }) => alignment === stand?.alignment
          )?.color;

          return (
            <Card
              key={`issue/${issue}/${id}`}
              selected={currStand === id}
              w={{ base: '90%', md: '350px' }}
              minW="350px"
              h="full"
              maxH={{ base: '500px', md: '500px' }}
              colorScheme={cardColorScheme}
            >
              {hasAlignment &&
                ALIGNMENT_OPTIONS.filter(
                  ({ alignment }) => alignment === stand?.alignment
                ).map(({ Icon, text, color }) => (
                  <Flex
                    color={`${color}.500`}
                    align="center"
                    key={`${id}/${text}`}
                  >
                    <Icon weight="duotone" size={32} />
                    <Text
                      fontWeight="bold"
                      fontSize="xl"
                      ml={2}
                      letterSpacing="widest"
                    >
                      {text}
                    </Text>
                  </Flex>
                ))}
              <Text mt={6}>{stand?.statement}</Text>
              <Spacer />

              <Button
                isFullWidth
                colorScheme={currStand === id ? cardColorScheme : 'blue'}
                mt={4}
                onClick={() => {
                  dispatch(setStand({ issue, candidate: id }));
                }}
              >
                {currStand === id ? 'SELECTED' : 'SELECT'}
              </Button>
            </Card>
          );
        })}
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Issue;
