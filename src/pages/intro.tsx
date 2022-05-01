import { Button, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import QuizLayout, {
  QuizLayoutContent,
  QuizLayoutDescription,
  QuizLayoutHeader,
  QuizLayoutTitle,
} from '../layouts/QuizLayout';
import { ROUTES } from '../routes';

const Intro: React.FC = () => {
  const router = useRouter();
  return (
    <QuizLayout>
      <QuizLayoutHeader>
        <QuizLayoutTitle>How it works</QuizLayoutTitle>
        <QuizLayoutDescription fontSize={{ base: 'sm', md: 'lg' }}>
          We took the names off of the 2022 Presidential Candidates and only
          left short excerpts of their credentials and their statements on
          relevant issues in the Philippines. Simply choose the statement or
          view that best aligns with your views and beliefs, and one point will
          be given to the Candidate whose statement you just chose. At the end
          of the quiz, we&apos;ll give you a breakdown on which Candidate got
          the most points based on your choices.
        </QuizLayoutDescription>
        <Spacer h={8} />
        <QuizLayoutDescription fontSize={{ base: 'sm', md: 'lg' }}>
          <b>Disclaimer: </b>
          This short activity is only one of many ways to help you in the
          upcoming 2022 Elections. This test is merely a guide, and we certainly
          do not force any Candidate upon you. As such, we still highly
          encourage you to do your own reading and research on the Presidential
          candidates to better help form your decision.
        </QuizLayoutDescription>
      </QuizLayoutHeader>
      <QuizLayoutContent alignItems="center" justifyContent="center">
        <Button
          onClick={() => {
            router.push(ROUTES.profile);
          }}
          size="lg"
          colorScheme="green"
        >
          START THE QUIZ
        </Button>
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Intro;
