import {
  Flex,
  Container,
  Heading,
  ContainerProps,
  Text,
  Button,
  ButtonProps,
  FlexProps,
} from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';

import Layout from './Layout';

export const QuizLayoutHeader: React.FC<FlexProps> = ({
  children,
  ...flexProps
}) => (
  <Flex
    w="full"
    minH={{ base: '250px', md: '300px' }}
    bg="gray.200"
    align="center"
    justify="center"
    py={6}
    boxShadow="md"
    {...flexProps}
  >
    <Container maxW="container.lg">{children}</Container>
  </Flex>
);

export const QuizLayoutTitle: React.FC = ({ children }) => (
  <Heading
    textAlign="center"
    fontSize={{ base: '2xl', md: '4xl' }}
    mb={{ base: 4, md: 8 }}
  >
    {children}
  </Heading>
);

export const QuizLayoutSubtitle: React.FC = ({ children }) => (
  <Text fontWeight="bold" letterSpacing="widest" textAlign="center">
    {children}
  </Text>
);

export const QuizLayoutDescription: React.FC = ({ children }) => (
  <Flex align="center" justify="center" textAlign="center">
    {children}
  </Flex>
);

export const QuizLayoutNextButton: React.FC<ButtonProps> = ({
  children,
  ...buttonProps
}) => (
  <Flex align="center" justify="center">
    <Button
      isFullWidth
      mt={4}
      colorScheme="blue"
      rightIcon={<ArrowRight />}
      isDisabled={buttonProps.isDisabled}
      opacity={buttonProps.disabled ? `0 !important` : 1}
      maxW="400px"
      {...buttonProps}
    >
      NEXT
    </Button>
  </Flex>
);

export const QuizLayoutContent: React.FC<ContainerProps> = ({
  children,
  ...otherProps
}) => (
  <Flex w="full" flexGrow={1} align="center" {...otherProps} pb={4}>
    {children}
  </Flex>
);

const QuizLayout: React.FC<{ center?: boolean }> = ({
  center = true,
  children,
}) => {
  return <Layout center={center}>{children}</Layout>;
};

export default QuizLayout;
