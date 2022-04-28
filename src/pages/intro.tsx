import { Button } from '@chakra-ui/react';
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
        <QuizLayoutDescription>
          Add instructions and disclaimer here. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </QuizLayoutDescription>
      </QuizLayoutHeader>
      <QuizLayoutContent alignItems="center" justifyContent="center">
        <Button
          onClick={() => {
            router.push(ROUTES.profile);
          }}
          size="lg"
        >
          START THE QUIZ
        </Button>
      </QuizLayoutContent>
    </QuizLayout>
  );
};

export default Intro;
