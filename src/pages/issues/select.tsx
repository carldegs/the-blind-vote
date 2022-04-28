import { Button, Text, Container, SimpleGrid, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

import { ISSUE_TITLE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import QuizLayout, {
  QuizLayoutNextButton,
  QuizLayoutDescription,
  QuizLayoutHeader,
  QuizLayoutSubtitle,
  QuizLayoutTitle,
  QuizLayoutContent,
} from '../../layouts/QuizLayout';
import { selectValidSelectIssuePage } from '../../modules/pollSelectors';
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

  const isValid = useAppSelector(selectValidSelectIssuePage);

  useEffect(() => {
    if (!isValid) {
      router.push(ROUTES.home);
    }
  }, [isValid, router]);

  return (
    <QuizLayout>
      <QuizLayoutHeader>
        <QuizLayoutSubtitle>PART 2</QuizLayoutSubtitle>
        <QuizLayoutTitle>Select Issues</QuizLayoutTitle>
        <QuizLayoutDescription>
          Know which candidates have the same opinions on issues that matter to
          you. Select at least 3 issues.
        </QuizLayoutDescription>

        <QuizLayoutNextButton
          isDisabled={selectedIssues.length < 3}
          onClick={() => {
            router.push(ROUTES.issue);
          }}
        />
      </QuizLayoutHeader>
      <QuizLayoutContent
        overflow="auto"
        overscrollBehavior="none"
        flexDir={{ base: 'column', md: 'row' }}
      >
        <Container maxW="container.xl" w="full">
          <Flex my={8} align="center" justify="center">
            <Button
              size="sm"
              isFullWidth
              mr={2}
              onClick={() => dispatch(selectAllIssues())}
              isActive={selectedIssues.length === issues.length}
              maxW="400px"
              colorScheme="teal"
              variant="outline"
            >
              SELECT ALL
            </Button>
            <Button
              size="sm"
              isFullWidth
              ml={2}
              onClick={() => dispatch(selectNoneIssues())}
              maxW="400px"
              colorScheme="teal"
              variant="outline"
            >
              SELECT NONE
            </Button>
          </Flex>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 5 }}
            spacing={{ base: 3, md: 4 }}
            my={4}
          >
            {issues.map(({ key, value }) => (
              <Card
                key={`select-issue/${key}`}
                onClick={() => dispatch(toggleSelectedIssues(key))}
                selected={selectedIssues.includes(key)}
                mx={0}
                my={0}
                w={{ base: 'full', md: 'inherit' }}
                textAlign="center"
                justify="center"
                colorScheme="teal"
                py={{ base: 3, md: 7 }}
              >
                <Text
                  fontWeight={
                    selectedIssues.includes(key) ? 'bold' : 'semibold'
                  }
                >
                  {value}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default SelectIssues;
