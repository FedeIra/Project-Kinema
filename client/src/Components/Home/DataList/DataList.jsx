import React from 'react';
import Card from './Card';
import { Wrap, Flex, Center, Text, Image } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import loader from '../../../Assets/loader.gif';

export default function DataList({ data, next, hasMore }) {
  return (
    <InfiniteScroll
      dataLength={data.length}
      hasMore={hasMore}
      next={() => next((prev) => prev + 1)}
      loader={
        <Flex alignItems="center" justify="center" minH={200}>
          <Image w={['100px', '150px', '200px']} src={loader} alt="loader" />
        </Flex>
      }
      endMessage={
        <Center>
          <Center
            w="95%"
            mb={30}
            pt={70}
            pb={70}
            borderTop="2px"
            borderColor="white"
          >
            <Text fontSize={30} color="white">
              No more results...
            </Text>
          </Center>
        </Center>
      }
    >
      <Wrap justify="center" my="10" pt={6} pb={10}>
        {data?.map((m) => {
          if (m.serie) {
            return (
              <Link key={m.id} to={`/home/tv_show_details/${m.id}`}>
                <Card
                  posterUrl={'https://image.tmdb.org/t/p/w300' + m.poster}
                  id={m.id}
                />
              </Link>
            );
          } else {
            return (
              <Link key={m.id} to={`/home/movie_details/${m.id}`}>
                <Card
                  posterUrl={'https://image.tmdb.org/t/p/w300' + m.poster}
                  id={m.id}
                  title={m.title}
                />
              </Link>
            );
          }
        })}
      </Wrap>
    </InfiniteScroll>
  );
}
