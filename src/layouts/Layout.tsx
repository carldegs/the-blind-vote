import { Box, Center, Grid, GridProps } from '@chakra-ui/layout';
import React from 'react';

const Layout: React.FC<{ center?: boolean } & GridProps> = ({
  children,
  center,
  ...gridProps
}) => (
  <Grid gridTemplateRows="1fr" h="100vh" overflowY="hidden" {...gridProps}>
    {/* <Navigation /> */}
    <Box as="main" overflowY="auto">
      {center ? (
        <Center h="full" flexDir="column">
          {children}
        </Center>
      ) : (
        children
      )}
    </Box>
  </Grid>
);

export default Layout;
