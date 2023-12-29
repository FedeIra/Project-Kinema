import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';

import { useAuth } from '../AuthContext/AuthContext';
import './NavBarPlayer.module.css';
import { Link as RouteLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { color } from '../globalStyles';
import { BsArrowReturnLeft } from 'react-icons/bs';

const Links = ['Home', 'Movies', 'TV Shows'];

const NavLink1 = () => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    fontWeight="300"
    color={color.textLinkUnselected}
    _hover={{
      textDecoration: 'none',
      color: color.textLinkSelected,
    }}
  >
    {Links[0]}
  </Link>
);

const NavLink2 = () => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color={color.textLinkUnselected}
    fontWeight="300"
    _hover={{
      textDecoration: 'none',
      color: color.textLinkSelected,
    }}
  >
    {Links[1]}
  </Link>
);

const NavLink3 = () => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    color={color.textLinkUnselected}
    fontWeight="300"
    _hover={{
      textDecoration: 'none',
      color: color.textLinkSelected,
    }}
  >
    {Links[2]}
  </Link>
);

export default function Simple(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, read } = useAuth();
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { closePlayer } = props;

  async function logOut() {
    await logout();
    navigate('/');
  }

  useEffect(() => {
    async function exe() {
      let dataUser = await read(user.uid);
      setImage(dataUser.avatar);
    }
    exe();
  });

  return (
    <>
      <Box bg={color.kinemaBg} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Button onClick={ location.pathname.includes("watch") ? () => navigate(-1) : () => closePlayer()} variant='outline' 
                color={'white'}
              _hover={{ bg: 'blue.400' }}
              rightIcon={<BsArrowReturnLeft />}
              h={'30px'}
              w={'80px'}
              >Back</Button>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <RouteLink to="/home">
                <NavLink1 />
              </RouteLink>
              <RouteLink to="/home/movies">
                <NavLink2 />
              </RouteLink>
              <RouteLink to="/home/tv_shows">
                <NavLink3 />
              </RouteLink>
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={image} />
              </MenuButton>
              <MenuList>
                <RouteLink to="/profile">
                  <MenuItem>Profile</MenuItem>
                </RouteLink>
                <MenuItem>Watchlist</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              <RouteLink to="/home">
                <NavLink1 />
              </RouteLink>
              <RouteLink to="/home/movies">
                <NavLink2 />
              </RouteLink>
              <RouteLink to="/home/tv_shows">
                <NavLink3 />
              </RouteLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
