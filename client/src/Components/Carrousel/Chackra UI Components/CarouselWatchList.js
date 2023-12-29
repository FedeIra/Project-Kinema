import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Text,
  Image,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
// Here we have used react-icons package for the icons
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import deleted from '../../../Assets/delete.png';
import { removeFromWatchlist } from '../../../Redux/actions';
import { extendTheme } from '@chakra-ui/react';
import { color } from '../../globalStyles';

const breakpoints = {
  sm: '400px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}
const theme = extendTheme({ breakpoints })

// Settings for the slider
const settings = {
  dots: false,
  arrows: false,
  fade: false,
  infinite: false,
  speed: 1500,
  slidesToShow: 8,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 2048,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 4,
      }
    },
    {
      breakpoint: 960,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 3,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      }
    },
    {
      breakpoint: 440,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  ]
};

export default function CarouselWatchList({ movies }) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const cards = movies;
    
  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const buttonSize = useBreakpointValue({base:40, md:60, lg:80})
  const top = useBreakpointValue({ base: '60%', md: '50%' });
  const side = useBreakpointValue({ base: "2px", md: "10px" });

  // These are the images used in the slide

  /* handleDelete from watchlist: */
  const handleDeleteFromWatchlist = (toBeRemove) => {
    dispatch(removeFromWatchlist(user, toBeRemove));
  };

  return (
    <Box
      position={'relative'}
      mb={{base: 4, sm: 6, md: 12}}
      overflow={'hidden'}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <Text
        fontWeight={'bold'}
        color={color.kinemaLogoColor1}
        fontSize={{ base: '1xl', md: '2xl' }}
        ml={4}
      >
        Watchlist
      </Text>
      <IconButton
        aria-label="left-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
        display={{base: cards.length <= 3 ? 'none' : 'inline-flex', sm: cards.length <= 4 ? 'none' : 'inline-flex', md: cards.length <= 6 ? 'none' : 'inline-flex', lg: cards.length <= 8 ? 'none' : 'inline-flex'}}
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
      >
        <IoIosArrowBack color="white" size={buttonSize} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        colorScheme="messenger"
        borderRadius="full"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
        display={{base: cards.length <= 3 ? 'none' : 'inline-flex', sm: cards.length <= 4 ? 'none' : 'inline-flex', md: cards.length <= 6 ? 'none' : 'inline-flex', lg: cards.length <= 8 ? 'none' : 'inline-flex'}}
        backgroundColor={'transparent'}
        _hover={{
          backgroundColor: 'transparent',
        }}
        _active={{
          backgroundColor: 'transparent',
        }}
      >
        <IoIosArrowForward color="white" size={buttonSize} />
      </IconButton>
      {/* Slider */}
      <Slider
        {...settings}
        ref={(slider) => setSlider(slider)}
      >
        {cards.map((m, index) => {
          if (m.serie) {
            return (
              <Box key={index} h="100%" zIndex={1} position={'relative'}>
                <IconButton
                  position="absolute"
                  right={1}
                  top={1}
                  zIndex={20}
                  background="#282c34"
                  opacity={0.5}
                  _hover={{
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s',
                    opacity:1
                  }}
                  onClick={() => {
                    handleDeleteFromWatchlist(m);
                  }}
                >
                  <img
                    src={deleted}
                    alt="deleted"
                    style={{
                      width: '17px',
                      height: '17px',
                      filter: 'invert(100%)',
                    }}
                  />
                </IconButton>
                <Link to={`/home/tv_show_details/${m.id}`}>
                  <Image
                    src={m.posterImg}
                    alt={m.title}
                    transition="0.4s"
                    _hover={{
                      transform: 'scale(1.10)',
                      transition: '0.7s',
                      shadow: '5px 5px 50px black',
                      zIndex: '2',
                    }}
                  />
                </Link>
              </Box>
            );
          } else {
            return (
              <Box key={index} h="100%" zIndex={1} position={'relative'}>
                <IconButton
                  position="absolute"
                  right={1}
                  top={1}
                  zIndex={20}
                  background="#282c34"
                  opacity={0.5}
                  _hover={{
                    transform: 'scale(1.1)',
                    transition: 'all 0.2s',
                    opacity: 1
                  }}
                  onClick={() => {
                    handleDeleteFromWatchlist(m);
                  }}
                >
                  <img
                    src={deleted}
                    alt="deleted"
                    style={{
                      width: '17px',
                      height: '17px',
                      filter: 'invert(100%)',
                    }}
                  />
                </IconButton>
                <Link to={`/home/movie_details/${m.id}`}>
                  <Image
                    src={m.posterImg}
                    transition="0.4s"
                    _hover={{
                      transform: 'scale(1.10)',
                      transition: '0.7s',
                      shadow: '5px 5px 50px black',
                      zIndex: '2',
                    }}
                    alt={m.title}
                  />
                </Link>
              </Box>
            );
          }
        })}
      </Slider>
    </Box>
  );
}
