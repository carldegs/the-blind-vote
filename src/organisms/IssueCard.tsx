import { Flex, Spacer, Button, Text } from '@chakra-ui/react';
import { ThumbsUp, MinusCircle, ThumbsDown, Question } from 'phosphor-react';
import { useMemo } from 'react';

import { CANDIDATES } from '../constants';
import Card, { CardProps } from '../molecules/Card';
import { Alignment } from '../types/Alignment';
import { Issue } from '../types/Issue';

interface IssueCardProps {
  issue: Issue;
  id: string;
  candidateDetails?: CardProps['candidateDetails'];
  selected?: boolean;
  stand: {
    alignment: Alignment;
    statement: string;
  };
  onClick?: ({ issue: Issue, candidate: string }) => void;
}

export const ALIGNMENT_OPTIONS = [
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

const IssueCard: React.FC<IssueCardProps> = ({
  issue,
  id,
  candidateDetails,
  selected,
  stand,
  onClick,
}) => {
  const colorScheme = ALIGNMENT_OPTIONS.find(
    ({ alignment }) => alignment === stand?.alignment
  )?.color;

  const hasAlignment = useMemo(
    () =>
      !Object.values(CANDIDATES)
        .map(({ id, stands }) => ({
          id,
          stand: stands[issue],
        }))
        .every(({ stand }) => stand?.alignment === Alignment.NoStatement),
    [issue]
  );

  return (
    <Card
      selected={selected}
      w={{ base: '90%', md: '350px' }}
      minW="350px"
      h="full"
      maxH={{ base: '500px', md: '500px' }}
      colorScheme={colorScheme}
      candidateDetails={candidateDetails}
    >
      {hasAlignment &&
        ALIGNMENT_OPTIONS.filter(
          ({ alignment }) => alignment === stand?.alignment
        ).map(({ Icon, text, color }) => (
          <Flex color={`${color}.500`} align="center" key={`${id}/${text}`}>
            <Icon weight="duotone" size={32} />
            <Text fontWeight="bold" fontSize="xl" ml={2} letterSpacing="widest">
              {text}
            </Text>
          </Flex>
        ))}
      <Text mt={hasAlignment && 6}>{stand?.statement}</Text>
      <Spacer />

      {onClick && (
        <Button
          isFullWidth
          colorScheme={selected ? colorScheme : 'blue'}
          mt={4}
          onClick={() => {
            onClick({ issue, candidate: id });
          }}
        >
          {selected ? 'SELECTED' : 'SELECT'}
        </Button>
      )}
    </Card>
  );
};

export default IssueCard;
