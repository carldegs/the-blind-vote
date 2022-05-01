import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { CANDIDATES } from '../constants';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutHeader,
  QuizLayoutNextButton,
  QuizLayoutSubtitle,
  QuizLayoutTitle,
} from '../layouts/QuizLayout';
import { setProfile } from '../modules/pollSlice';
import ProfileCard from '../organisms/ProfileCard';
import { ROUTES } from '../routes';
import { GTAG_EVENTS, sendEvent } from '../utils/gtag';
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
        <QuizLayoutNextButton
          isDisabled={!selectedProfile}
          onClick={() => {
            sendEvent(GTAG_EVENTS.select('profile', selectedProfile));
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
          <ProfileCard
            key={id}
            id={id}
            selected={selectedProfile === id}
            onClick={() => dispatch(setProfile(id))}
            personalProfile={personalProfile}
            governmentProfile={governmentProfile}
          />
        ))}
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Profile;
