import { Box, Center, Grid } from '@chakra-ui/layout';
import React from 'react';

import Navigation, { NAVBAR_HEIGHT } from '../organisms/Navigation';

const Layout: React.FC<{ center?: boolean }> = ({ children, center }) => (
  <Grid gridTemplateRows="auto 1fr" h="100vh" overflowY="hidden">
    <Navigation />
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
