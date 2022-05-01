import { Flex, FlexProps, Image, Link, Text } from '@chakra-ui/react';

const Footer: React.FC<FlexProps> = (flexProps) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      fontSize={{ base: 'md', md: 'lg' }}
      w="full"
      {...flexProps}
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
        href="https://www.linkedin.com/in/carl-justin-de-guia-b40a1b97/"
      >
        <Image
          src="img/carldegs-logo.svg"
          alt="reccreate-logo"
          h={{ base: '16px', md: '20px' }}
        />
      </Link>
    </Flex>
  );
};

export default Footer;
