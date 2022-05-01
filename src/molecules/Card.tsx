import {
  Avatar,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/react';

export interface CardProps extends FlexProps {
  selected?: boolean;
  candidateDetails?: {
    name: string;
    image: string;
    category: string;
    points: number;
  };
}

const Card: React.FC<CardProps & { colorScheme?: string }> = ({
  children,
  selected,
  colorScheme = 'green',
  candidateDetails,
  ...otherProps
}) => {
  return (
    <Flex
      border="1px"
      borderColor={selected ? `${colorScheme}.500` : 'gray.200'}
      borderRadius="md"
      px={6}
      py={7}
      mx={{ base: 0, md: 4 }}
      my={{ base: 3, md: 0 }}
      bg={selected && `${colorScheme}.200`}
      cursor="pointer"
      boxShadow={selected ? 'xl' : 'md'}
      flexDir="column"
      mt={candidateDetails?.image && '4rem !important'}
      {...otherProps}
    >
      {candidateDetails?.image && (
        <Flex alignItems="center" flexDir="column">
          <Avatar
            size="xl"
            name={candidateDetails.name}
            src={candidateDetails.image}
            mt="-4rem !important"
          />
          <Heading fontSize="xl">{candidateDetails.name}</Heading>
          <HStack display="inline-block" alignItems="center" textAlign="center">
            <Text
              as="span"
              letterSpacing="widest"
              fontSize="sm"
              fontWeight="black"
            >
              {candidateDetails.category.toUpperCase()}
            </Text>
            <Text
              as="span"
              fontSize="sm"
              fontWeight="black"
              color={candidateDetails.points >= 0 ? 'green.500' : 'red.500'}
            >
              {`${candidateDetails.points >= 0 ? '+' : ''}${
                candidateDetails.points
              }PT`}
            </Text>
          </HStack>
          <Divider my={4} />
        </Flex>
      )}
      {children}
    </Flex>
  );
};

export default Card;
