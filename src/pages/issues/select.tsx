import { Heading, Button, Wrap, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { ISSUE_TITLE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import Layout from '../../layouts/Layout';
import {
  selectAllIssues,
  selectNoneIssues,
  toggleSelectedIssues,
} from '../../modules/pollSlice';
import Card from '../../molecules/Card';
import { ROUTES } from '../../routes';
import { Issue } from '../../types/Issue';
import sortByStringProp from '../../utils/sortByStringProp';

const SelectIssues: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedIssues = useAppSelector(({ poll }) => poll.selectedIssues);
  const issues = useMemo(
    () =>
      Object.entries(ISSUE_TITLE)
        .map(([key, value]) => ({
          key: key as unknown as Issue,
          value,
        }))
        .sort((a, b) => sortByStringProp(a, b, 'value')),
    []
  );

  return (
    <Layout center>
      <Heading>Select Issues</Heading>
      <Text>Select at least 3 issues</Text>
      <Wrap>
        {issues.map(({ key, value }) => (
          <Card
            key={`select-issue/${key}`}
            onClick={() => dispatch(toggleSelectedIssues(key))}
            selected={selectedIssues.includes(key)}
          >
            {value}
          </Card>
        ))}
        <Card
          onClick={() => dispatch(selectAllIssues())}
          selected={selectedIssues.length === issues.length}
        >
          Select All
        </Card>
        <Card onClick={() => dispatch(selectNoneIssues())}>Select None</Card>
      </Wrap>
      <Button
        onClick={() => {
          router.push(ROUTES.issue);
        }}
        disabled={selectedIssues.length < 3}
      >
        Next
      </Button>
    </Layout>
  );
};

export default SelectIssues;
