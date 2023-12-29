/* eslint-disable */
import { useAuth } from '../../AuthContext/AuthContext';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import style from './UserProfile.module.css';
import { firestore } from '../../AuthContext/firebase';
import { ToastifyMessage } from '../../Toastify/Toastify';
import { EditIcon } from '@chakra-ui/icons';
import {
  Icon,
  HStack,
  Image,
  VStack,
  Flex,
  Avatar,
  Box,
  Text,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import logo from '../../../Assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeNameUser,
  downgradePlan,
  uploadImg,
  avatarImg,
  logOutUser,
  loadUserData,
} from '../../../Redux/actions';
import { reload } from 'firebase/auth';
import NavBarPayment from '../../NavBarPayment/NavBarPayment';
import './slick-theme.css';
import styles from './UserProfile.module.css';
import { useToast } from '@chakra-ui/react';

const settings = {
  dots: true,
  dotsClass: 'pointer-up',
  arrows: false,
  fade: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 4,
};

export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, loadingUser, read } = useAuth();
  const userData = useSelector((state) => state.user);
  const [username1, setUsername1] = useState();
  const [mail, setMail] = useState();
  const [openImage, setOpenImage] = useState(false);
  const [image, setImage] = useState();
  const [typeSub, setTypeSub] = useState();
  const [rented, setRented] = useState();
  const [watchList, setWatchList] = useState();
  const [avatar, setAvatar] = useState();
  const [avatars, setAvatars] = useState();
  const [admin, setAdmin] = useState();
  const [stateButton, setStateButton] = useState(true);
  const [input, setInput] = useState({
    username: '',
    email: '',
    active: '',
  });
  const [changeUserName, setChangeUserName] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [, setSlider] = useState(null);
  const dispatch = useDispatch();
  const toast = useToast();

  let now = new Date();
  userData.rented = userData.rented?.filter(
    (m) => m.expirationDate > now.getTime()
  );

  async function logOut() {
    await logout();
    navigate('/');
  }

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setFormErrors(validate(input));
  }

  const updateUserInfo = async () => {
    if (Object.keys(formErrors).length === 0 && input.username.length >= 5) {
      const userRef = doc(firestore, `/users/${user.uid}`);
      await updateDoc(userRef, {
        username: input.username,
      });
      setUsername1(input.username);
      dispatch(changeNameUser(input.username));
      setInput({
        username: '',
      });
      setChangeUserName(false);
      ToastifyMessage('Username updated.', 'success');
    } else {
      ToastifyMessage('Username must have at least 5 characters.');
    }
  };

  const downgrade = async () => {
    setStateButton(false)
    const id = userData.stripeId;
    const { data } = await axios.post('/payment/downgrade', { id });
    if (data.success) {
      dispatch(downgradePlan());
      const userRef = doc(firestore, `/users/${user.uid}`);
      await updateDoc(userRef, {
        subscription: 1,
      });
      ToastifyMessage(data.message, 'success');
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      alert(data.message);
    }
  };

  const accDelete = async () => {
    if (userData.subscription === 2) {
      const id = userData.stripeId;
      const { data } = await axios.post('/payment/downgrade', { id });
      if (data.success) {
        dispatch(downgradePlan());
        const userRef = doc(firestore, `/users/${user.uid}`);
        await updateDoc(userRef, {
          subscription: 1,
        });
      } else {
        alert(data.message);
      }
      const userRef = doc(firestore, `/users/${user.uid}`);
      await updateDoc(userRef, {
        active: false,
      });
      ToastifyMessage('Your account has been deleted.', 'success');
      setTimeout(() => {
        logout();
        navigate('/');
      }, 2000);
    } else {
      const userRef = doc(firestore, `/users/${user.uid}`);
      await updateDoc(userRef, {
        active: false,
      });
      ToastifyMessage('Your account has been deleted.', 'success');
      setTimeout(() => {
        logOut();
        navigate('/');
      }, 2000);
    }
  };

  const changeUser = () => {
    setChangeUserName(true);
  };
  const changeState = () => {
    setChangeUserName(false);
    setInput({
      username: '',
    });
  };
  const goBack = () => {
    window.history.go(-1);
  };
  function validate(x) {
    let errors = {};
    if (!x.username.trim()) {
      errors.name = 'Please fill name.';
    } else if (x.username.trim().length < 4) {
      errors.name = 'Name must have more than 5 characters.';
    } else if (x.username.length === 0) {
      errors.name = 'Please fill name.';
    }
    return errors;
  }

  useEffect(() => {
    async function exe() {
      let dataUser = await read(user.uid);
      setUsername1(dataUser.username);
      setMail(dataUser.email);
      setImage(dataUser.avatar);
      setTypeSub(dataUser.subscription);
      setAdmin(dataUser.admin);
      setRented(dataUser.rented);
      setWatchList(dataUser.watchList);
      setAvatars(dataUser.avatars);
    }
    exe();
  }, [user.uid]);

  useEffect(() => {
    dispatch(loadUserData(userData.uid));
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

  const {
    isOpen: firstIsOpen,
    onOpen: firstOnOpen,
    onClose: firstOnClose,
  } = useDisclosure();
  const {
    isOpen: secondIsOpen,
    onOpen: secondOnOpen,
    onClose: secondOnClose,
  } = useDisclosure();
  const {
    isOpen: thirdIsOpen,
    onOpen: thirdOnOpen,
    onClose: thirdOnClose,
  } = useDisclosure();
  const cancelRef = useRef();

  //cloudinary
  const handleOpenWidget = async () => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'ddhpexcoe',
        uploadPreset: 'prueba',
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          const imageToDb = result.info.secure_url;
          const userRef = doc(firestore, `/users/${user.uid}`);
          updateDoc(userRef, {
            avatars: [...avatars, imageToDb],
          });
          dispatch(uploadImg(imageToDb));
          setAvatars([...avatars, imageToDb]);
        }
      }
    );
    myWidget.open();
  };

  const handleChangeImage = (i) => {
    setImage(i);
  };

  const handleCancelImage = () => {
    setImage(userData.avatar);
    secondOnClose();
  };

  const handleSave = async () => {
    dispatch(avatarImg(image));
    const userRef = doc(firestore, `/users/${user.uid}`);
    await updateDoc(userRef, {
      avatar: image,
    });
    ToastifyMessage('Your Avatar has been successfully updated', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  /* if (loadingUser) return <h1>loading</h1>; */
  return (
    <div style={{ background: '#111111', height: '100vh' }}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        background={'#111111'}
        marginBottom={'5vh'}
        shadow="0px 0.5px 8px #444444"
      >
        <NavBarPayment />
        <Flex alignItems={'center'}></Flex>
      </Flex>

      <Flex justify={'center'}>
        <VStack justify="center">
          <Tabs
            size="md"
            variant="enclosed"
            className={style.tabla_user}
            border={'black'}
            bgGradient="linear(to-b, #222222, #333333)"
            borderRadius={'5px'}
            overflow={'hidden'}
            color={'white'}
          >
            <TabList>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
              >
                Profile
              </Tab>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
              >
                Account
              </Tab>
              <Tab
                fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                color={'#99a3a4'}
              >
                Edit
              </Tab>
            </TabList>
            <TabPanels align={'center'}>
              <TabPanel>
                <Avatar
                  size={'xl'}
                  src={image}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                />
                <Box
                  fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  marginBottom={'2vh'}
                  color={'#99a3a4'}
                >
                  Hello {username1}!
                </Box>
                <Box>
                  {typeSub === 1 ? (
                    <Box>
                      {userData.rented && userData.rented.length > 0 ? (
                        <Box
                          position={'relative'}
                          height={'270px'}
                          width={'90%'}
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
                          {/* Right Icon */}
                          {/* Slider */}
                          <Text
                            marginBottom={'2vh'}
                            borderColor={'#424949'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                            color={'#99a3a4'}
                          >
                            {' '}
                            Enjoy your rented content{' '}
                          </Text>
                          <Slider
                            {...settings}
                            ref={(slider) => setSlider(slider)}
                          >
                            {userData.rented.map((r, index) => {
                              if (r.serie) {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/tv_show_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={
                                          'https://image.tmdb.org/t/p/w300' +
                                          r.posterImg
                                        }
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/movie_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={
                                          'https://image.tmdb.org/t/p/w300' +
                                          r.posterImg
                                        }
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              }
                            })}
                          </Slider>
                        </Box>
                      ) : (
                        <Box>
                          <Text
                            color={'#99a3a4'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          >
                            No rented Movies or Tv Shows
                          </Text>
                          {userData.admin ? (
                            <Button
                              background={'var(--chakra-colors-blue-600)'}
                              _hover={{
                                background: 'var(--chakra-colors-blue-700)',
                              }}
                            >
                              <RouteLink to={'/admin'}>Admin Panel</RouteLink>
                            </Button>
                          ) : null}
                          <Text
                            color={'#99a3a4'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          >
                            Go to{' '}
                            <Button variant={'link'} color={' #2ecc71 '}>
                              <RouteLink to="/home">EXPLORE</RouteLink>
                            </Button>
                          </Text>
                        </Box>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {userData.watchList && userData.watchList.length > 0 ? (
                        <Box
                          position={'relative'}
                          height={'270px'}
                          width={'90%'}
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
                          {/* Right Icon */}
                          {/* Slider */}
                          <Text
                            marginBottom={'2vh'}
                            borderColor={'#424949'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                            color={'#99a3a4'}
                          >
                            {' '}
                            Enjoy your favorite content{' '}
                          </Text>
                          <Slider
                            {...settings}
                            ref={(slider) => setSlider(slider)}
                          >
                            {userData.watchList.map((r, index) => {
                              if (r.serie) {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/tv_show_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={
                                          'https://image.tmdb.org/t/p/w300' +
                                          r.posterImg
                                        }
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Box
                                    maxW={'260px'}
                                    key={index}
                                    m={'1vh'}
                                    mt="1vh"
                                    transition="0.4s"
                                    _hover={{
                                      transform: 'scale(1.07)',
                                      transition: '0.8s',
                                    }}
                                  >
                                    <RouteLink
                                      to={`/home/movie_details/${r.id}`}
                                      position="relative"
                                      w={'250px'}
                                    >
                                      <Image
                                        src={
                                          'https://image.tmdb.org/t/p/w300' +
                                          r.posterImg
                                        }
                                        borderRadius="0.5vh"
                                      ></Image>
                                    </RouteLink>
                                  </Box>
                                );
                              }
                            })}
                          </Slider>
                        </Box>
                      ) : (
                        <Box>
                          <Text
                            color={'#99a3a4'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          >
                            No favorites Movies or Tv Shows
                          </Text>
                          <Text
                            color={'#99a3a4'}
                            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          >
                            Go to{' '}
                            <Button variant={'link'} color={' #2ecc71 '}>
                              <RouteLink to="/home">EXPLORE</RouteLink>
                            </Button>
                          </Text>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>
              </TabPanel>
              <TabPanel>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Username
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {username1}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Email
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {mail}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                  >
                    Subscription
                  </Text>
                  <Text fontSize={{ base: '14px', md: '16px', lg: '20px' }}>
                    {typeSub === 1 ? (
                      <Text color={'#99a3a4'}>Basic</Text>
                    ) : (
                      <Text color={' #f9e79f '}>Premium</Text>
                    )}
                  </Text>
                </Box>
                <Box borderRadius={'4px'} marginBottom={'2vh'}>
                  {typeSub === 1 ? (
                    <Box
                      border="solid 1px"
                      borderColor={'#424949'}
                      borderRadius={'4px'}
                    >
                      <Text
                        background={'#424949'}
                        border="solid 1px"
                        borderColor={'#424949'}
                        color={'#99a3a4'}
                        fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                      >
                        Be Premium
                      </Text>
                      <RouteLink to="/payment/upgrade">
                        <Text
                          fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                          color={'green'}
                        >
                          Change Subscription
                        </Text>
                      </RouteLink>
                    </Box>
                  ) : (
                    <Box
                      border="solid 1px"
                      borderColor={'#424949'}
                      borderRadius={'4px'}
                    >
                      <Text
                        background={'#424949'}
                        border="solid 1px"
                        borderColor={'#424949'}
                        color={'#99a3a4'}
                        fontSize={{ base: '20px', md: '30px', lg: '35px' }}
                      >
                        Downgrade
                      </Text>

                      <Text
                        fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                        color={'#cd6155'}
                      >
                        <Box>
                          <>
                            <Button variant={'link'} onClick={firstOnOpen}>
                              Downgrade
                            </Button>

                            <AlertDialog
                              isOpen={firstIsOpen}
                              leastDestructiveRef={cancelRef}
                              onClose={firstOnClose}
                            >
                              <AlertDialogOverlay>
                                <AlertDialogContent>
                                  <AlertDialogHeader
                                    fontSize="lg"
                                    fontWeight="bold"
                                  >
                                    Downgrade Account
                                  </AlertDialogHeader>

                                  <AlertDialogBody>
                                    Are you sure you want to Downgrade your
                                    Account? You will lose all Premium benefits.
                                  </AlertDialogBody>
                                  <AlertDialogFooter>
                                    <Button
                                      ref={cancelRef}
                                      onClick={firstOnClose}
                                    >
                                      Cancel
                                    </Button>
                                    {stateButton ?                                     <Button
                                      colorScheme="red"
                                      onClick={downgrade}
                                      ml={3}
                                    >
                                      Downgrade
                                    </Button> : null }
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialogOverlay>
                            </AlertDialog>
                          </>
                        </Box>
                      </Text>
                    </Box>
                  )}
                </Box>
                <Box
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                  borderRadius={'4px'}
                >
                  <Text
                    background={'#424949'}
                    border="solid 1px"
                    borderColor={'#424949'}
                    color={'#99a3a4'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  >
                    Delete Account
                  </Text>
                  <>
                    <Button variant={'link'} onClick={thirdOnOpen}>
                      Delete
                    </Button>

                    <AlertDialog
                      isOpen={thirdIsOpen}
                      leastDestructiveRef={cancelRef}
                      onClose={thirdOnClose}
                    >
                      <AlertDialogOverlay>
                        <AlertDialogContent>
                          <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Account
                          </AlertDialogHeader>

                          <AlertDialogBody>
                            Are you sure you want to DELETE your account?
                          </AlertDialogBody>
                          <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={thirdOnClose}>
                              Cancel
                            </Button>
                            <Button
                              colorScheme="red"
                              onClick={accDelete}
                              ml={3}
                            >
                              Delete
                            </Button>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </>
                </Box>
              </TabPanel>
              <TabPanel>
                <Avatar
                  size={'xl'}
                  src={image}
                  alt={'Avatar Alt'}
                  mb={4}
                  pos={'relative'}
                />
                <>
                  <Button
                    onClick={secondOnOpen}
                    position={'absolute'}
                    marginLeft={'0px'}
                    paddingLeft={'0px'}
                    variant={'link'}
                    rightIcon={<Icon as={EditIcon} boxSize={6} />}
                  ></Button>
                  <Modal isOpen={secondIsOpen} onClose={secondOnClose}>
                    <ModalOverlay />
                    <ModalContent
                      backgroundColor={'#222222'}
                      shadow="0px 0.5px 8px #444444"
                      color={'#99a3a4'}
                    >
                      <ModalHeader>Select your Avatar</ModalHeader>
                      <ModalCloseButton onClick={handleCancelImage} />
                      <ModalBody>
                        <Box
                          display={'grid'}
                          gridTemplateColumns={'repeat(4,1fr)'}
                          gridRowGap={'10px'}
                          gridColumnGap={'10px'}
                        >
                          {avatars?.map((i) => (
                            <Image
                              onClick={() => handleChangeImage(i)}
                              src={i}
                              alt={i}
                              key={i}
                              className={
                                image === i
                                  ? style.selectedImg2
                                  : style.selectedImg
                              }
                            />
                          ))}
                        </Box>
                      </ModalBody>
                      <ModalFooter>
                        <Box
                          display={'grid'}
                          gridTemplateColumns={'repeat(3,1fr)'}
                          gridColumnGap={'10px'}
                        >
                          <Button colorScheme="green" onClick={handleSave}>
                            Save
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={() => handleOpenWidget()}
                          >
                            Upload
                          </Button>
                          <Button
                            colorScheme="red"
                            mr={3}
                            onClick={handleCancelImage}
                            background={'#cd6155'}
                          >
                            Close
                          </Button>
                        </Box>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
                <Box
                  marginBottom={'2vh'}
                  border="solid 1px"
                  borderColor={'#424949'}
                  borderRadius={'4px'}
                >
                  <Text
                    background={'#424949'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                    border="solid 1px"
                    borderColor={'#424949'}
                  >
                    Username
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {username1}
                  </Text>
                </Box>
                <Box
                  borderRadius={'4px'}
                  marginBottom={'2vh'}
                  fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                  color={'#99a3a4'}
                  border="solid 1px"
                  borderColor={'#424949'}
                >
                  <Text
                    background={'#424949'}
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                    border="solid 1px"
                    borderColor={'#424949'}
                  >
                    Email
                  </Text>
                  <Text
                    fontSize={{ base: '14px', md: '16px', lg: '20px' }}
                    color={'#99a3a4'}
                  >
                    {mail}
                  </Text>
                </Box>
                <Button
                  marginBottom={'2vh'}
                  background={'#aed6f1'}
                  color={'#424949'}
                  onClick={changeUser}
                >
                  Change Username
                </Button>
                <Box marginBottom={'2vh'}>
                  {changeUserName ? (
                    <Box>
                      <Input
                        marginBottom={'2vh'}
                        background={'#424949'}
                        color={'#99a3a4'}
                        placeholder="New Username"
                        type="text"
                        value={input.username}
                        name="username"
                        onChange={(e) => handleChange(e)}
                      />
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            background="#bdecb6"
                            color={'#424949'}
                            marginRight={'5vw'}
                          >
                            Update
                          </Button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>
                              <Text color={'#424949'}>
                                Are you sure you want to update? From{' '}
                                {userData.username} to {input.username}?
                              </Text>
                            </PopoverHeader>
                            <PopoverBody>
                              <Button
                                marginRight={'5vw'}
                                background="#bdecb6"
                                color={'#424949'}
                                onClick={updateUserInfo}
                              >
                                Update
                              </Button>
                              <Button
                                background={'#cd6155'}
                                color={'#424949'}
                                onClick={changeState}
                              >
                                Cancel
                              </Button>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </Popover>
                      <Button
                        background={'#cd6155'}
                        color={'#424949'}
                        onClick={changeState}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : null}
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Flex>
    </div>
  );
}
