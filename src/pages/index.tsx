import { Box, Heading, Stack, Link, Text } from '@chakra-ui/layout';
import { Button, Flex, useBreakpointValue, Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import Footer from '../atoms/Footer';
import QuizLayout from '../layouts/QuizLayout';
import { ROUTES } from '../routes';
import { GTAG_EVENTS, sendEvent } from '../utils/gtag';

const Home: React.FC = () => {
  const router = useRouter();
  const center = useBreakpointValue({ base: false, md: true });
  return (
    <QuizLayout center={center}>
      <Box pos="absolute" w="full" top={0} zIndex={-1}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="var(--chakra-colors-purple-300)"
            fillOpacity="1"
            d="M0,0L30,10.7C60,21,120,43,180,85.3C240,128,300,192,360,181.3C420,171,480,85,540,74.7C600,64,660,128,720,149.3C780,171,840,149,900,149.3C960,149,1020,171,1080,202.7C1140,235,1200,277,1260,256C1320,235,1380,149,1410,106.7L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </Box>
      <Box
        pos="absolute"
        h={{ base: '200%', md: 'full' }}
        w="full"
        top={0}
        zIndex={-2}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="var(--chakra-colors-purple-400)"
            fillOpacity="1"
            d="M0,192L30,186.7C60,181,120,171,180,181.3C240,192,300,224,360,229.3C420,235,480,213,540,186.7C600,160,660,128,720,144C780,160,840,224,900,240C960,256,1020,224,1080,186.7C1140,149,1200,107,1260,122.7C1320,139,1380,213,1410,250.7L1440,288L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"
          ></path>
        </svg>
      </Box>
      <Heading
        textAlign="center"
        fontSize={{ base: '7xl', md: '9xl' }}
        mb={-4}
        mt={{ base: 24, md: 0 }}
        color="purple.900"
      >
        the blind test
      </Heading>

      <Text
        textAlign="center"
        fontSize={{ base: 'lg', md: '3xl' }}
        letterSpacing="widest"
        mt={0}
        color="purple.900"
      >
        THE UNDECIDED VOTERS&apos; GUIDE
      </Text>
      <Flex w="full" maxW="container.sm">
        <Text
          mt={16}
          fontSize={{ base: 'md', md: 'xl' }}
          textAlign="center"
          px={4}
        >
          Still haven&apos;t decided who your next President will be? Take the
          test and find out!
        </Text>
      </Flex>

      <Flex w="full" justify="center">
        <Button
          size="lg"
          maxW="300px"
          w="full"
          mt={4}
          colorScheme="purple"
          onClick={() => {
            router.push(ROUTES.intro);
            sendEvent(GTAG_EVENTS.clickLandingCTA);
          }}
          fontSize="xl"
        >
          TAKE THE QUIZ
        </Button>
      </Flex>
      <Stack mt={16} spacing={4} direction={{ base: 'column', md: 'row' }}>
        <Link
          href="https://youtu.be/QvOzNL2NsHs"
          isExternal
          mx={4}
          onClick={() => {
            sendEvent(GTAG_EVENTS.openVideo);
          }}
        >
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
            <Flex
              opacity={1}
              _hover={{ opacity: 0 }}
              pos="absolute"
              zIndex={2}
              w="full"
              align="center"
              justify="center"
              left={0}
            >
              <Image
                src="img/thumbnail.webp"
                alt="vid-thumbnail"
                width={{ base: '300px', md: '360px' }}
                height={{ base: '168px', md: '202px' }}
              />
            </Flex>
            <Image
              src="img/thumbnail-vid.webp"
              alt="vid-thumbnail-vid"
              width={{ base: '300px', md: '360px' }}
              height={{ base: '168px', md: '202px' }}
              zIndex={1}
              m="auto"
            />

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
        {/* <Link href="/about" isExternal>
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
            align="center"
            justify="center"
            w="400px"
            h="275px"
          >
            <Text textAlign="center">
              <CircleWavyQuestion size={202} />
            </Text>

            <Text
              fontWeight="bold"
              letterSpacing="widest"
              textAlign="center"
              mt={4}
            >
              ABOUT THE QUIZ
            </Text>
          </Flex>
        </Link> */}
      </Stack>

      <Footer mt={{ base: 12, md: 16 }} mb={{ base: 8, md: 0 }} />
    </QuizLayout>
  );
};

export default Home;
