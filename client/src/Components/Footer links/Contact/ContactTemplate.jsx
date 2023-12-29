import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  FormHelperText,
  useMediaQuery
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function ContactTemplate() {
  
  const [isShorterThan480] = useMediaQuery('(max-width: 480px)')
  const [isShorterThan960] = useMediaQuery('(max-width: 960px)')
  const [errors, setErrors] = useState({
    name: "Please fill name.",
    email: "Please fill mail.",
    message: "Please fill message"
    });
    const [input, setInput] = useState({
      name: "",
      email: "",
      message: ""
    });
  
    function validate(input) {
      let errors = {};
      let nameRegex = /^[a-zA-Z-_ ]{3,20}$/;
      let emailRegex = /^([A-Za-z0-9_\-\.]){1,}\@([A-Za-z0-9_\-\.]){1,}\.([A-Za-z]){2,4}$/g;
      if (!input.name) {
        errors.name = "Please fill name."
      }
      else if (!nameRegex.test(input.name)) {
        errors.name = "Name is invalid.";
      }
      if (!input.email) {
        errors.email = "Please fill email.";
      } 
      else if (!emailRegex.test(input.email)) {
        errors.email = "Email is invalid.";
      }
      if (!input.message) {
        errors.message = "You must leave a message"
      }
      
      return errors;
      
    };
  
    function handleChange(e) {
      setInput({
        ...input,
        [e.target.name] : e.target.value
      })
      setErrors(validate({
        ...input,
        [e.target.name] : e.target.value
      }))
  };  
  
  function copyToClipboard(e) {
    this.textArea.select();
    document.execCommand('copy');
    e.target.focus();
  }


  async function sendEmail(e) {
    if (errors.name || errors.email || errors.message) {
      e.preventDefault()
      toast.warn('The form is not properly complete.', {
        position: "top-center",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } else {
      e.preventDefault();
      await axios.post('/email/contact', {
        email: input.email,
        user: input.name,
        message: input.message
      })
      .then(response => {
          toast.success('Message sent successfully.', {
            position: "top-center",
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          })
          setInput({
            name: "",
            email: "",
            message: ""
          })
          setErrors({
            name: "Please fill name.",
            email: "Please fill mail.",
            message: "Please fill message"
          })
      } 
      )
      .catch(error =>  alert(error))
    }
   
  }
  

  return (
    <Container  maxW="full" minH={isShorterThan960 ? "82vh" :  null} mt={isShorterThan480 ? "16px" : null} justifyContent={"center"} alignItems="center"  centerContent overflow="hidden">
      <ToastContainer/>
      <Flex >
        <Box
          
           bg={'rgba(17, 173, 152, 0.3)'}
              backdropFilter={'blur(10px)'}
          color="white"
          minW={isShorterThan480 ? null : "680px"}
          borderRadius="lg"
          m={{ base: 3, sm: 4, md: 16, lg: 24 }}
          p={{ base: 3, sm: 5, md: 5, lg: 16 }}>
          <Box p={4}>
            <Wrap spacing={{ base: 4, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact us :</Heading>
                  
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={5} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="280px"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        justifyContent="left"
                        onClick={() => {
                          navigator.clipboard.writeText('+54-11-2887-7766')
                          toast.info('Copied to clipboard.', {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          })
                        }}
                        leftIcon={<MdPhone color="#1970F1" size="20px"  />}>
                        +54-11-2887-7766
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="280px"
                        variant="ghost"
                        justifyContent="left"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        onClick={() => {
                          navigator.clipboard.writeText('kinema.showcase@gmail.com')
                          toast.info('Copied to clipboard.', {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          })
                        }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        kinema.showcase@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="280px"
                        justifyContent="left"
                        variant="ghost"
                        color="#DCE2FF"
                        _hover={{ border: '2px solid #1C6FEB' }}
                        onClick={() => {
                          navigator.clipboard.writeText('Buenos Aires, Argentina')
                          toast.info('Copied to clipboard.', {
                            position: "top-center",
                            autoClose: 1500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: false,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                          })
                        }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                        Buenos Aires, Argentina
                      </Button>
                    </VStack>
                  </Box>
                  
                </Box> 
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <form onSubmit={sendEmail}>
                      <FormControl >
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                            <Input name="name" value={input.name} onChange={handleChange} type="text" size="md" />
                            
                          </InputGroup>
                          {errors.name && <FormHelperText  color={"red"}>
                             {errors.name}
                          </FormHelperText>}
                      </FormControl>
                      <FormControl >
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input name="email" type="text" value={input.email}  onChange={handleChange} size="md" />
                          </InputGroup>
                          {errors.email && <FormHelperText  color={"red"}>
                             {errors.email}
                          </FormHelperText>}
                      </FormControl>
                      <FormControl >
                        <FormLabel>Message</FormLabel>
                          <Textarea
                            minH="200px"
                            name="message"
                            borderColor="gray.300"
                            _hover={{
                            borderRadius: 'gray.300',
                             }}
                            placeholder="message..."
                            value={input.message}  onChange={handleChange}
                          />
                            {errors.message && <FormHelperText  color={"red"}>
                             {errors.message}
                          </FormHelperText>}
                      </FormControl>
                      <FormControl mt="8px" float="right">
                          <Button
                            type='submit'
                          variant="solid"
                          bg={'blue.400'}
                          rounded={'full'}
                          color={'white'}
                          _hover={{bg: 'blue.500',}}>
                          Send Message
                        </Button>
                        </FormControl>
                        </form>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}