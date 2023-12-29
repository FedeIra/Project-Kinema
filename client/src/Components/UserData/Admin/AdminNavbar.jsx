import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  HStack,
  VStack,
  Text,
  Image,
} from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import SearchBarAdmin from './SearchAdmin';
import logo from '../../../Assets/logo.png';
import { useAuth } from '../../AuthContext/AuthContext';

export default function AdminNavbar({ searcher, results, search, user }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function logOut() {
    await logout();
    navigate('/');
  }

  return (
    <>
      <Box backgroundColor={'var(--chakra-colors-blue-600)'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box marginRight={'20px'}>
            <RouteLink to="/home">
              <Image
                boxSize="100px"
                objectFit="cover"
                src={logo}
                alt="Logo-kinema"
              />
            </RouteLink>
          </Box>

          <Flex>
            <Stack alignItems={'center'} direction={'row'} spacing={5}>
              <SearchBarAdmin
                searcher={searcher}
                results={results}
                search={search}
              />
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Flex>
                <Menu>
                  <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <HStack>
                      <Avatar size={'md'} src={user.avatar} />
                      <VStack
                        display={{ base: 'none', md: 'flex' }}
                        alignItems="flex-start"
                        spacing="1px"
                        ml="2"
                      >
                        <Text fontSize="sm">{user.username}</Text>
                        <Text fontSize="xs" color="black.600">
                          Admin
                        </Text>
                      </VStack>
                      <Box display={{ base: 'none', md: 'flex' }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  </MenuButton>
                  <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                  >
                    <RouteLink to={'/Home'}>
                      <MenuItem> Home </MenuItem>
                    </RouteLink>
                    <RouteLink to={'/profile'}>
                      <MenuItem> Profile </MenuItem>
                    </RouteLink>
                    <MenuDivider />
                    <RouteLink to={'/admin'}>
                      <MenuItem> Users Data </MenuItem>
                    </RouteLink>
                    <RouteLink to={'/admin/content'}>
                      <MenuItem> Kinema Content </MenuItem>
                    </RouteLink>
                    <MenuDivider />
                    <MenuItem onClick={logOut}>Log out</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
