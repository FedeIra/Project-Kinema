import React from 'react';
import {
  Avatar,
  chakra,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

export default function CardOverview ({ name, role, content, avatar }) {
  const icon = require(`./Icons/${avatar}`)
  return (
    <Flex
      boxShadow={'lg'}
      maxW={'640px'}
      direction={{ base: 'column-reverse', md: 'row' }}
      width={'full'}
      rounded={'xl'}
      pt={5}
      pb={5}
      pl={10}
      pr={10}
      justifyContent={'space-between'}
      position={'relative'}
      bg={useColorModeValue('white', 'gray.800')}
      _before={{
        content: '""',
        position: 'absolute',
        zIndex: '-1',
        height: 'full',
        maxW: '640px',
        width: 'full',
        filter: 'blur(40px)',
        transform: 'scale(0.98)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        top: 0,
        left: 0,
      }}>
      <Flex
        direction={'column'}
        textAlign={'left'}
        justifyContent={'space-between'}>
        <chakra.p fontWeight={'bold'} fontSize={{base:"lg", lg:"xl"}}>
          {name}
        </chakra.p>
        <chakra.span
          fontWeight={'medium'}
          color={'gray.500'} >
          {role}
        </chakra.span>
        <chakra.p
          fontWeight={'medium'}
          fontSize="lg"
          >
          {content}
        </chakra.p>
      </Flex>
      <Avatar
        src={icon}
        height={'80px'}
        width={'80px'}
        alignSelf={'center'}
        m={{ base: '0 0 35px 0', md: '0 0 0 50px' }}
      />
    </Flex>
  );
}