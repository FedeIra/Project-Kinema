import {
  Box,
  Flex,
  HStack,
  Image,
  Button,
  useDisclosure,
  Stack
} from "@chakra-ui/react";
import { BsArrowReturnLeft } from 'react-icons/bs';
import { Link as RouteLink, useNavigate } from "react-router-dom";

import logo from "../../Assets/logo.png";

export default function NavBarPayment({ ruta }) {
  const { isOpen } = useDisclosure();
  const navigate = useNavigate();

  function functionBack() {
    navigate(-1);
  }

  return (
    <>
      <Box  bgGradient='linear(to-b, rgba(0,0,0,0.6839110644257703) 35%, rgba(0,0,0,0) 100%)' px={4} w="100%" >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <RouteLink to="/home">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={logo}
                alt="Logo-kinema"
              />
              </RouteLink>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
          <Button onClick={() => functionBack()} variant='outline' 
                color={'white'}
                h={'30px'}
                w={'80px'}
              _hover={{ bg: 'blue.400' }}
              rightIcon={<BsArrowReturnLeft />}>Back</Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
            
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
