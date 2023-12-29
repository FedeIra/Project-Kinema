/* eslint-disable */
import React from 'react';
import {
  Box,
  Image,
  FormControl,
  Text,
  Stack,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  useMediaQuery,
} from '@chakra-ui/react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentCheckout.css';
import { useDispatch, useSelector } from 'react-redux';
import { rentVideo } from '../../../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';
import logo from '../../../Assets/logoPayment.png';
import moment from 'moment';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';
import loader from '../../../Assets/loader.gif';

const stripePromise = loadStripe(
  'pk_test_51LvQonFFC0gF7yTeuOEoxQ3wpBdRP5RTM4qfj3LBPhDG49fftecGaI3ixkwnaU5yKXDHiEIg4RW6mdoZGWM5GEs200MTQVMdhI'
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, email, uid, rented } = useSelector((state) => state.user);
  const { movieDetail } = useSelector((state) => state);
  const { serieDetail } = useSelector((state) => state);
  const [isLargerThan960] = useMediaQuery('(min-width: 960px)');
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

  const { pathname } = useLocation();
  const params = useParams();

  const type = pathname.split('/')[3];

  if (type === 'tv_show') {
    var { title, poster } = serieDetail;
  } else {
    var { title, poster } = movieDetail;
  }

  const now = new Date();
  const rentDuration = 3600 * 24 * 4 * 1000; // 4 days
  const date = moment(now.getTime() + 345600000).format('MMMM Do YYYY');

  const rentedMovie = {
    id: Number(params.id),
    title,
    posterImg: poster,
    serie: type === 'tv_show' ? true : false,
    expirationDate: now.getTime() + rentDuration,
  };

  const [errors, setErrors] = useState({
    name: 'A name is required',
    surname: 'A surname is required',
  });

  const [input, setInput] = useState({
    name: '',
    surname: '',
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function validate(input) {
    let errors = {};
    let nameRegex = /^[a-zA-Z-_ ]{3,20}$/;
    if (!input.name) {
      errors.name = 'A name is required';
    } else if (!nameRegex.test(input.name)) {
      errors.name = 'Name is invalid';
    }
    if (!input.surname) {
      errors.surname = 'A surname is required';
    } else if (!nameRegex.test(input.surname)) {
      errors.surname = 'Surname is invalid';
    }

    return errors;
  }

  const updateRented = async (payload) => {
    const userRef = doc(firestore, 'users', uid);
    await updateDoc(userRef, {
      rented: [...rented, payload],
    });
  };

  const handleSubmit = async (e) => {
    if (errors.name || errors.surname) {
      e.preventDefault();
      toast.warn('The form is not properly complete.', {
        position: 'top-center',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    } else {
      e.preventDefault();
      setLoading(true);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
      if(error){
        setLoading(false);
        toast.error('Please fill all credit card information.', {
          position: 'top-center',
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
      else {
        const { id } = paymentMethod;
        const { data } = await axios.post('/payment/rent', {
          id,
          username,
          email,
          title,
        });
        setLoading(false);
        if (data.success) {
          toast.success(data.message, {
            position: 'top-center',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
          await axios.post('/email/rent', {
            email: email,
            title: title,
            img: poster,
            date: date,
            user: username
          });
          dispatch(rentVideo(rentedMovie));
          await updateRented(rentedMovie);
          navigate(-1);
        } else {
          setLoading(false);
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'dark',
          });
        }
      }
    }
  };

  return (
    <Box
      backgroundColor={'#1D1D1D'}
      backgroundImage={
        'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
      }
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      height={'100vh'}
      width={'100vw'}
      pb="30px"
    >
      <NavBarPayment />
      <ToastContainer />
      <Stack
        direction={isLargerThan960 ? 'row' : 'column'}
        spacing={4}
        display="flex"
        mt={isLargerThan480 ? '10vh' : '5vh'}
        justifyContent="center"
        alignItems={'center'}
      >
        <form onSubmit={handleSubmit}>
          <FormControl
            display="flex"
            justifyContent="center"
            alignItems={'center'}
            color="black"
          >
            <Stack
              direction={isLargerThan480 ? 'row' : 'column-reverse'}
              spacing={0}
            >
              <Box
                w={'24vw'}
                h={isLargerThan480 ? '500px' : '450px'}
                minW="300px"
                pl="30px"
                bgColor={'white'}
                borderLeftRadius={isLargerThan480 ? '10px' : null}
                borderBottomRadius={isLargerThan480 ? null : '10px'}
                pr="30px"
                pt="3.5vh"
                mb={'30px'}
              >
                <FormLabel m={'0px'} p="0px" color={'black'}>
                  Name
                </FormLabel>
                <Input
                  variant="flushed"
                  value={input.name}
                  name="name"
                  onChange={handleChange}
                  w="18vw"
                  h="3.5vh"
                  minW="200px"
                  borderColor={'black'}
                />
                {errors.name && (
                  <FormHelperText color={'red'}>{errors.name}</FormHelperText>
                )}
                <FormLabel m={'3vh 0px 0px 0px'} p="0px" color={'black'}>
                  Surname
                </FormLabel>
                <Input
                  variant="flushed"
                  value={input.surname}
                  name="surname"
                  onChange={handleChange}
                  w="18vw"
                  h="3.5vh"
                  minW="200px"
                  borderColor={'black'}
                />
                {errors.surname && (
                  <FormHelperText color={'red'}>
                    {errors.surname}
                  </FormHelperText>
                )}
                <Stack direction="row" spacing={10} mb="5vh">
                  <Box>
                    <FormLabel m={'3vh 0px 0px 0px'} p="0px" color={'black'}>
                      City
                    </FormLabel>
                    <Input
                      variant="flushed"
                      w="8vw"
                      minW={'100px'}
                      h="3.5vh"
                      borderColor={'black'}
                    />
                  </Box>
                  <Box>
                    <FormLabel m={'3vh 0px 0px 0px'} p="0px" color={'black'}>
                      Address
                    </FormLabel>
                    <Input
                      variant="flushed"
                      minW={'100px'}
                      w="8vw"
                      h="3.5vh"
                      borderColor={'black'}
                    />
                  </Box>
                </Stack>
                <CardElement className="pcard" options={{ hidePostalCode: true }}/>
                {isLargerThan480 ? null : loading ? (
                  <Flex justify="center" align="center">
                    <Image mt="20px" boxSize="60px" src={loader} alt="loader" />
                  </Flex>
                ) : (
                  <Box p={6}>
                    <button className="btn-premium2">Confirm</button>
                  </Box>
                )}
              </Box>
              <Flex
                w="20vw"
                h={isLargerThan480 ? '500px' : '280px'}
                borderRightRadius={isLargerThan480 ? '10px' : null}
                borderTopRadius={isLargerThan480 ? null : '10px'}
                minW={isLargerThan480 ? '250px' : '300px'}
                bg={'rgba(17, 173, 152, 0.3)'}
                backdropFilter={'blur(10px)'}
                direction="column"
                align="center"
                p="5px"
              >
                {isLargerThan480 ? (
                  loading ? (
                    <Image mt="10px" boxSize="80px" src={loader} alt="loader" />
                  ) : (
                    <Image mt="10px" src={logo} w="80px" h="80px" />
                  )
                ) : null}
                <Text align={'center'} justify={'center'} color="white">
                  Rent
                </Text>
                <Stack direction={'row'} align={'center'} justify={'center'}>
                  <Text fontSize={'2xl'} color="white">
                    $
                  </Text>
                  <Text fontSize={'4xl'} color="white" fontWeight={800}>
                    1.99
                  </Text>
                </Stack>
                <Image
                  mt={isLargerThan480 ? '2.2vh' : '2px'}
                  src={'https://image.tmdb.org/t/p/original/' + poster}
                  w={isLargerThan480 ? '100px' : '75px'}
                  h={isLargerThan480 ? '140px' : '105px'}
                  borderRadius="0.5vh"
                />
                <Flex
                  align={'center'}
                  justify={'center'}
                  mt="3vh"
                  direction="column"
                >
                  {isLargerThan480 ? (
                    <button className="btn-premium">Confirm</button>
                  ) : null}
                  <Text
                    mt={isLargerThan480 ? '2vh' : '1px'}
                    textAlign="center"
                    color="whiteAlpha.900"
                  >
                    <b>You can watch this content until:</b>{' '}
                    {moment(now.getTime() + 345600000).format('MMMM Do YYYY')}
                  </Text>
                </Flex>
              </Flex>
            </Stack>
          </FormControl>
        </form>
      </Stack>
    </Box>
  );
};

export default function PaymentCheckoutRent(props) {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm props={props} />
          </div>
        </div>
      </div>
    </Elements>
  );
}
