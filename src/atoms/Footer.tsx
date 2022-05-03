import { Flex, FlexProps, Image, Link, Text } from '@chakra-ui/react';

import { GTAG_EVENTS, sendEvent } from '../utils/gtag';

const Footer: React.FC<FlexProps> = (flexProps) => {
  return (
    <Flex
      w="full"
      alignItems="center"
      justifyContent="center"
      flexDir="column"
      {...flexProps}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        fontSize={{ base: 'md', md: 'lg' }}
        w="full"
      >
        <Text
          as="span"
          fontWeight="bold"
          letterSpacing={{ base: 'normal', md: 'widest' }}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          CREATED BY
        </Text>
        <Link
          isExternal
          href="https://www.youtube.com/channel/UCpZdK-V4x1b2TFzFBKwGztw"
          onClick={() => {
            sendEvent(GTAG_EVENTS.openReccreate);
          }}
        >
          <Image
            ml={2}
            src="img/reccreate-logo.png"
            alt="reccreate-logo"
            h={{ base: '36px', md: '48px' }}
          />
        </Link>
        <Text
          as="span"
          fontWeight="bold"
          letterSpacing={{ base: 'normal', md: 'widest' }}
          mx={2}
          fontSize={{ base: 'sm', md: 'md' }}
        >
          AND
        </Text>

        <Link
          isExternal
          href="https://www.carldegs.com/"
          onClick={() => {
            sendEvent(GTAG_EVENTS.openLinkedIn);
          }}
        >
          <Image
            src="img/carldegs-logo.svg"
            alt="reccreate-logo"
            h={{ base: '16px', md: '20px' }}
          />
        </Link>
      </Flex>
      <Link fontSize="sm" color="purple" textDecor="underline" href="/privacy">
        Privacy Policy
      </Link>
    </Flex>
  );
};

export default Footer;
