import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouteLink } from "react-router-dom"

export default function NotFound() {
  return (
    <Box textAlign="center" py={10} px={6} backgroundColor="#222222" height={"100vh"}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2} color="white">
        Page Not Found
      </Text>
      <Text color="white" mb={6}>
        The page you're looking for does not seem to exist
      </Text>
    
      <RouteLink to={"/home"}>
      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid">
        Go to Home
      </Button>
            </RouteLink>
    </Box>
  );
}