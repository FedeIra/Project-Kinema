import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Center,
  FormControl,
  Link,
  Image,
  Flex,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import loader from '../../../Assets/loader.gif'
import NavBarPayment from '../../NavBarPayment/NavBarPayment';

export default function Login() {
  const [error, setError] = useState();
  const [notFound, setNotFound] = useState();
  const [incomplete, setIncomplete] = useState(true)
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { login, signupWithGoogle } = useAuth();

  function handleChange(e) {
    e.preventDefault();
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if(!user.password){
        setIncomplete(false)
      }else{
        setIncomplete(true)
      }
      await login(user.email, user.password);
    } catch (error) {
      if(error.message.includes("wrong")){
        setError(true)
      }else{
        setError(false)
      }
      if(error.message.includes("not-found")){
        setNotFound(true)
      }else{
        setNotFound(false)
      }
    }
    setLoading(false);
  }

  async function handleGoogleSignin() {
    setLoading(true);
    await signupWithGoogle();
    setLoading(false);
  }

  return (
    <Box
      position={'relative'}
      height={'100vh'}
      backgroundImage={
        'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
      }
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
    >
      <NavBarPayment/>
      <Container
        display='flex'
        justifyContent='center'
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}></Stack>
        <Stack
          bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Flex justify='space-between' align='center' h='60px'>
            <Heading
              color={'white'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Log in
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
          <Box as={'form'} mt={10}>
            <Stack spacing={4}>
              <FormControl>
                <Input
                  placeholder="Your Email"
                  bg={'gray.100'}
                  border={0}
                  name="email"
                  type="email"
                  id={1}
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
                  placeholder="Your Password"
                  type="password"
                  bg={'gray.100'}
                  border={0}
                  marginTop={'30px'}
                  id={2}
                  autoComplete={'none'}
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
                <Center>{!incomplete && <Text color={"#cd6155"} fontWeight={"600"} >Add your password</Text>} </Center>
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
                  Log in
                </Button>

                <Center>{error && <Text color={"#cd6155"} fontWeight={"600"} >Wrong password</Text>}{notFound && <Text color={"#cd6155"} fontWeight={"600"} >User not found</Text>} </Center>
              </FormControl>
            </Stack>
            <Button
              w={'full'}
              maxW={'md'}
              variant={'outline'}
              backgroundColor={'white'}
              marginTop={'20px'}
              color={'black'}
              _hover={{
                backgroundColor: 'rgb(232, 229, 229)',
              }}
              onClick={handleGoogleSignin}
              leftIcon={<FcGoogle />}
            >
              <Center>
                <Text>Log in with Google</Text>
              </Center>
            </Button>
          </Box>
          <Stack
            direction={{ base: 'flex', sm: 'row' }}
            gap={1}
            justifyContent={'center'}
          >
            <Text color={'white'}>¿First Time in KINEMA? </Text>
            <Link href="/register/start" color={'gray'}>
              Sign up
            </Link>
          </Stack>
          <Stack
            direction={{ base: 'flex', sm: 'row' }}
            align={'start'}
            justify={'space-evenly'}
            color={'gray'}
            _hover={{textDecoration: "block"}}
          >
            <Link href="/recover_password" color={'gray'}>Forgot password?</Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
    
  );
}
