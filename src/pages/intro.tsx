import { Button, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '../layouts/Layout';
import { ROUTES } from '../routes';

const Intro: React.FC = () => {
  const router = useRouter();
  return (
    <Layout center>
      <Heading>Intro</Heading>
      <Button
        onClick={() => {
          router.push(ROUTES.profile);
        }}
      >
        Start
      </Button>
    </Layout>
  );
};

export default Intro;
