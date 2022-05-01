import { UnorderedList, ListItem, Spacer, Button } from '@chakra-ui/react';

import Card, { CardProps } from '../molecules/Card';

interface ControversyCardProps {
  id: string;
  selected?: boolean;
  controversies: string[];
  onClick?: (id: string) => void;
  candidateDetails: CardProps['candidateDetails'];
}

const ControversyCard: React.FC<ControversyCardProps> = ({
  id,
  selected,
  controversies,
  candidateDetails,
  onClick,
}) => (
  <Card
    key={`controversies/${id}`}
    selected={selected}
    w={{ base: '90%', md: '350px' }}
    minW="350px"
    h="full"
    maxH={{ base: '500px', md: '500px' }}
    candidateDetails={candidateDetails}
  >
    <UnorderedList spacing={4}>
      {controversies.map((cont) => (
        <ListItem key={cont}>{cont}</ListItem>
      ))}
    </UnorderedList>
    <Spacer />

    {onClick && (
      <Button
        isFullWidth
        colorScheme={selected ? 'green' : 'blue'}
        onClick={() => {
          onClick(id);
        }}
        mt={4}
      >
        {selected ? 'SELECTED' : 'SELECT'}
      </Button>
    )}
  </Card>
);

export default ControversyCard;
