import { Box, Flex, useDimensions } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef } from 'react';

import { CANDIDATES, ISSUE_BLURB, ISSUE_TITLE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
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
import IssueCard from '../../organisms/IssueCard';
import { ROUTES } from '../../routes';
import { Alignment } from '../../types/Alignment';
import { GTAG_EVENTS, sendEvent } from '../../utils/gtag';
import shuffleArray from '../../utils/shuffleArray';

const Issue: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedIssues = useAppSelector(selectSelectedIssues);
  const stands = useAppSelector(selectStands);
  const issueIdx = useAppSelector(({ poll }) => poll.issueIdx);
  const isValid = useAppSelector(selectValidIssuesPage);
  const elementRef = useRef();
  const dimensions = useDimensions(elementRef, true);

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
  const { candidateStands } = useMemo(() => {
    let candidateStands = shuffleArray(
      Object.values(CANDIDATES)
        .map(({ id, stands }) => ({
          id,
          stand: stands[issue],
        }))
        .filter(
          ({ stand }) =>
            !stand?.statement.includes('No statement available') &&
            !stand?.statement.includes('No data available')
        )
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

    if (hasAlignment) {
      candidateStands.sort(
        ({ stand: a }, { stand: b }) => a?.alignment - b?.alignment
      );
    }

    return { candidateStands, hasAlignment };
  }, [issue]);

  useEffect(() => {
    if (!selectedIssues.length) {
      router.push(ROUTES.selectIssues);
    }
  }, [router, selectedIssues.length]);

  return (
    <Flex h="100vh" flexDir="column">
      <QuizLayoutHeader minH="unset">
        <QuizLayoutSubtitle>{`PART 2 | ISSUE ${issueIdx + 1}/${
          selectedIssues.length
        }`}</QuizLayoutSubtitle>
        <QuizLayoutTitle>{ISSUE_TITLE[issue]}</QuizLayoutTitle>
        <QuizLayoutDescription fontSize={{ base: 'sm', md: 'md' }}>
          {ISSUE_BLURB[issue]}
        </QuizLayoutDescription>
        <QuizLayoutNextButton
          onClick={() => {
            if (issueIdx < selectedIssues.length - 1) {
              sendEvent(GTAG_EVENTS.select(issue, currStand));
              dispatch(setNextIssue());
              window.scrollTo(0, 0);
            } else {
              router.push(ROUTES.controversies);
            }
          }}
          isDisabled={!currStand}
        />
      </QuizLayoutHeader>

      {dimensions?.borderBox?.top <= 0 && (
        <QuizLayoutHeader
          pos="fixed"
          top={0}
          minH={0}
          zIndex={10}
          display={{ base: 'unset', md: 'none' }}
          py={0}
        >
          <QuizLayoutTitle>{ISSUE_TITLE[issue]}</QuizLayoutTitle>
          <QuizLayoutNextButton
            onClick={() => {
              if (issueIdx < selectedIssues.length - 1) {
                dispatch(setNextIssue());
                window.scrollTo(0, 0);
              } else {
                router.push(ROUTES.controversies);
              }
            }}
            isDisabled={!currStand}
            mt={-2}
          />
        </QuizLayoutHeader>
      )}

      <Box ref={elementRef} />
      <QuizLayoutContent
        overflow={{ base: 'visible', md: 'auto' }}
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
    </Flex>
  );
};

export default Issue;
