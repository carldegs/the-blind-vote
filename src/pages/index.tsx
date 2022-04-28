import { Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Layout from '../layouts/Layout';
import { ROUTES } from '../routes';

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <Layout center>
      <Heading>Home Page</Heading>
      <Button
        onClick={() => {
          router.push(ROUTES.intro);
        }}
      >
        Start
      </Button>
    </Layout>
  );
};

export default Home;
