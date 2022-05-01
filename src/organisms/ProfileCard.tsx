import { ListItem, Spacer, UnorderedList } from '@chakra-ui/layout';
import { Button, Text } from '@chakra-ui/react';
import React from 'react';

import Card, { CardProps } from '../molecules/Card';

interface ProfileCardProps {
  id: string;
  personalProfile: string[];
  governmentProfile: string[];
  onClick?: (id: string) => void;
  selected?: boolean;
  candidateDetails?: CardProps['candidateDetails'];
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  id,
  personalProfile,
  governmentProfile,
  onClick,
  selected,
  candidateDetails,
}) => {
  return (
    <Card
      key={`profile/${id}`}
      selected={selected}
      w={{
        base: '90%',
        md: '350px',
      }}
      minW="350px"
      h="full"
      maxH={{
        base: '500px',
        md: '500px',
      }}
      candidateDetails={candidateDetails}
    >
      <Text fontSize="sm" letterSpacing="widest" fontWeight="bold">
        PERSONAL LIFE
      </Text>
      <UnorderedList>
        {personalProfile.map((profile) => (
          <ListItem key={`profile/${id}/personal/${profile}`}>
            {profile}
          </ListItem>
        ))}
      </UnorderedList>
      <Text fontSize="sm" letterSpacing="widest" fontWeight="bold" mt={6}>
        GOVERNMENT LIFE
      </Text>
      <UnorderedList>
        {governmentProfile.map((profile) => (
          <ListItem key={`profile/${id}/government/${profile}`}>
            {profile}
          </ListItem>
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
};

export default ProfileCard;
