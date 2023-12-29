/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import './Home.css';
import allGenres from './allGenresMovies.json';
import {
  clearMovies,
  getMovies,
  getAllGenres,
  getMovieGenreByID,
  logOutUser,
  loadUserData,
} from "../../Redux/actions";
import DataList from "./DataList/DataList";
import { Box, Center, Flex, Select, Text } from "@chakra-ui/react";
import Error from "../Error/Error";
import "@fontsource/raleway";
import { color } from "../globalStyles";
import { useNavigate } from "react-router-dom";
import { useToast } from '@chakra-ui/react';


export default function HomeMovies() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const movies = useSelector((state) => state.movies);
  const [genero, setGenero] = useState('All');
  const [page, setPage] = useState(1);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const error = useSelector((state) => state.error);
  const [titulo, setTitulo] = useState("Movies");
  const user = useSelector((state) => state.user);
  const toast = useToast();

  useEffect(() => {
    if (genero === 'All' && page !== 1) {
      dispatch(getMovies(page));
    } else if (page !== 1) {
      dispatch(getMovieGenreByID(genero, page));
    }
  }, [page]);

  useEffect(() => {
    dispatch(getAllGenres());
    dispatch(loadUserData(user.uid))
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
    setMoviesToShow([]);
    if (genero === 'All') {
      dispatch(getMovies(page));
    } else {
      dispatch(getMovieGenreByID(genero, page));
    }
    return () => dispatch(clearMovies());
  }, [genero]);

  useEffect(() => {
    setMoviesToShow((prev) => prev.concat(movies));
  }, [movies]);

  function handleGenres(e) {
    e.preventDefault();
    let variable = '';
    for (let i = 0; i < allGenres.length; i++) {
      if (allGenres[i].name === e.target.value) {
        variable = allGenres[i].id;
      }
    }
    setPage(1);
    setGenero(variable);
    if (e.target.value === 'All') {
      setGenero('All');
      setTitulo('Movies');
    } else {
      setTitulo(e.target.value + ' Movies');
    }
  }

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column" bg='#0d0c0c'>
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar ruta={'Movies'} />
        </Flex>

        <Flex as="main" mt={16} w="100%" direction="column">
          <Box>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              mt={10}
              mb={5}
              justify="space-around"
              alignItems="center"
            >
              {genero === 'All' ? (
                <Text
                  fontSize={{ base: '32px', md: '40px', lg: '48px' }}
                  fontWeight="600"
                  color={color.kinemaLogoColor1}
                  fontFamily="Raleway"
                >
                  Movies
                </Text>
              ) : (
                <Text
                  fontSize={{ base: '32px', md: '40px', lg: '48px' }}
                  fontWeight="600"
                  color={color.kinemaLogoColor1}
                  fontFamily="Raleway"
                >
                  {titulo}
                </Text>
              )}

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
                <option className="options" value="All">
                  All
                </option>
                {allGenres.map((g) => {
                  return (
                    <option className="options" value={g.name} key={g.id}>
                      {g.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            {moviesToShow.length ? (
              <DataList
                data={moviesToShow}
                next={setPage}
                hasMore={movies.length > 19 && moviesToShow.length !== 0}
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
