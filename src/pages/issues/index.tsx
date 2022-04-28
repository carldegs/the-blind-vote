import { Heading, Button, Wrap, Text, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { CANDIDATES, ISSUE_TITLE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import Layout from '../../layouts/Layout';
import { setNextIssue, setPrevIssue, setStand } from '../../modules/pollSlice';
import Card from '../../molecules/Card';
import { ROUTES } from '../../routes';
import { Alignment } from '../../types/Alignment';
import getEnumKey from '../../utils/getEnumKey';
import shuffleArray from '../../utils/shuffleArray';

const Issue: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { selectedIssues, stands, issueIdx } = useAppSelector(
    ({ poll }) => poll
  );

  const issue = useMemo(
    () => selectedIssues[issueIdx],
    [issueIdx, selectedIssues]
  );
  const currStand = useMemo(() => stands[issue], [issue, stands]);
  const candidateStands = useMemo(
    () =>
      shuffleArray(
        Object.values(CANDIDATES).map(({ id, stands }) => ({
          id,
          stand: stands[issue],
        }))
      ),
    [issue]
  );

  useEffect(() => {
    if (!selectedIssues.length) {
      router.push(ROUTES.selectIssues);
    }
  }, [router, selectedIssues.length]);

  return (
    <Layout center>
      <Heading>{`Issue - ${ISSUE_TITLE[issue]}`}</Heading>
      <Wrap>
        {candidateStands.map(({ id, stand }) => (
          <Card
            key={`issue/${issue}/${id}`}
            onClick={() => {
              dispatch(setStand({ issue, candidate: id }));
            }}
            selected={currStand === id}
          >
            <Text fontWeight="bold">
              {getEnumKey(Alignment, stand.alignment)}
            </Text>
            <Text>{stand.statement}</Text>
            {process.env.NODE_ENV === 'development' && <Text>{id}</Text>}
          </Card>
        ))}
      </Wrap>
      <HStack spacing={4}>
        <Button
          onClick={() => {
            if (issueIdx > 0) {
              dispatch(setPrevIssue());
            } else {
              router.push(ROUTES.selectIssues);
            }
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            if (issueIdx < selectedIssues.length - 1) {
              dispatch(setNextIssue());
            } else {
              router.push(ROUTES.controversies);
            }
          }}
        >
          Next
        </Button>
      </HStack>
    </Layout>
  );
};

export default Issue;
