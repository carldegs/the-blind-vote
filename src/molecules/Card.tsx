import { Box, BoxProps } from '@chakra-ui/react';

interface CardProps extends BoxProps {
  selected?: boolean;
}

const Card: React.FC<CardProps> = ({ children, selected, ...boxProps }) => {
  return (
    <Box
      border="1px"
      borderRadius="md"
      px={4}
      py={2}
      bg={selected && 'blue.200'}
      cursor="pointer"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default Card;
