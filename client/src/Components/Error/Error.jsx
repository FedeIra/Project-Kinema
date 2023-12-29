/* eslint-disable */
import { Alert, AlertIcon, AlertTitle, Button, Box } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import cleanError from '../../Redux/actions';
import Footer from '../Home/Chakra UI Components/Footer';
import NavBar from '../NavBar/NavBar.jsx';
import tv_screen_error from '../../Assets/tv_screen_error.png';

const Error = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(cleanError());
    };
  }, []);

  const handleError = () => {
    window.history.back();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
    >
      <NavBar />
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="100%"
      >
        <Box
          backgroundImage={`url(${tv_screen_error})`}
          backgroundSize="cover"
          backgroundPosition="center"
          padding="40px"
        >
          <AlertIcon boxSize="40px" mr={0} margin="auto" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Oops! Something went wrong.
          </AlertTitle>
          <Button
            onClick={handleError}
            colorScheme="red"
            variant="outline"
            size="lg"
            mt={4}
            mb={4}
          >
            Go Back
          </Button>
        </Box>
      </Alert>
      <Footer />
    </Box>
  );
};

export default Error;
