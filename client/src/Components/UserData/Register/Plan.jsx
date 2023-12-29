import React, { useEffect, useState } from 'react';
import { Box, Stack, Text, Container, SimpleGrid } from '@chakra-ui/react';
import Pricing from './Pricing';
import Footer from '../../Home/Chakra UI Components/Footer';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';

export default function Plan() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    window.addEventListener('scroll', () => {
      setScroll(window.scrollY > 0);
    });
  }, []);

  return (
    <div>
      <Box
        position={'relative'}
        minHeight={'100vh'}
        backgroundColor={'#1D1D1D'}
        backgroundImage={
          'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
        }
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
      >
        <NavBarPayment/>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          display='flex'
          flexDirection= {{base: 'column', sm: 'row'}}
          alignItems={'center'}
          justifyContent='center'
        >
          <Text
            fontSize={'4vh'}
            fontWeight='600'
            display='inline'
            color={'white'}
          >
            Select your plan:
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }}>
            <Pricing
              planType={'Basic'}
              price={0}
              firstFeature={'Rent Movies and TV Shows'}
            />
            <Pricing
              planType={'Premium'}
              price={7.99}
              firstFeature={'Watch any Movie and TV Show'}
              secondFeature={'Create your own Watchlist'}
              thirdFeature={'All features'}
            />
          </Stack>
        </Container>
      </Box>
      <Footer />
    </div>
  );
}
