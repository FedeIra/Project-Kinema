import {
  Box,
  useColorModeValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Popover,
  PopoverTrigger,
  Button,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Avatar,
  Image,
} from '@chakra-ui/react';
import OwnerNavbar from './AdminNavbar';
import Statistics from './StatisticsAdmin';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../AuthContext/AuthContext';
import { firestore } from '../../AuthContext/firebase';
import { Navigate } from 'react-router-dom';
import prohibition from '../../../Assets/prohibition.png';
import { useToast } from '@chakra-ui/react';

export default function Admin() {
  const [ready, setReady] = useState(false);
  const [users, setUsers] = useState([]);
  const userData = useSelector((state) => state.user);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { user, loadingUser } = useAuth();
  const [, setByDate] = useState();
  const toast = useToast();

  async function allUsers() {
    let allUsers = [];
    const querySnapshot = await getDocs(collection(firestore, 'users'));
    querySnapshot.forEach((doc) => {
      allUsers.push({ ...doc.data(), uid: doc.id });
    });
    return allUsers;
  }

  const handleBan = async (user) => {
    if (!user.banned) {
      toast({
        title: 'User has been banned.',
        status: 'info',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        banned: true,
      });
      setUsers((prev) => {
        return prev.map((u) => {
          if (u.uid === user.uid) {
            u.banned = true;
          }
          return u;
        });
      });
    } else {
      toast({
        title: 'Ban has been lifted.',
        status: 'info',
        duration: 2000,
        position: 'top-center',
        isClosable: true,
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        banned: false,
      });
      setUsers((prev) => {
        return prev.map((u) => {
          if (u.uid === user.uid) {
            u.banned = false;
          }
          return u;
        });
      });
    }
  };

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const premiumUsers = users.filter((u) => u.subscription === 2 && u.active);
  const basicUsers = users.filter((u) => u.subscription === 1 && u.active);
  const totalUsers = premiumUsers.length + basicUsers.length;

  function searcher(e) {
    e.preventDefault();
    setSearch(e.target.value);
    setPage(1);
  }

  let results = [];
  if (!search) {
    results = users;
  } else {
    results = users.filter(
      (data) =>
        data.email.includes(search) ||
        data.username.toLowerCase().includes(search.toLowerCase())
    );
  }

  const indexOfLast = page * 10;
  const indexOfFirst = indexOfLast - 10;
  const currentUsers = results.slice(indexOfFirst, indexOfLast);

  function prevPage(e) {
    e.preventDefault();
    if (page > 1) return setPage(page - 1);
  }

  let totalPaginas = Math.ceil(results.length / 10);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(results.length / 10); i++) {
    pageNumbers.push(i);
  }

  const nextPage = (e) => {
    e.preventDefault();
    if (page !== totalPaginas) return setPage(page + 1);
  };

  function sortByDate() {
    let res = results.sort((a, b) => {
      if (a.subscriptionDate < b.subscriptionDate) return 1;
      if (a.subscriptionDate > b.subscriptionDate) return -1;
    });

    setByDate(res);
  }

  let backgroundBox = useColorModeValue('gray.100', 'gray.900');

  useEffect(() => {
    async function exe() {
      let allUsersData = await allUsers();
      setUsers(allUsersData);
      setReady(true);
    }
    exe();
  }, [ready]);

  if (loadingUser) return null;
  if (!user) return <Navigate to={'/home'} />;
  if (!userData.admin) return <Navigate to={'/home'} />;

  return (
    <Box bg={loadingUser ? null : backgroundBox} height={'100%'}>
      <OwnerNavbar
        users={users}
        search={search}
        searcher={searcher}
        results={results}
        user={userData}
      />
      <Statistics
        totalUsers={totalUsers}
        premiumUsers={premiumUsers.length}
        basicUsers={basicUsers.length}
      />

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
            de {totalPaginas}
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
          height={'900px'}
        >
          <Center>
            <Table variant="simple" width={'90%'}>
              <Thead>
                <Tr>
                  <Th fontSize={'14px'}>Photo</Th>
                  <Th fontSize={'14px'}>Email</Th>
                  <Th fontSize={'14px'}>Username</Th>
                  <Th fontSize={'14px'}>
                    Subscription Date
                    <Button
                      padding={'5px'}
                      height={'25px'}
                      fontSize={'12px'}
                      border={'1px solid black'}
                      onClick={sortByDate}
                    >
                      Sort
                    </Button>
                  </Th>
                  <Th fontSize={'14px'}>Subscription</Th>
                  <Th fontSize={'14px'}>Rented</Th>
                  <Th fontSize={'14px'}>Status</Th>
                  <Th fontSize={'14px'}>Ban / Lift Ban</Th>
                  <Th fontSize={'14px'}>Banned</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users
                  ? currentUsers.map((user, i) => {
                      let activeOrNot = user.active ? 'Active' : 'Not active';

                      return (
                        <Tr key={i}>
                          <Td>
                            <Avatar size={'md'} src={user.avatar} />
                          </Td>
                          <Td
                            fontSize={'14px'}
                            color={'gray.500'}
                          >
                            {user.email}
                          </Td>
                          <Td
                            fontSize={'14px'}
                            color={'gray.500'}
                          >
                            {user.username}
                          </Td>
                          <Td
                            fontSize={'14px'}
                            color={'gray.500'}
                          >
                            {user.subscriptionDate
                              .toDate()
                              .toLocaleDateString('en-US', options)}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {user.subscription === 1 ? 'Basic' : 'Premium'}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {user.rented.length}
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {activeOrNot}
                          </Td>
                          <Td>
                            <Box display="flex" justifyContent="center">
                              <Popover placement="right">
                                {({ isOpen, onClose }) => (
                                  <>
                                    <PopoverTrigger
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <Button background={'lightgray'}>
                                        <Image
                                          src={prohibition}
                                          alt="delete_image"
                                          width="20px"
                                          height="20px"
                                          color="white"
                                        />
                                      </Button>
                                    </PopoverTrigger>
                                    <Portal>
                                      <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton
                                          color={'black'}
                                          backgroundColor={'lightgray'}
                                        />
                                        <PopoverHeader
                                          color={'black'}
                                          backgroundColor={'lightgray'}
                                          fontWeight="bold"
                                          fontSize="15px"
                                          textAlign="center"
                                          padding="10px"
                                        >
                                          {!user.banned
                                            ? `Are you sure you want to ban ${user.username}?`
                                            : 'Are you sure you want to lift ban?'}
                                        </PopoverHeader>
                                        <PopoverBody
                                          display="flex"
                                          justifyContent="space-around"
                                        >
                                          <Button
                                            background={'#cd6155'}
                                            value={user.username}
                                            onClick={() => {
                                              handleBan(user);
                                              onClose();
                                            }}
                                          >
                                            Yes
                                          </Button>
                                          <Button
                                            background={'#5dade2'}
                                            onClick={onClose}
                                          >
                                            No
                                          </Button>
                                        </PopoverBody>
                                      </PopoverContent>
                                    </Portal>
                                  </>
                                )}
                              </Popover>
                            </Box>
                          </Td>
                          <Td fontSize={'14px'} color={'gray.500'}>
                            {user.banned ? 'Yes' : 'No'}
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
            de {totalPaginas}
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
