import {
  Flex,
  Container,
  Heading,
  ContainerProps,
  Text,
  Button,
  ButtonProps,
  FlexProps,
  TextProps,
} from '@chakra-ui/react';
import { ArrowRight } from 'phosphor-react';
import { forwardRef } from 'react';

import Layout from './Layout';

const _QuizLayoutHeader: React.ForwardRefRenderFunction<any, FlexProps> = (
  { children, ...flexProps },
  ref
) => (
  <Flex
    w="full"
    minH={{ base: '224px', md: '300px' }}
    h="fit-content"
    bg="purple.400"
    align="center"
    justify="center"
    py={6}
    boxShadow="md"
    textColor="purple.900"
    ref={ref}
    {...flexProps}
  >
    <Container maxW="container.lg" my={4}>
      {children}
    </Container>
  </Flex>
);

export const QuizLayoutHeader = forwardRef(_QuizLayoutHeader);

export const QuizLayoutTitle: React.FC = ({ children }) => (
  <Heading
    textAlign="center"
    fontSize={{ base: '2xl', md: '4xl' }}
    mb={{ base: 4, md: 8 }}
  >
    {children}
  </Heading>
);

export const QuizLayoutSubtitle: React.FC<TextProps> = ({
  children,
  ...textProps
}) => (
  <Text
    fontWeight="bold"
    letterSpacing="widest"
    textAlign="center"
    fontSize={{ base: 'sm', md: 'md' }}
    {...textProps}
  >
    {children}
  </Text>
);

export const QuizLayoutDescription: React.FC<FlexProps> = ({
  children,
  ...flexProps
}) => (
  <Flex
    align="center"
    justify="center"
    textAlign="center"
    display="inline-block"
    w="full"
    {...flexProps}
  >
    {children}
  </Flex>
);

export const QuizLayoutNextButton: React.FC<
  ButtonProps & { flexProps?: FlexProps }
> = ({ children, flexProps, ...buttonProps }) => (
  <Flex align="center" justify="center" {...flexProps}>
    <Button
      isFullWidth
      mt={4}
      colorScheme={buttonProps.isDisabled ? 'purple' : 'green'}
      rightIcon={<ArrowRight />}
      isDisabled={buttonProps.isDisabled}
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
  <Flex w="full" flexGrow={1} align="center" pb={4} {...otherProps}>
    {children}
  </Flex>
);

const QuizLayout: React.FC<{ center?: boolean }> = ({
  center = true,
  children,
}) => {
  return (
    <Layout center={center} overflow="auto">
      {children}
    </Layout>
  );
};

export default QuizLayout;
