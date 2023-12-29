/* eslint-disable */
import {
    Stack,
    Flex,
    Button,
    Text,
    VStack,
    useBreakpointValue,
} from '@chakra-ui/react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMovieDetail } from '../../../Redux/actions';
import { Icon } from '@chakra-ui/react';
import { BsCreditCard } from 'react-icons/bs';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { MdPlayArrow } from 'react-icons/md';


export default function MainMovieMenu(props) {
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(getMovieDetail(props.id));
    };

    const validExpirationDate = () => {
        const { rented } = userData;
        if (!rented.length) return false;
        const movieRentHistory = rented.filter ( m => m.id == props.id);
        let now = new Date();
        if (!movieRentHistory.length) return false;
        const validMovie = (movieRentHistory.find((m) => m.expirationDate > now.getTime()));
        if (!validMovie) return false;
        return validMovie.expirationDate;
    }

    return (
        <Flex
            w={'full'}
            h={{base:'50vh', sm: '65vh'}}
            backgroundImage={props.poster}
            backgroundSize={'cover'}
            backgroundPosition={'center center'}
        >
        <VStack
            w={'full'}
            justify={'center'}
            px={useBreakpointValue({ base: 4, md: 8 })}
            bgGradient={
            'linear(to-b,  rgba(34,34,34,0) 30%, rgba(34,34,34,.7) 90%, #0d0c0c 95%)'
            }
        >
            <Stack maxW={'2xl'} align={'center'} spacing={6} w={{base: '50%', md: '90%'}}>
                <Text
                    color={'white'}
                    textAlign='center'
                    fontWeight={700}
                    lineHeight={1.2}
                    fontSize={useBreakpointValue({ base: '2xl', sm: '3xl', md: '4xl' })}
                >
                    {props.title}
                </Text>
                <Stack direction={{base: 'column', sm: 'row'}} spacing={4} alignSelf={'center'}>
                    {userData.subscription === 2 || (userData.subscription === 1 && validExpirationDate()) ? (
                    <Link to={`/home/watch/${props.id}`}>
                        <Button
                            size={{base: "xs", sm: "sm", md: "md"}}
                            onClick={() => handleClick()}
                            rightIcon={<Icon as={MdPlayArrow} boxSize={{base: 4, sm: 5, md: 6}} />}
                            bg={'blue.400'}
                            w={{base: '100%', sm: '100px'}}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}
                        >
                            Watch
                        </Button>
                    </Link>
                    ) : userData.subscription === 1 ? (
                        <Link to={`/payment/rent/movie/${props.id}`}>
                            <Button
                                size={{base: "xs", sm: "sm", md: "md"}}
                                onClick={() => handleClick()}
                                rightIcon={<Icon as={BsCreditCard} boxSize={{base: 4, sm: 5, md: 6}} />}
                                bg={'blue.400'}
                                w={{base: '100%', sm: '100px'}}
                                rounded={'full'}
                                color={'white'}
                                _hover={{ bg: 'blue.500' }}
                            >
                                Rent
                            </Button>
                        </Link>
                    ) : (
                    <Link to={`/login`}>
                        <Button
                            size={{base: "xs", sm: "sm", md: "md"}}
                            w={{base: '100%', sm: '200px'}}
                            bg={'blue.400'}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'blue.500' }}
                        >
                            Log In to Watch
                        </Button>
                    </Link>
                    )}

                    <Link to={`/home/movie_details/${props.id}`}>
                        <Button
                            size={{base: "xs", sm: "sm", md: "md"}}
                            w={{base: '100%', sm: '200px'}}
                            bg={'whiteAlpha.300'}
                            rightIcon={<Icon as={IoMdInformationCircleOutline} boxSize={{base: 4, sm: 5, md: 6}} />}
                            rounded={'full'}
                            color={'white'}
                            _hover={{ bg: 'whiteAlpha.500' }}
                        >
                            More Information
                        </Button>
                    </Link>
                </Stack>
            </Stack>
        </VStack>
        </Flex>
    );
}
