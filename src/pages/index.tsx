import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import ThumbnailVideo from '../../public/img/thumbnail-vid.webp';
import ThumbnailImage from '../../public/img/thumbnail.webp';
import Layout from '../layouts/Layout';
import { ROUTES } from '../routes';

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <Layout center>
      <Heading fontSize={{ base: '7xl', md: '9xl' }} mb={-4}>
        the blind test
      </Heading>
      <Text fontSize={{ base: 'lg', md: '3xl' }} letterSpacing="widest" mt={0}>
        THE UNDECIDED VOTERS&apos; GUIDE
      </Text>

      <Text
        mt={16}
        fontSize={{ base: 'md', md: 'xl' }}
        textAlign="center"
        px={4}
      >
        Something something walang maboto? Take the quiz now, and it might help
        you decide!
      </Text>
      <Button
        size="lg"
        mt={4}
        onClick={() => {
          router.push(ROUTES.intro);
        }}
      >
        Take the Quiz
      </Button>
      {/* <Button
        mt={4}
        onClick={() => {
          router.push(ROUTES.about);
        }}
        variant="ghost"
      >
        Learn more
      </Button> */}
      <Flex mt={16}>
        <Link href="https://youtu.be/QvOzNL2NsHs" isExternal>
          <Flex
            pos="relative"
            flexDir="column"
            borderRadius="md"
            boxShadow="lg"
            bg="purple.400"
            _hover={{
              bg: 'purple.300',
            }}
            px={4}
            py={4}
            cursor="pointer"
            color="purple.900"
          >
            <Box
              opacity={1}
              _hover={{ opacity: 0 }}
              pos="absolute"
              zIndex={2}
              width="360px"
              height="202px"
            >
              <Image src={ThumbnailImage} alt="vid-thumbnail" layout="fill" />
            </Box>
            <Box>
              <Image
                src={ThumbnailVideo}
                alt="vid-thumbnail-vid"
                width="360px"
                height="202px"
              />
            </Box>

            <Text
              fontWeight="bold"
              letterSpacing="widest"
              textAlign="center"
              mt={4}
            >
              WATCH THE VIDEO
            </Text>
          </Flex>
        </Link>
      </Flex>
    </Layout>
  );
};

export default Home;
