import React, { useRef } from 'react';
import styles from './LandingPage.module.css';
import logo from '../../Assets/logo.png';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getHomeAll } from '../../Redux/actions';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Divider,
  Center,
} from '@chakra-ui/react';
import phone from '../../Assets/phone.jpg';
import tablet from '../../Assets/tablet.png';
import computer from '../../Assets/computer.png';
import Pricing from '../UserData/Register/Pricing.jsx';
import Footer from '../Home/Chakra UI Components/Footer';
import { color } from '../globalStyles';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getHomeAll());
    if (user) {
      navigate('/home');
    }
  }, [dispatch]);

  let refMenuBtn = useRef();
  let list = useRef();
  let refCloseBtn = useRef();

  const handleToggleMenu = (e) => {
    if (refMenuBtn.current.id === '5') {
      refMenuBtn.current.id = refCloseBtn.current.id;
      list.current.style.display = 'flex';
    } else {
      refMenuBtn.current.id = '5';
      list.current.style.display = 'none';
    }
  };

  return (
    <Box className={styles.background}>
      <Flex className={styles.nav}>
        <Image
          boxSize={{ base: '120px', sm: '150px' }}
          className={styles.logo}
          src={logo}
          alt="logo"
        />
        <Box className={styles.list} ref={list}>
          <Text marginBottom={'20px'} className={styles.sign}>
            <Link to={'/register/start'}>Register </Link>
          </Text>
          <Text className={styles.sign}>
            <Link to={'/login/start'}>Log In </Link>
          </Text>

          <Box className={styles.nav__close}>
            <Text
              className={styles.close}
              ref={refCloseBtn}
              id={'6'}
              onClick={handleToggleMenu}
            >
              Close
            </Text>
          </Box>
        </Box>
        <Box className={styles.nav__toggle}>
          <Text
            className={styles.menu}
            ref={refMenuBtn}
            id={'5'}
            onClick={handleToggleMenu}
          >
            Menu
          </Text>
        </Box>
      </Flex>
      <Box className={styles.movies}>
        <Box className={styles.top_blur}></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list2}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list3}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list4}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list5}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list6}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list7}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list8}
        ></Box>
        <Box
          borderWidth="2px"
          borderStyle="solid"
          borderColor="black"
          className={styles.movie_list_collage}
        ></Box>
        <Box className={styles.bottom_blur}> </Box>
      </Box>

      <Box className={styles.container_landing}>
        <Box className={styles.container_white}>
          <Flex direction={{ base: 'column', sm: 'row' }}>
            <Text
              className={styles.main_text}
              fontSize={{ base: '1.6rem', md: '2.5rem', lg: '3.4rem' }}
              fontWeight="600"
              mr="16px"
            >
              All Movies and TV Shows
            </Text>
            <Text
              className={styles.main_text}
              color={color.kinemaLogoColor1}
              fontSize={{ base: '1.6rem', md: '2.5rem', lg: '3.4rem' }}
              fontWeight="600"
            >
              one click ahead!
            </Text>
          </Flex>
          <br />
          <Text
            fontSize={{ base: '1rem', md: '1.7rem', lg: '2.1rem' }}
            style={{
              textAlign: 'center',
              color: 'white',
            }}
          >
            Sit, relax and enjoy.
          </Text>
          <Box className={styles.container_button}>
            <Link to="/home">
              <Button
                bg={{ base: color.kinemaLogoColor1, sm: 'transparent' }}
                opacity={{ base: '.9', sm: '0.8' }}
                rounded={'full'}
                color={{ base: 'black', sm: 'white' }}
                width={{ base: '6rem', md: '10rem', lg: '12rem' }}
                fontSize={{ base: '16px', md: '1rem', lg: '1.2rem' }}
                padding={{ base: '10px', md: '15px', lg: '20px' }}
                border="4px"
                borderColor={color.kinemaLogoColor1}
                _hover={{
                  bg: color.kinemaLogoColor1,
                  backgroundImage: `${logo}`,
                }}
              >
                Explore!
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
      {/* RESPONSIVE: */}
      <Divider
        style={{
          width: '100%',
          height: '2px',
          backgroundColor: 'gray',
          marginTop: '5rem',
        }}
      />
      <Box
        color={'white'}
        style={{
          marginLeft: '1rem',
          marginRight: '1rem',
        }}
      >
        <Text
          textAlign="center"
          marginTop="1rem"
          display="flex"
          justifyContent="center"
          fontSize={{ base: '1rem', md: '1.5rem', lg: '2.1rem' }}
        >
          Kinema is a responsive web. You can use it on your desktop/laptop,
          tablet or mobile phone.
        </Text>
        <Center>
          <Box
            display="flex"
            flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
            justifyContent="center"
            alignItems="center"
            margin="1rem"
            ml={{ base: '1rem', md: '7rem', lg: '25rem' }}
          >
            <Box display="flex" justifyContent="center">
              <Image
                src={phone}
                width={{ base: '30%', md: '90%', lg: '70%' }}
                height="auto"
                alt="phone"
              />
            </Box>
            <Divider
              orientation={{
                base: 'horizontal',
                md: 'vertical',
                lg: 'vertical',
              }}
              height={{ base: '0.1rem', md: '8rem', lg: '20rem' }}
              width={{ base: '100%', md: '20px', lg: '10px' }}
              backgroundColor="white"
              margin={{
                base: '3rem',
                md: '1rem',
                lg: '1rem',
              }}
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={computer}
                width={{ base: '100%', md: '90%', lg: '70%' }}
                height="auto"
                alt="computer"
              />
            </Box>
            <Divider
              orientation={{
                base: 'horizontal',
                md: 'vertical',
                lg: 'vertical',
              }}
              height={{ base: '0.1rem', md: '8rem', lg: '20rem' }}
              width={{ base: '100%', md: '20px', lg: '10px' }}
              backgroundColor="white"
              /* margin responsive: */
              margin={{
                base: '3rem',
                md: '1rem',
                lg: '1rem',
              }}
            />
            <Box display="flex" justifyContent="center" alignItems="center">
              <Image
                src={tablet}
                width={{ base: '50%', md: '45%', lg: '30%' }}
                height="auto"
                alt="tablet"
                ml={{ base: '0px', lg: '100px', '2xl': '0px' }}
                mr={{ base: '0rem', md: '5rem', lg: '25rem' }}
              />
            </Box>
          </Box>
        </Center>
        <Divider
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'gray',
            marginTop: '1rem',
          }}
        />
        <Text
          textAlign="center"
          marginTop="1rem"
          display="flex"
          justifyContent="center"
          fontSize={{ base: '1rem', md: '1.5rem', lg: '2.1rem' }}
        >
          Choose the plan that suits you best!
        </Text>
        <Box marginBottom="1rem">
          {/* PRICING: */}
          <Flex
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Box
              color={'white'}
              flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box width={{ base: '100%', md: '50%', lg: '40%' }}>
                <Link to={'/register/start'}>
                  <Pricing
                    planType={'Premium'}
                    price={7.99}
                    firstFeature={'Watch any Movie and TV Show'}
                    secondFeature={'Create your own Watchlist'}
                    thirdFeature={'All features'}
                  />
                </Link>
              </Box>
              <Divider
                orientation="vertical"
                height={{ base: '0rem', md: '34rem', lg: '34rem' }}
                margin={{ base: '0rem', md: '1rem', lg: '3rem' }}
                style={{
                  width: '2px',
                  backgroundColor: 'gray',
                }}
              />
              <Box width={{ base: '100%', md: '50%', lg: '40%' }}>
                <Link to={'/register/start'}>
                  <Pricing
                    planType={'Basic'}
                    price={0}
                    firstFeature={'Rent Movies and TV Shows'}
                  />
                </Link>
              </Box>
            </Box>
          </Flex>
        </Box>
        <Divider
          style={{
            width: '100%',
            height: '2px',
            backgroundColor: 'gray',
            marginTop: '1rem',
          }}
        />
        <Footer />
      </Box>
    </Box>
  );
}
