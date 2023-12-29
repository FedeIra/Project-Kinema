import {
  Flex,
  Image,
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Center,
  Link,
  FormControl,
} from '@chakra-ui/react';
import Footer from '../../Home/Chakra UI Components/Footer';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';
import loader from '../../../Assets/loader.gif';

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [errorEm, setErrorEm] = useState(true);
  const [validName, setValidName] = useState(true)
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();


  const [user, setUser] = useState({
    displayName: '',
    email: '',
    password: '',
    error: false,
  });

  const { signup, signupWithGoogle } = useAuth();

  function handleChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(!user.displayName || user.displayName.trim() === "" ) {
        setValidName(false)
        return
      }else{
        setValidName(true)
      }
      setLoading(true)
      await signup(user.email, user.password, user.displayName);
      pathname.includes('start') ? navigate('/register/plan/start') : navigate('/register/plan');
    } catch (error) {
      if(error.message.includes("already")){
        setErrorEm(false)
        await signup(user.email, user.password, user.displayName, error);
      }else{
        setErrorEm(true)
      }
      if(error.message.includes("Password")){
        setError(false);
      }else{
        setError(true)
      }
    }
  }

  async function handleGoogleSignin() {
    setLoading(true)
    await signupWithGoogle();
  }

  return (
    <div>
    <Box
      position={'relative'}
      height={'100vh'}
      backgroundColor={'#1D1D1D'}
      backgroundImage={
        'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
      }
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      >
      <NavBarPayment></NavBarPayment>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          display="flex"
          alignItems={"center"}
        justifyContent="center"  
      >
       
        <Stack
          bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
          <Flex justify='space-between' align='center' h='60px'>
            <Heading
              color={'white'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Sign Up
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
            { loading ? <Image boxSize='60px' src={loader} alt='loader' /> : null }
          </Flex>

          </Stack>
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <Input
                placeholder="Username"
                bg={'gray.100'}
                border={0}
                name="displayName"
                type="text"
                value={user.displayName}
                onChange={(e) => {
                  handleChange(e);
                }}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Center>{!validName && <Text color={"#cd6155"} fontWeight={"600"} >You need to add a username</Text>} </Center>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  bg={'gray.100'}
                  border={0}
                  name="email"
                  id={1}
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  placeholder="Password"
                  type="password"
                  bg={'gray.100'}
                  border={0}
                  id={3}
                  autoComplete={'none'}
                  marginTop={'20px'}
                  name="password"
                  value={user.password}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Button
                  fontFamily={'heading'}
                  mt={8}
                  w={'full'}
                  bgGradient="linear(to-r, blue.400,cyan.400)"
                  color={'white'}
                  onClick={handleSubmit}
                  _hover={{
                    bgGradient: 'linear(to-r, blue.600,cyan.600)',
                    boxShadow: 'xl',
                  }}
                >
                  Sign Up
                </Button>

                <Center>{!errorEm && <Text color={"#cd6155"} fontWeight={"600"} >Email already in use</Text>} </Center>
                <Center>{!error && <Text color={"#cd6155"} fontWeight={"600"} >Should have at least 6 characters</Text>}</Center>
              </FormControl>
            </Stack>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              backgroundColor={'white'}
              marginTop={'30px'}
              color={"black"}
              _hover={{
                backgroundColor: "rgb(232, 229, 229)"
              }}
              onClick={handleGoogleSignin}
              leftIcon={<FcGoogle />}
            >
              Sign up with Google
            </Button>
          </Box>
          form
          <Stack
            direction={{ base: 'flex', sm: 'row' }}
            gap={1}
            justifyContent={'center'}
          >
            <Text color={'white'}>Are you already registered? </Text>
              <Link  href='/login'  color={'gray'}>Log in</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
      <Footer/>
    </div>
  );
}
