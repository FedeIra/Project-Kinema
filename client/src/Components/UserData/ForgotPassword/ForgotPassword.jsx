import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

  
  export default function ForgotPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const { forgotPasswordFunction } = useAuth()
    const toast = useToast()

    

    async function handleSubmit(e){
        e.preventDefault();
        try {
            await forgotPasswordFunction(email)
            toast({
                description: "Email sent, check your email",
                status: "success",
                duration: 5000,
                isClosable: true
            })
            navigate('/login/start') 
        } catch (error) {
            toast({
                description: "Email not found",
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        backgroundImage={
            'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
        }
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={'rgba(17, 173, 152, 0.3)'}
          backdropFilter={'blur(10px)'}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Forgot your password
            <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                ?
              </Text>
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}>
            You&apos;ll get an email with a reset link
          </Text>
          <FormControl id="email">
            <Input
              value={email}
              name="email"
              placeholder="example@email.com"
              bg={'gray.100'}
              color={'gray.500'}
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bgGradient="linear(to-r, blue.400,cyan.400)"
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              onClick={handleSubmit}
              >
              Request Reset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }