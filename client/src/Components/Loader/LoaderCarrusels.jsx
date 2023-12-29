import React from 'react';
import { Box, Center, Skeleton, Spinner } from '@chakra-ui/react';

export default function LoaderCarrusels() {
  return (
    <Box>
      <Center height="20vw">
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
      <br />
      <Skeleton height="290px" startColor="gray.100" endColor="gray.600" />
      <br />
      <Skeleton height="290px" startColor="gray.100" endColor="gray.600" />
      <br />
      <Skeleton height="290px" startColor="gray.100" endColor="gray.600" />
    </Box>
  );
}
