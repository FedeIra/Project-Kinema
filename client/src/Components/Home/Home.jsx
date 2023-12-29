/* eslint-disable */
import React, { useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from './Chakra UI Components/Footer';
import MainMovieMenu from './Chakra UI Components/MainMovieMenu';
import CarouselHome from '../Carrousel/Chackra UI Components/CarouselHome';
import CarouselWatchList from '../Carrousel/Chackra UI Components/CarouselWatchList';
import CarouselRented from '../Carrousel/Chackra UI Components/CarouselRented';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeAll, loadUserData, logOutUser } from '../../Redux/actions';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import Loader from '../Loader/LoaderCarrusels';
import Error from '../Error/Error.jsx';
import { useAuth } from '../AuthContext/AuthContext';
import '@fontsource/raleway';
import { ERROR_CLEAN } from '../../Redux/actions/const';
import { useToast } from '@chakra-ui/react';
import { color } from '../globalStyles';

export default function Home() {
  const { loadingUser } = useAuth();
  const dispatch = useDispatch();
  const { carrousels_home, loading } = useSelector((state) => state);
  const error = useSelector((state) => state.error);
  const userData = useSelector((state) => state.user);
  const toast = useToast();

  let now = new Date();
  const validMovies = userData.rented?.filter(
      (m) => m.expirationDate > now.getTime()
  )

  useEffect(() => {
    dispatch(loadUserData(userData.uid));
    dispatch({ type: ERROR_CLEAN });
    if (!carrousels_home.allCarruselsMovies) dispatch(getHomeAll());
  }, []);

  if (userData && userData.banned) {
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
    navigate('/home');
  }

  if (!loading) {
    var movieCarrousel = carrousels_home.allCarruselsMovies;
    var SeriesCarrousel = carrousels_home.allCarruselsSeries;
    if (movieCarrousel) {
      var topTrendingMovie = movieCarrousel.trending[0];
    }
  }

  if (loadingUser) return null;

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction='column' bg='#0d0c0c'>
        <Flex as='header' position='fixed' w='100%' zIndex={200}>
          <NavBar ruta={'Home'} />
        </Flex>
        <Flex as='main' w='100%' direction='column'>
          {loading || !carrousels_home.allCarruselsMovies ? (
            <Loader />
          ) : (
            <Box>
              <MainMovieMenu
                title={topTrendingMovie.title}
                id={topTrendingMovie.id}
                poster={topTrendingMovie.back_poster}
              />
              <Container maxW='container.xl' mt={10} />
              {userData.subscription === 2 && userData.watchList.length > 0 ? (
                <CarouselWatchList
                  title='Watchlist'
                  movies={userData.watchList}
                />
              ) : null}
              {userData.subscription === 1 && userData.rented.length > 0 ? (
                <CarouselRented title='Rented' movies={validMovies} />
              ) : null}
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Trending
              </Text>
              <CarouselHome
                movies={movieCarrousel.trending}
                title='Trending:'
              />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                On Theaters
              </Text>
              <CarouselHome
                movies={movieCarrousel.on_theaters}
                title='On Theaters:'
              />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Popular
              </Text>
              <CarouselHome movies={movieCarrousel.populars} title='Popular:' />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Top rated Movies
              </Text>
              <CarouselHome
                movies={movieCarrousel.topRated}
                title='Top rated Movies:'
              />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Up Coming
              </Text>
              <CarouselHome
                movies={movieCarrousel.upComing}
                title='Up Coming:'
              />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Top rated Series
              </Text>
              <CarouselHome
                movies={SeriesCarrousel.topRatedSeries}
                title='Top rated Series:'
              />
              <Text
                fontWeight={'bold'}
                color={color.kinemaLogoColor1}
                fontSize={{ base: '1xl', md: '2xl' }}
                mb={0}
                ml={4}
              >
                Latest Series
              </Text>
              <CarouselHome
                movies={SeriesCarrousel.latestSeries}
                title='Latest Series:'
              />
            </Box>
          )}
          <Footer />
        </Flex>
      </Flex>
    );
  }
}
