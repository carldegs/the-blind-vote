import { Button, Heading, HStack, Text, Wrap } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CANDIDATES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import Layout from '../layouts/Layout';
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
    <Layout center>
      <Heading>Profile</Heading>
      <Wrap>
        {profiles.map(({ id, personalProfile, governmentProfile }) => (
          <Card
            key={`profile/${id}`}
            onClick={() => dispatch(setProfile(id))}
            selected={selectedProfile === id}
          >
            <Heading fontSize="lg">Personal Life</Heading>
            {personalProfile.map((profile) => (
              <Text key={`profile/${id}/personal/${profile}`}>{profile}</Text>
            ))}

            <Heading fontSize="lg">Government Life</Heading>
            {governmentProfile.map((profile) => (
              <Text key={`profile/${id}/government/${profile}`}>{profile}</Text>
            ))}

            {process.env.NODE_ENV === 'development' && <Text>{id}</Text>}
          </Card>
        ))}
      </Wrap>
      <HStack spacing={4}>
        <Button
          onClick={() => {
            router.push(ROUTES.intro);
          }}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            router.push(ROUTES.selectIssues);
          }}
        >
          Next
        </Button>
      </HStack>
    </Layout>
  );
};

export default Profile;
