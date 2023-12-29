/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import {
  clearTvShows,
  getTvShows,
  getSeriesByGenre,
  logOutUser,
  loadUserData,
} from '../../Redux/actions';
import DataList from './DataList/DataList';
import { Box, Flex, Select, Text, Center } from '@chakra-ui/react';
import Error from '../Error/Error';
import '@fontsource/raleway';
import allGenres from './allGenresTV.json';
import { color } from '../globalStyles';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';


export default function HomeTVShows() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const series = useSelector((state) => state.series);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [seriesToShow, setSeriesToShow] = useState([]);
  // const allGenres = useSelector((state) => state.allgenres);
  const [genre, setGenero] = useState('All');
  const [titulo, setTitulo] = useState('TV Shows');
  const toast = useToast();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (genre === 'All' && page !== 1) {
      dispatch(getTvShows(page));
    } else if (page !== 1) {
      dispatch(getSeriesByGenre(genre, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(loadUserData(user.uid));
  }, []);

  if (user && user.banned) {
    toast({
      title: 'You have been banned.',
      description:
        'For any complaint or further information please contact our crew.',
      status: 'error',
      duration: 5000,
      position: 'top-center',
      isClosable: true,
    });
    dispatch(logOutUser());
    navigate("/home")
  }

  useEffect(() => {
    setSeriesToShow([]);
    if (genre === 'All') {
      dispatch(getTvShows(page));
    } else {
      dispatch(getSeriesByGenre(genre, page));
    }
    return () => {
      dispatch(clearTvShows());
      // dispatch(clearGenres());
    };
  }, [genre]);

  useEffect(() => {
    setSeriesToShow((prev) => prev.concat(series));
  }, [series]);

  function handleGenres(e) {
    e.preventDefault();
    setGenero(e.target.value);
    setPage(1);
    if (e.target.value === 'All') {
      setTitulo('TV Shows');
    } else {
      setTitulo(e.target.value + ' TV Shows');
    }
  }
  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bg='#0d0c0c'>
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={'Series'} />
        </Flex>
        <Flex as="main" mt={16} w="100%" direction="column">
          <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              mt={10}
              mb={5}
              justify="space-around"
              alignItems="center"
              color="white"
            >
              <Text
                fontSize={{ base: '32px', md: '40px', lg: '48px' }}
                fontWeight="600"
                color={color.kinemaLogoColor1}
                fontFamily="Raleway"
              >
                {titulo}
              </Text>
              <Select
                onChange={(e) => handleGenres(e)}
                w="240px"
                h={{ base: '32px', md: '36px', lg: '44px' }}
                fontSize={{ base: '18px', md: '24px', lg: '28px' }}
                textAlign="center"
                fontWeight="500"
                color={color.kinemaLogoColor1}
                defaultValue="Genres"
              >
                <option disabled>Genres</option>
                <option className="options">All</option>
                {allGenres.map((g, i) => (
                  <option name={g} key={i} value={g} className="options">
                    {g}
                  </option>
                ))}
              </Select>
            </Flex>
            {seriesToShow.length ? (
              <DataList
                data={seriesToShow}
                next={setPage}
                hasMore={series.length > 19 && seriesToShow.length !== 0}
              />
            ) : (
              <Center h="90vh">
                <Center w="95%" mb={30} pt={70} pb={70} borderColor="white">
                  <Text fontSize={30} color="white">
                    No results...
                  </Text>
                </Center>
              </Center>
            )}
          </Box>
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
