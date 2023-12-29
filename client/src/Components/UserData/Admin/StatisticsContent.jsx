import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { BsFilm } from 'react-icons/bs';
import { BsFillCollectionPlayFill } from 'react-icons/bs';
import { BsFillCameraVideoFill } from 'react-icons/bs';

export default function Statistics({ movies, tvShows, totalContent }) {
  return (
    <Box maxW="7xl" mx={'auto'} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={'center'}
        fontSize={'4xl'}
        py={10}
        fontWeight={'bold'}
      >
        Kinema Content
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
        >
          <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel color={'blue.600'} fontWeight={'medium'}>
                Movies
              </StatLabel>
              <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {movies}
              </StatNumber>
            </Box>
            <Box
              my={'auto'}
              color={useColorModeValue('gray.800', 'gray.200')}
              alignContent={'center'}
            >
              <BsFilm size={'3em'} />
            </Box>
          </Flex>
        </Stat>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
        >
          <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel color={'yellow.500'} fontWeight={'medium'}>
                TV Shows
              </StatLabel>
              <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {tvShows}
              </StatNumber>
            </Box>
            <Box
              my={'auto'}
              color={useColorModeValue('gray.800', 'gray.200')}
              alignContent={'center'}
            >
              <BsFillCameraVideoFill size={'3em'} />
            </Box>
          </Flex>
        </Stat>
        <Stat
          px={{ base: 2, md: 4 }}
          py={'5'}
          shadow={'xl'}
          border={'1px solid'}
          borderColor={useColorModeValue('gray.800', 'gray.500')}
          rounded={'lg'}
        >
          <Flex justifyContent={'space-between'}>
            <Box pl={{ base: 2, md: 4 }}>
              <StatLabel color={'green.600'} fontWeight={'medium'}>
                Total Content
              </StatLabel>
              <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
                {totalContent}
              </StatNumber>
            </Box>
            <Box
              my={'auto'}
              color={useColorModeValue('gray.800', 'gray.200')}
              alignContent={'center'}
            >
              <BsFillCollectionPlayFill size={'3em'} />
            </Box>
          </Flex>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}
