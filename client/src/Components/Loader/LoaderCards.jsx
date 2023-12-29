import React from 'react';
import { Box, Center, Skeleton, Spinner } from '@chakra-ui/react';

export default function LoaderCards() {
  return (
    <Box>
      <Center>
        <Spinner
          marginTop="10px"
          thickness="5px"
          speed="0.4s"
          size="xl"
          emptyColor="gray.200"
          color="blue.900"
          width="40px"
          height="40px"
        />
      </Center>
      <br />
      <Skeleton height="450px" startColor="gray.100" endColor="gray.600" />
      <br />
      <Skeleton height="450px" startColor="gray.100" endColor="gray.600" />
      <br />
      <Skeleton height="450px" startColor="gray.100" endColor="gray.600" />
    </Box>
  );
}
