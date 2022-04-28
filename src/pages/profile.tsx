import {
  Button,
  ListItem,
  Spacer,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

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
import { setProfile } from '../modules/pollSlice';
import Card from '../molecules/Card';
import { ROUTES } from '../routes';
import shuffleArray from '../utils/shuffleArray';

const Profile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const selectedProfile = useAppSelector(({ poll }) => poll.profile);
  const profiles = useMemo(
    () =>
      shuffleArray(
        Object.values(CANDIDATES).map(
          ({ id, personalProfile, governmentProfile }) => ({
            id,
            personalProfile,
            governmentProfile,
          })
        )
      ),
    []
  );

  return (
    <QuizLayout>
      <QuizLayoutHeader>
        <QuizLayoutSubtitle>PART 1</QuizLayoutSubtitle>
        <QuizLayoutTitle>Personal and Government Profile</QuizLayoutTitle>
        <QuizLayoutDescription>
          Choose the profile you like the most without seeing their names
        </QuizLayoutDescription>
        <QuizLayoutNextButton
          isDisabled={!selectedProfile}
          onClick={() => {
            router.push(ROUTES.selectIssues);
          }}
        />
      </QuizLayoutHeader>
      <QuizLayoutContent
        overflow="auto"
        overscrollBehavior="none"
        flexDir={{ base: 'column', md: 'row' }}
      >
        {profiles.map(({ id, personalProfile, governmentProfile }) => (
          <Card
            key={`profile/${id}`}
            selected={selectedProfile === id}
            w={{ base: '90%', md: '350px' }}
            minW="350px"
            h="full"
            maxH={{ base: '500px', md: '500px' }}
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

            <Button
              isFullWidth
              colorScheme={selectedProfile === id ? 'green' : 'blue'}
              onClick={() => dispatch(setProfile(id))}
              mt={4}
            >
              {selectedProfile === id ? 'SELECTED' : 'SELECT'}
            </Button>
          </Card>
        ))}
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Profile;
