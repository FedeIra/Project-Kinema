/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  clearMovieDetail,
  getCommentsData,
  getMovieDetail,
  postNewComment,
  addToWatchlist,
  isLike,
  dislike,
  putLike,
  getLikesFromContent,
  loadUserData,
  logOutUser,
} from '../../../Redux/actions';
import {
  Box,
  Flex,
  Heading,
  Text,
  Container,
  Button,
  Center,
  Textarea,
  Divider,
  Link,
  Image,
  VStack,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { MdPlayArrow } from 'react-icons/md';
import { FiPlusCircle } from 'react-icons/fi';
import { BsCreditCard } from 'react-icons/bs';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import Footer from '../../Home/Chakra UI Components/Footer.jsx';
import NavBar from '../../NavBar/NavBar.jsx';
import { useState } from 'react';
import './MovieDetail.css';
import NavBarPlayer from '../../NavBarPlayer/NavBarPlayer';
import Comment from '../Comment/Comment';
import Error from '../../Error/Error.jsx';
import { color } from '../../globalStyles';
import { useToast, useMediaQuery } from '@chakra-ui/react';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import loader from '../../../Assets/loader.gif';

export default function MovieDetail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id } = useParams();
  const [playTrailer, setPlayerTrailer] = useState(false);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);
  const myMovie = useSelector((state) => state.movieDetail);
  const comments = useSelector((state) => state.comments);
  const like = useSelector((state) => state.isLike);
  const totalLikes = useSelector((state) => state.totalLikes);
  const [likeLocal, setLikeLocal] = useState(undefined);
  const [likesLocal, setLikesLocal] = useState(undefined);
  const [commentsLocal, setCommentsLocal] = useState([]);
  const [commentArea, setCommentArea] = useState('');
  const [errorCommentArea, setErrorCommentArea] = useState(false);
  const toast = useToast();
  const [isShortThan960px] = useMediaQuery('(max-width: 960px)');
  const [isShortThan400px] = useMediaQuery('(max-width: 400px)');

  useEffect(() => {
    dispatch(clearMovieDetail());
    dispatch(getMovieDetail(id));
    dispatch(isLike(user.uid, id));
    dispatch(getLikesFromContent(id));
    dispatch(loadUserData(user.uid));
    dispatch(getCommentsData(id));
  }, [dispatch]);

  if (user && user.banned) {
    toast({
      title: 'You have been banned.',
      description:
        'For any complaint or further information please contact our crew.',
      status: 'error',
      duration: 3000,
      position: 'top-center',
      isClosable: true,
    });
    dispatch(logOutUser());
    navigate('/home');
  }

  useEffect(() => {
    setCommentsLocal(comments);
  }, [comments]);

  useEffect(() => {
    setLikesLocal(totalLikes);
  }, [totalLikes]);

  const handleDislike = (e) => {
    e.preventDefault();
    dispatch(dislike(user.uid, id));
    setLikeLocal(false);
    setLikesLocal((prev) => prev - 1);
  };

  const handleLike = (e) => {
    e.preventDefault();
    dispatch(putLike(user.uid, id));
    setLikeLocal(true);
    setLikesLocal((prev) => prev + 1);
  };

  const handleTextArea = (e) => {
    e.preventDefault();
    setCommentArea(e.target.value);
    setErrorCommentArea(validate(e.target.value));
  };

  const handleAddToWatchlist = (id) => {
    if (user.watchList.find((e) => e.id === id)) {
      toast({
        title: 'This movie is already in your watchlist.',
        status: 'info',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
    } else {
      dispatch(addToWatchlist(myMovie, user));
      toast({
        title: 'Added to watchlist',
        description: 'You can see it in your profile and home.',
        status: 'success',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentArea) {
      setErrorCommentArea(true);
    } else {
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;
      dispatch(postNewComment(user.uid, commentArea, currentDate, myMovie.id));
      setCommentsLocal((prev) =>
        prev.concat({
          _id: Math.random(),
          userId: user.uid,
          content: commentArea,
          date: currentDate,
          idReference: myMovie.id,
          avatar: user.avatar,
          username: user.username,
        })
      );
      setCommentArea("")
    }
  };

  const validate = (str) => {
    if (str.length < 5) {
      return true;
    } else return false;
  };

  const validExpirationDate = () => {
    const { rented } = user;
    if (!rented.length) return false;
    const movieRentHistory = rented.filter((m) => m.id == id);
    let now = new Date();
    if (!movieRentHistory.length) return false;
    const validMovie = movieRentHistory.find(
      (m) => m.expirationDate > now.getTime()
    );
    if (!validMovie) return false;
    return validMovie.expirationDate;
  };

  const closePlayer = () => setPlayerTrailer(false);

  const renderTrailer = () => {
    const idTrailer = myMovie.trailer.slice(32);
    return (
      <>
        <NavBarPlayer closePlayer={closePlayer} />
        <iframe
          height={'100%'}
          width={'100%'}
          src={`//www.youtube.com/embed/${idTrailer}?autoplay=1`}
          frameborder="0"
          allowFullScreen
          className="youtube"
          auto
          title="trailer"
        ></iframe>
      </>
    );
  };

  const renderPage = () => {
    return (
      <Flex direction="column">
        <Flex as="header" position="fixed" w="100%" zIndex={200}>
          <NavBar />
        </Flex>
        {myMovie.title ? (
          <Box>
            {isShortThan960px ? (
              <Box /* ml="10vw" */ mt={16}>
                <Flex
                  h="30vh"
                  backgroundImage={
                    myMovie.back_poster.includes('https://image.tmdb.org')
                      ? myMovie.back_poster
                      : 'https://image.tmdb.org/t/p/original/' +
                        myMovie.back_poster
                  }
                  backgroundSize={'cover'}
                  backgroundPosition={'center center'}
                  boxShadow="5vw 0px 128px 64px black inset"
                  flexDirection="column"
                  justifyContent="flex-end"
                >
                  <VStack
                    alignItems="flex-start"
                    bgGradient="linear(to-t, rgba(0,0,0,1) 33%, rgba(0,0,0,0.9051995798319328) 57%, rgba(0,0,0,0.6587009803921569) 82%, rgba(0,0,0,0.4822303921568627) 90%, rgba(0,0,0,0) 100%);"
                  >
                    <Text
                      fontSize="2vh"
                      textAlign="left"
                      color="white"
                      maxW="80vh"
                      fontWeight="bold"
                      noOfLines={4}
                      ml="10vw"
                    >
                      {myMovie.genres?.map((genre) => (
                        <Button
                          key={genre.id}
                          size="xs"
                          variant="outline"
                          mr="1vh"
                          mb="1vh"
                          pointerEvents="none"
                        >
                          {genre}
                        </Button>
                      ))}
                    </Text>
                    <Box>
                      <Heading
                        mb="1.5vh"
                        textAlign="left"
                        noOfLines={2}
                        color="white"
                        fontWeight="bold"
                        ml="10vw"
                        fontSize="8vw"
                      >
                        {myMovie.title}
                      </Heading>
                    </Box>
                  </VStack>
                </Flex>

                <Text
                  fontSize="1.5vh"
                  textAlign="left"
                  color="white"
                  fontWeight="bold"
                  display="inline"
                  ml="10vw"
                >
                  Duration:{' '}
                </Text>
                <Text
                  fontSize="1.5vh"
                  textAlign="left"
                  color="white"
                  display="inline"
                >
                  {myMovie.duration}
                </Text>
                <br />
                <Text
                  fontSize="1.5vh"
                  textAlign="left"
                  color="white"
                  fontWeight="bold"
                  display="inline"
                  mr={3}
                  ml="10vw"
                >
                  Rating:{' '}
                </Text>

                <StarRatings
                  rating={Math.floor(myMovie.rating / 2)}
                  starRatedColor="gold"
                  starHoverColor="gold"
                  starDimension={'1.5vh'}
                  starSpacing={'0.5vh'}
                  numberOfStars={5}
                  name="rating"
                />

                <Text
                  ml={3}
                  fontSize="1.5vh"
                  textAlign="left"
                  color="white"
                  display="inline"
                >
                  {`  (${Math.round(myMovie.rating * 10) / 10 / 2}/5)`} ||
                  <Text
                    fontSize="1.5vh"
                    textAlign="left"
                    color="white"
                    fontWeight="bold"
                    display="inline"
                  >
                    {' '}
                    User reviews:{' '}
                  </Text>
                  {myMovie.user_reviews
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
                <br />

                <Divider w="80vw" mt={1} ml="10vw"></Divider>
                <Box mr="10vw" ml="10vw">
                  <br />

                  <Text
                    fontSize="2vh"
                    color="white"
                    maxW={'80vh'}
                    textAlign="justify"
                  >
                    {myMovie.description}
                  </Text>
                  {
                    // USER PREMIUM CASE:
                    user.subscription === 2 ? (
                      <Box textAlign="left" mt="3vh">
                        <Flex alignItems="center">
                          <Button
                            onClick={() => setPlayerTrailer(true)}
                            borderRadius="3vh"
                            rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                            bg={'blue.400'}
                            rounded={'full'}
                            color={'white'}
                            mr="2vh"
                            _hover={{ bg: 'blue.500' }}
                            fontSize={isShortThan400px ? '12px' : '17px'}
                          >
                            <Text mb="0.25vh">Watch</Text>
                          </Button>
                          <Button
                            onClick={() => handleAddToWatchlist(myMovie.id)}
                            bg={'whiteAlpha.300'}
                            rightIcon={<Icon as={FiPlusCircle} boxSize={6} />}
                            rounded={'full'}
                            color={'white'}
                            mr="2vh"
                            _hover={{ bg: 'whiteAlpha.500' }}
                            fontSize={isShortThan400px ? '12px' : '17px'}
                          >
                            My List
                          </Button>
                          {(likeLocal === undefined && like) || likeLocal ? (
                            <Button
                              onClick={handleDislike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiFillHeart}
                                  color="#72EFDD"
                                  boxSize={6}
                                />
                              }
                              fontSize={isShortThan400px ? '12px' : '17px'}
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          ) : (
                            <Button
                              onClick={handleLike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiOutlineHeart}
                                  color={'whiteAlpha.300'}
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                              fontSize={isShortThan400px ? '12px' : '17px'}
                            >
                              Like
                            </Button>
                          )}
                          <Text
                            color="white"
                            ml="1vh"
                            fontSize="2vw"
                            display="flex"
                          >
                            <Text color="#72EFDD" fontWeight={600}>
                              {likesLocal}&nbsp;
                            </Text>
                            {likesLocal === 1 ? ' like' : ' likes'}
                          </Text>
                        </Flex>
                      </Box>
                    ) : null
                  }
                  {
                    // USER FREE CASE
                    user.subscription === 1 ? (
                      <Box textAlign="left" mt="3vh">
                        <Flex alignItems="center">
                          {validExpirationDate() ? (
                            <Button
                              onClick={() => setPlayerTrailer(true)}
                              borderRadius="3vh"
                              rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                              bg={'blue.400'}
                              rounded={'full'}
                              color={'white'}
                              mr="2vh"
                              _hover={{ bg: 'blue.500' }}
                              fontSize={isShortThan400px ? '12px' : '17px'}
                            >
                              <Text mb="0.25vh">Watch</Text>
                            </Button>
                          ) : (
                            <Button
                              bg={'blue.400'}
                              onClick={() =>
                                navigate(`/payment/rent/movie/${myMovie.id}`)
                              }
                              rightIcon={<Icon as={BsCreditCard} boxSize={6} />}
                              rounded={'full'}
                              color={'white'}
                              mr="2vh"
                              _hover={{ bg: 'blue.500' }}
                              fontSize={isShortThan400px ? '12px' : '17px'}
                            >
                              <Text mb="0.25vh">Rent</Text>
                            </Button>
                          )}
                          <Button
                            onClick={() => {
                              toast({
                                title: `Upgrade your account to add to your list.`,
                                status: 'info',
                                position: 'top-right',
                                isClosable: true,
                                duration: 3000,
                              });
                            }}
                            bg={'whiteAlpha.300'}
                            rounded={'full'}
                            color={'white'}
                            rightIcon={<Icon as={FiPlusCircle} boxSize={6} />}
                            _hover={{ bg: 'whiteAlpha.500' }}
                            mr="2vh"
                            fontSize={isShortThan400px ? '12px' : '17px'}
                          >
                            My List
                          </Button>
                          {(likeLocal === undefined && like) || likeLocal ? (
                            <Button
                              onClick={handleDislike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiFillHeart}
                                  color="#72EFDD"
                                  boxSize={6}
                                />
                              }
                              fontSize={isShortThan400px ? '12px' : '17px'}
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          ) : (
                            <Button
                              fontSize={isShortThan400px ? '12px' : '17px'}
                              onClick={handleLike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiOutlineHeart}
                                  color={'whiteAlpha.300'}
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          )}
                          <Text
                            color="white"
                            ml="1vh"
                            fontSize="2vw"
                            display="flex"
                          >
                            <Text color="#72EFDD" fontWeight={600}>
                              {likesLocal}&nbsp;
                            </Text>
                            {likesLocal === 1 ? ' like.' : ' likes.'}
                          </Text>
                        </Flex>
                        {validExpirationDate() ? (
                          <Text mt="2vh" color={'white'}>
                            You have until{' '}
                            {moment(validExpirationDate()).format(
                              'MMMM Do YYYY, h:mm a'
                            )}{' '}
                            to watch this content.
                          </Text>
                        ) : null}
                        <Text mt="2vh" fontSize="2.5vw" color={'white'}>
                          You can&nbsp;
                          <Link href="/payment/upgrade" color={'#72efdd'}>
                            <b>upgrade</b>
                          </Link>
                          &nbsp;your plan to watch any content.
                        </Text>
                      </Box>
                    ) : null
                  }
                  {
                    // USER GUEST CASE:
                    user.subscription == null ? (
                      <Box textAlign="left" mt="3vh">
                        <Text fontSize="2vh" color={'white'}>
                          <Link href="/login" color={'#72efdd'}>
                            <b>Log In</b>
                          </Link>
                          &nbsp;or&nbsp;
                          <Link href="/register" color={'#64dfdf'}>
                            <b>Register</b>
                          </Link>
                          &nbsp;to watch this movie.
                        </Text>
                      </Box>
                    ) : null
                  }
                  <br />
                </Box>
              </Box>
            ) : (
              <Flex
                as="main"
                mt={16}
                w={'full'}
                h={'85vh'}
                backgroundImage={
                  myMovie.back_poster.includes('https://image.tmdb.org')
                    ? myMovie.back_poster
                    : 'https://image.tmdb.org/t/p/original/' +
                      myMovie.back_poster
                }
                backgroundSize={'cover'}
                backgroundPosition={'center center'}
                justify="left"
                boxShadow="40vw 0px 128px 64px black inset"
              >
                <Container maxW="900px" ms="none" ml="10vw" mt="10vh">
                  <Heading
                    mb="1.5vh"
                    size="xl"
                    textAlign="left"
                    noOfLines={2}
                    color="white"
                    fontWeight="bold"
                    fontSize="3vw"
                  >
                    {myMovie.title}
                  </Heading>
                  <Box>
                    <Text
                      fontSize="2vh"
                      textAlign="left"
                      color="white"
                      fontWeight="bold"
                      display="inline"
                    >
                      Rating:{' '}
                    </Text>
                    <StarRatings
                      rating={Math.floor(myMovie.rating / 2)}
                      starRatedColor="gold"
                      starHoverColor="gold"
                      starDimension={'2vh'}
                      starSpacing={'0.5vh'}
                      numberOfStars={5}
                      name="rating"
                    />
                    <Text
                      fontSize="2vh"
                      textAlign="left"
                      color="white"
                      display="inline"
                    >
                      {`  (${Math.round(myMovie.rating * 10) / 10 / 2}/5)`} ||
                      <Text
                        fontSize="2vh"
                        textAlign="left"
                        color="white"
                        fontWeight="bold"
                        display="inline"
                      >
                        {' '}
                        User reviews:{' '}
                      </Text>
                      {myMovie.user_reviews
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </Box>
                  <br />
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    fontWeight="bold"
                    display="inline"
                  >
                    Released:{' '}
                  </Text>
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    display="inline"
                  >
                    {myMovie.release_date}
                  </Text>
                  <br />
                  <br />
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    maxW="80vh"
                    fontWeight="bold"
                    noOfLines={4}
                  >
                    Genres:{' '}
                    {myMovie.genres?.map((genre) => (
                      <Button
                        key={genre.id}
                        size="sm"
                        variant="outline"
                        mr="1vh"
                        mb="1vh"
                        pointerEvents="none"
                      >
                        {genre}
                      </Button>
                    ))}
                  </Text>
                  <br />
                  <Text
                    fontSize="2vh"
                    color="white"
                    maxW={'80vh'}
                    textAlign="justify"
                  >
                    {myMovie.description}
                  </Text>
                  <br />
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    fontWeight="bold"
                    display="inline"
                  >
                    Duration:{' '}
                  </Text>
                  <Text
                    fontSize="2vh"
                    textAlign="left"
                    color="white"
                    display="inline"
                  >
                    {myMovie.duration}
                  </Text>
                  {
                    // USER PREMIUM CASE:
                    user.subscription === 2 ? (
                      <Box textAlign="left" mt="3vh">
                        <Flex alignItems="center">
                          <Button
                            onClick={() => setPlayerTrailer(true)}
                            borderRadius="3vh"
                            rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                            bg={'blue.400'}
                            rounded={'full'}
                            color={'white'}
                            mr="2vh"
                            _hover={{ bg: 'blue.500' }}
                          >
                            <Text mb="0.25vh">Watch</Text>
                          </Button>
                          <Button
                            onClick={() => handleAddToWatchlist(myMovie.id)}
                            bg={'whiteAlpha.300'}
                            rightIcon={<Icon as={FiPlusCircle} boxSize={6} />}
                            rounded={'full'}
                            color={'white'}
                            mr="2vh"
                            _hover={{ bg: 'whiteAlpha.500' }}
                          >
                            My List
                          </Button>
                          {(likeLocal === undefined && like) || likeLocal ? (
                            <Button
                              onClick={handleDislike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiFillHeart}
                                  color="#72EFDD"
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          ) : (
                            <Button
                              onClick={handleLike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiOutlineHeart}
                                  color={'whiteAlpha.300'}
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          )}
                          <Text
                            color="white"
                            ml="1vh"
                            fontSize={15}
                            display="flex"
                          >
                            <Text color="#72EFDD" fontWeight={600}>
                              {likesLocal}&nbsp;
                            </Text>
                            {likesLocal === 1 ? ' like.' : ' likes.'}
                          </Text>
                        </Flex>
                      </Box>
                    ) : null
                  }
                  {
                    // USER FREE CASE
                    user.subscription === 1 ? (
                      <Box textAlign="left" mt="3vh">
                        <Flex alignItems="center">
                          {validExpirationDate() ? (
                            <Button
                              onClick={() => setPlayerTrailer(true)}
                              borderRadius="3vh"
                              rightIcon={<Icon as={MdPlayArrow} boxSize={6} />}
                              bg={'blue.400'}
                              rounded={'full'}
                              color={'white'}
                              mr="2vh"
                              _hover={{ bg: 'blue.500' }}
                            >
                              <Text mb="0.25vh">Watch</Text>
                            </Button>
                          ) : (
                            <Button
                              bg={'blue.400'}
                              onClick={() =>
                                navigate(`/payment/rent/movie/${myMovie.id}`)
                              }
                              rightIcon={<Icon as={BsCreditCard} boxSize={6} />}
                              rounded={'full'}
                              color={'white'}
                              mr="2vh"
                              _hover={{ bg: 'blue.500' }}
                            >
                              <Text mb="0.25vh">Rent</Text>
                            </Button>
                          )}
                          <Button
                            onClick={() => {
                              toast({
                                title: `Upgrade your account to add to your list.`,
                                status: 'info',
                                position: 'top-right',
                                isClosable: true,
                                duration: 3000,
                              });
                            }}
                            bg={'whiteAlpha.300'}
                            rounded={'full'}
                            color={'white'}
                            rightIcon={<Icon as={FiPlusCircle} boxSize={6} />}
                            _hover={{ bg: 'whiteAlpha.500' }}
                            mr="2vh"
                          >
                            My List
                          </Button>
                          {(likeLocal === undefined && like) || likeLocal ? (
                            <Button
                              onClick={handleDislike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiFillHeart}
                                  color="#72EFDD"
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          ) : (
                            <Button
                              onClick={handleLike}
                              backgroundColor="whiteAlpha.300"
                              rounded={'full'}
                              color="white"
                              rightIcon={
                                <Icon
                                  as={AiOutlineHeart}
                                  color={'whiteAlpha.300'}
                                  boxSize={6}
                                />
                              }
                              _hover={{ bg: 'whiteAlpha.500' }}
                            >
                              Like
                            </Button>
                          )}
                          <Text
                            color="white"
                            ml="1vh"
                            fontSize={15}
                            display="flex"
                          >
                            <Text color="#72EFDD" fontWeight={600}>
                              {likesLocal}&nbsp;
                            </Text>
                            {likesLocal === 1 ? ' like.' : ' likes.'}
                          </Text>
                        </Flex>
                        {validExpirationDate() ? (
                          <Text mt="2vh" color={'white'}>
                            You have until{' '}
                            {moment(validExpirationDate()).format(
                              'MMMM Do YYYY, h:mm a'
                            )}{' '}
                            to watch this content.
                          </Text>
                        ) : null}
                        <Text mt="2vh" fontSize="2.3vh" color={'white'}>
                          You can&nbsp;
                          <Link href="/payment/upgrade" color={'#72efdd'}>
                            <b>upgrade</b>
                          </Link>
                          &nbsp;your plan to watch any content.
                        </Text>
                      </Box>
                    ) : null
                  }
                  {
                    // USER GUEST CASE:
                    user.subscription == null ? (
                      <Box textAlign="left" mt="3vh">
                        <Text fontSize="2.3vh" color={'white'}>
                          <Link href="/login" color={'#72efdd'}>
                            <b>Log In</b>
                          </Link>
                          &nbsp;or&nbsp;
                          <Link href="/register" color={'#64dfdf'}>
                            <b>Register</b>
                          </Link>
                          &nbsp;to watch this movie.
                        </Text>
                      </Box>
                    ) : null
                  }
                </Container>
              </Flex>
            )}

            <Flex
              flexDirection="column"
              ml={isShortThan960px ? '10vw' : '10vw'}
              mt={100}
              mb={50}
              w={isShortThan960px ? '80%' : '50%'}
            >
              <Box borderBottom="1px" borderColor="gray.800" mb={5}>
                <Text color="gray.200" fontSize={isShortThan960px ? 25 : 30}>
                  Comments
                </Text>
              </Box>
              <Flex
                maxH={500}
                overflow="auto"
                flexDirection="column"
                alignItems="center"
                css={{
                  '&::-webkit-scrollbar': {
                    backgroundColor: 'black',
                    width: '10px',
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '1px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: color.kinemaBg,
                    borderRadius: '24px',
                  },
                }}
              >
                {commentsLocal.length ? (
                  commentsLocal.map((comment) => {
                    return (
                      <Comment
                        username={comment.username}
                        text={comment.content}
                        avatar={comment.avatar}
                        date={comment.date}
                        userId={comment.userId}
                        id={comment._id}
                        deleteLocal={setCommentsLocal}
                      ></Comment>
                    );
                  })
                ) : (
                  <Center
                    border="2px"
                    borderColor="gray.800"
                    backgroundColor={color.kinemaBg}
                    color="gray.100"
                    w="100%"
                    borderRadius={0}
                  >
                    <Text mt="2vh" mb="2vh" fontSize="2vh">
                      No comments yet. Be the first one!
                    </Text>
                  </Center>
                )}
              </Flex>

              <Box
                border="2px"
                borderColor="gray.800"
                backgroundColor={color.kinemaBg}
                color="gray.100"
                borderRadius={0}
              >
                <Text fontSize="2.5vh" ml="5vh" mt={5}>
                  Leave your comment!
                </Text>
                <Divider mt={4} mb={4} />
                {user ? (
                  <>
                    <Center>
                      <Textarea
                        value={commentArea}
                        placeholder="Type something here..."
                        w="90%"
                        border="2px"
                        borderColor="gray.300"
                        mb={5}
                        onChange={handleTextArea}
                      />
                    </Center>
                    <Flex justifyContent="flex-end">
                      {errorCommentArea ? (
                        <Text mr={5} color="red">
                          You must write at least 5 characters.
                        </Text>
                      ) : (
                        <></>
                      )}
                      <Button
                        mr="5%"
                        mb={5}
                        backgroundColor={color.kinemaBg}
                        borderRadius={0}
                        _hover={{ backgroundColor: 'gray.600' }}
                        onClick={handleSubmitComment}
                        disabled={errorCommentArea}
                      >
                        Submit
                      </Button>
                    </Flex>
                  </>
                ) : (
                  <Center fontSize={15} mb={10} mt={10}>
                    <Button
                      onClick={() => {
                        navigate('/login');
                      }}
                      fontSize={20}
                      backgroundColor={color.kinemaBg}
                      mr={5}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      Log In
                    </Button>
                    <Text>Or</Text>
                    <Button
                      onClick={() => {
                        navigate('/register');
                      }}
                      fontSize={20}
                      backgroundColor={color.kinemaBg}
                      ml={5}
                      _hover={{ backgroundColor: 'gray.600' }}
                    >
                      Register
                    </Button>
                  </Center>
                )}
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box h='80vh'>
            <Image
              w={['100px', '150px', '200px']}
              src={loader}
              alt="loader"
              display="block"
              margin="auto"
              mt="20vh"
              mb="20vh"
            />
          </Box>
        )}
        <Footer />
      </Flex>
    );
  };

  if (error) {
    return <Error />;
  } else {
    return (
      <Flex direction="column">
        {playTrailer ? renderTrailer() : renderPage()}
      </Flex>
    );
  }
}
