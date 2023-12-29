import {
  Box,
  useColorModeValue,
  Center,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Avatar,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllContent } from '../../../Redux/actions';
import { useAuth } from '../../AuthContext/AuthContext';
import Statistics from './StatisticsContent';
import { Link } from 'react-router-dom';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BsFillEyeFill } from 'react-icons/bs';
import NavBar from './AdminNavbar';

export default function KinemaContent() {
  const userData = useSelector((state) => state.user);
  const { user, loadingUser } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [content, setContent] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllContent()).then((res) => {
      setContent(res);
    });
  }, []);

  const searcher = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);

    if (e.target.value === '') {
      dispatch(getAllContent()).then((res) => {
        setContent(res);
      });
    } else {
      dispatch(getAllContent()).then((res) => {
        setContent(
          res.filter((content) =>
            content.title.toLowerCase().includes(e.target.value.toLowerCase())
          )
        );
      });
    }
  };

  const indexOfLast = page * 10;
  const indexOfFirst = indexOfLast - 10;
  const currentContent = content.slice(indexOfFirst, indexOfLast);

  function prevPage(e) {
    e.preventDefault();
    if (page > 1) return setPage(page - 1);
  }

  let totalPages = Math.ceil(content.length / 10);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(content.length / 10); i++) {
    pageNumbers.push(i);
  }

  const nextPage = (e) => {
    e.preventDefault();
    if (page !== totalPages) return setPage(page + 1);
  };

  let backgroundBox = useColorModeValue('gray.100', 'gray.900');

  return (
    <Box bg={loadingUser ? null : backgroundBox} height={'100%'}>
      <NavBar
        content={content}
        search={search}
        searcher={searcher}
        user={userData}
      />
      <Statistics
        movies={content.length - content.filter((c) => c.serie).length}
        tvShows={content.filter((c) => c.serie).length}
        totalContent={content.length}
      />
      <br />
      <Box
        display="flex"
        flexDirection="row"
        justifyContent={'center'}
        gap={'18%'}
      >
        <Button
          size={'sm'}
          color={'black'}
          backgroundColor="lightgray"
          onClick={() =>
            content.filter((c) => !c.serie).length === 0
              ? dispatch(getAllContent()).then((res) => {
                  setContent(res.filter((c) => !c.serie));
                  setPage(1);
                })
              : setContent(content.filter((c) => !c.serie))
          }
          _focus={{
            transform: 'scale(1.5)',
          }}
        >
          Movies
        </Button>
        <Button
          size={'sm'}
          color={'black'}
          backgroundColor="lightgray"
          onClick={() =>
            content.filter((c) => c.serie).length === 0
              ? dispatch(getAllContent()).then((res) => {
                  setContent(res.filter((c) => c.serie));
                  setPage(1);
                })
              : setContent(content.filter((c) => c.serie))
          }
          _focus={{
            transform: 'scale(1.5)',
          }}
        >
          TV Shows
        </Button>
        <Button
          size={'sm'}
          color={'black'}
          backgroundColor="lightgray"
          onClick={() =>
            dispatch(getAllContent()).then((res) => {
              setContent(res);
            })
          }
        >
          All Content
        </Button>
      </Box>
      <br />
      <Box bg={loadingUser ? null : backgroundBox}>
        <Center margin={'20px'}>
          <Button
            color={'black'}
            onClick={prevPage}
            backgroundColor="lightgray"
          >
            Prev
          </Button>
          <label style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Button color={'black'} backgroundColor="lightgray">
              {page}
            </Button>{' '}
            de {totalPages}
          </label>
          <Button
            color={'black'}
            onClick={nextPage}
            backgroundColor="lightgray"
          >
            Next
          </Button>
        </Center>

        <TableContainer
          bg={loadingUser ? null : backgroundBox}
          height={'850px'}
        >
          <Center>
            <Table variant="simple" width={'90%'}>
              <Thead>
                <Tr>
                  <Th fontSize={'14px'}>Image Product</Th>
                  <Th fontSize={'14px'}>Product ID</Th>
                  <Th fontSize={'14px'}>Title</Th>
                  <Th fontSize={'14px'}>Release Date</Th>
                  <Th fontSize={'14px'}>Rating</Th>
                  <Th fontSize={'14px'}>Movie / TV show</Th>
                  <Th fontSize={'14px'}> Users Comments</Th>
                </Tr>
              </Thead>
              <Tbody>
                {content
                  ? currentContent.map((movieOrTvSerie, i) => {
                      return (
                        <Tr>
                          <Td>
                            <Box
                              display="flex"
                              flexDirection="row"
                              justifyContent={'flex-start'}
                            >
                              <Avatar
                                size={'md'}
                                src={movieOrTvSerie.image}
                                alt={movieOrTvSerie.image}
                              />
                              <Link
                                to={`/home/${
                                  movieOrTvSerie.serie
                                    ? 'tv_show_details'
                                    : 'movie_details'
                                }/${movieOrTvSerie.id}`}
                              >
                                <BsFillEyeFill
                                  style={{ marginLeft: '5px' }}
                                  size={20}
                                  onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.5)';
                                  }}
                                  onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                  }}
                                />
                              </Link>
                            </Box>
                          </Td>
                          <Td
                            fontSize={'14px'}
                            color={'gray.500'}
                            key={movieOrTvSerie.id}
                          >
                            {movieOrTvSerie.id}
                          </Td>
                          <Td
                            fontSize={'14px'}
                            key={movieOrTvSerie.title}
                            color={'gray.500'}
                          >
                            {movieOrTvSerie.title.length > 20
                              ? movieOrTvSerie.title.slice(0, 20) + '...'
                              : movieOrTvSerie.title}
                          </Td>
                          <Td
                            fontSize={'14px'}
                            color={'gray.500'}
                            key={movieOrTvSerie.release_date}
                          >
                            {movieOrTvSerie.release_date}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {movieOrTvSerie.rating.toString().slice(0, 3)}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {movieOrTvSerie.serie ? 'TV Show' : 'Movie'}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            <Link to={`/admin/content/${movieOrTvSerie.id}`}>
                              <Button backgroundColor="transparent">
                                <BsFillChatDotsFill size={'30px'} />
                              </Button>
                            </Link>
                          </Td>
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>
          </Center>
        </TableContainer>
        <Center marginTop={'20px'} paddingBottom={'30px'}>
          <Button
            color={'black'}
            onClick={prevPage}
            backgroundColor="lightgray"
          >
            Prev
          </Button>
          <label style={{ marginLeft: '20px', marginRight: '20px' }}>
            <Button color={'black'} backgroundColor="lightgray">
              {page}
            </Button>{' '}
            de {totalPages}
          </label>
          <Button
            color={'black'}
            onClick={nextPage}
            backgroundColor="lightgray"
          >
            Next
          </Button>
        </Center>
      </Box>
    </Box>
  );
}
