import { Button, Text, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
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
import IssueCard from '../../organisms/IssueCard';
import { ROUTES } from '../../routes';
import { Alignment } from '../../types/Alignment';
import shuffleArray from '../../utils/shuffleArray';

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
          return (
            <IssueCard
              id={id}
              key={`issue/${issue}/${id}`}
              issue={issue}
              stand={stand}
              selected={currStand === id}
              onClick={() => {
                dispatch(setStand({ issue, candidate: id }));
              }}
            />
          );
        })}
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Issue;
