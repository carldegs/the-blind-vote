import { Flex, FlexProps } from '@chakra-ui/react';

interface CardProps extends FlexProps {
  selected?: boolean;
}

const Card: React.FC<CardProps & { colorScheme?: string }> = ({
  children,
  selected,
  colorScheme = 'green',
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
      {...otherProps}
    >
      {children}
    </Flex>
  );
};

export default Card;
