import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react';

import {Link as RouteLink} from "react-router-dom"
import { color } from '../../globalStyles';
import logo from "../../../Assets/logo.png"

const ListHeader = (props) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2} ml={1}>
      {props.children}
    </Text>
  );
};

const NavLink = (props) => (
  <Text
      px={2}
      py={1}
      rounded={'md'}
      fontWeight='300'
      color={color.textLinkUnselected}
      _hover={{
        textDecoration: 'none',
        color: color.textLinkSelected,
      }}
    >
      {props.name}
  </Text>
);

export default function Footer() {
  return (
    <Box
      bg={color.kinemaBg}
      color={color.textColor}>
      <Container as={Stack} maxW={'6xl'} py={5}>
        <SimpleGrid
          templateColumns={{ sm: '1fr', md: '2fr 1fr 1fr' }}
          spacing={8}>
          <Flex spacing={5} direction='column' justify='flex-start'>
            <Flex direction='row' alignItems='flex-start'>
              <Flex h={50} justify='center' align='center'>
                <Image boxSize='80px'
                objectFit='fill'
                src={logo} 
                alt='Logo-kinema'
                position='relative'
                top={-2.5}/>
              </Flex>
              <ListHeader children={'KINEMA Showcase'} mt={10}></ListHeader>
            </Flex>
            <Text fontSize={12}>
              © 2022 Kinema showcase. All rights reserved
            </Text>
          </Flex>
          <Stack align={'flex-start'}>
            <ListHeader children={'Product'}></ListHeader>
            <RouteLink to='/overview'><NavLink name='Overview'/></RouteLink>
            <RouteLink to='/register/plan'><NavLink name='Pricing'/></RouteLink>
          </Stack>
          <Stack align={'flex-start'}>
            <ListHeader children={'Company'}></ListHeader>
            <RouteLink to='/about_us'><NavLink name='About us'/></RouteLink>
            <RouteLink to='/contact'><NavLink name='Contact'/></RouteLink>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}