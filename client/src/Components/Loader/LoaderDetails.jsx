import React from 'react';
import { Box, Center, Spinner } from '@chakra-ui/react';

export default function LoaderDetails() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="gray.200"
    >
      <Center>
        <Spinner
          thickness="5px"
          speed="0.4s"
          size="xl"
          emptyColor="gray.200"
          color="blue.900"
          width="80px"
          height="80px"
          left="50%"
          top="50%"
        />
      </Center>
    </Box>
  );
}
