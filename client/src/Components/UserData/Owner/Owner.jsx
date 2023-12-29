import OwnerNavbar from './OwnerNavbar';
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
  Flex,
  useToast,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import Statistics from './Statistics';
import LineChart from './LineChart';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../AuthContext/AuthContext';
import { firestore } from '../../AuthContext/firebase';
import { Navigate } from 'react-router-dom';
import edit from '../../../Assets/edit.png';
import DoughnutGraph from './DoughnutChart';
import BarChart from './BarChart';
import moment from 'moment';

export default function Owner() {
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

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const premiumUsers = users.filter((u) => u.subscription === 2 && u.active);
  const basicUsers = users.filter((u) => u.subscription === 1 && u.active);
  const inactiveUsers = users.filter((u) => !u.active);

  // Total users in october:
  const octoberUsers = users.filter(
    (u) =>
      u.active &&
      moment(u.subscriptionDate.seconds * 1000).format('MMMM') === 'October'
  ).length;

  // Total users in november:
  const novemberUsers = users.filter(
    (u) =>
      u.active &&
      moment(u.subscriptionDate.seconds * 1000).format('MMMM') === 'November'
  ).length;

  // Total users:
  const totalUsers = octoberUsers + novemberUsers;

  const totalRent = users.filter((u) => u.rented.length).map((u) => u.rented);
  const totalRented = totalRent.flat();

  // October rent revenues
  const totalRentedOctober = totalRented.filter(
    (u) =>
      moment(u.expirationDate - 1000 * 3600 * 24 * 4).format('MMMM') ===
      'October'
  );
  const totalRentRevenueOctober = totalRentedOctober.length * 1.99;

  // November rent revenues
  const totalRentedNovember = totalRented.filter(
    (u) =>
      moment(u.expirationDate - 1000 * 3600 * 24 * 4).format('MMMM') ===
      'November'
  );

  const totalRentRevenueNovember = totalRentedNovember.length * 1.99;

  const percentagePremiumUsers =
    (premiumUsers.length * 100) / (users.length - inactiveUsers.length);
  const percentageBasicUsers =
    (basicUsers.length * 100) / (users.length - inactiveUsers.length);

  // October premium revenue:
  const premiumUsersOctober = premiumUsers.filter(
    (u) =>
      moment(u.subscriptionDate.seconds * 1000).format('MMMM') === 'October'
  );
  const premiumRevenueOctober = premiumUsersOctober.length * 7.99;

  // November premium revenue:
  const premiumUsersNovember = premiumUsers.filter(
    (u) =>
      moment(u.subscriptionDate.seconds * 1000).format('MMMM') === 'November'
  );
  const premiumRevenueNovember = premiumUsersNovember.length * 7.99;

  // October total revenue:
  const totalRevenueOctober = premiumRevenueOctober + totalRentRevenueOctober;

  // November total revenue:
  const totalRevenueNovember =
    premiumRevenueNovember + totalRentRevenueNovember;

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

  const handleBan = async (user) => {
    if (!user.admin) {
      toast({
        title: `User ${user.username} is admin now`,
        status: 'info',
        duration: 5000,
        position: 'top-center',
        isClosable: true,
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        admin: true,
      });
      setUsers((prev) => {
        return prev.map((u) => {
          if (u.uid === user.uid) {
            u.admin = true;
          }
          return u;
        });
      });
    } else {
      toast({
        title: `User ${user.username} is no longer admin`,
        status: 'info',
        duration: 5000,
        position: 'top-center',
        isClosable: true,
      });
      await updateDoc(doc(firestore, 'users', user.uid), {
        admin: false,
      });
      setUsers((prev) => {
        return prev.map((u) => {
          if (u.uid === user.uid) {
            u.admin = false;
          }
          return u;
        });
      });
    }
  };

  function sortByDate() {
    let res = results.sort((a, b) => {
      if (a.subscriptionDate < b.subscriptionDate) return 1;
      if (a.subscriptionDate > b.subscriptionDate) return -1;
      else return 0;
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
  if (!userData.owner) return <Navigate to={'/home'} />;

  return (
    <Box bg={loadingUser ? null : backgroundBox} height={'100%'}>
      <OwnerNavbar
        users={users}
        search={search}
        searcher={searcher}
        results={results}
        user={userData}
      />

      <Tabs align="center" variant="enclosed">
        <TabList marginTop={'10px'}>
          <Tab
            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
            color={'#99a3a4'}
          >
            Users
          </Tab>
          <Tab
            fontSize={{ base: '14px', md: '16px', lg: '20px' }}
            color={'#99a3a4'}
          >
            Tables
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box>
              <Statistics
                totalUsers={totalUsers}
                premiumUsers={premiumUsers.length}
                basicUsers={basicUsers.length}
              />

              <Box bg={loadingUser ? null : backgroundBox}>
                <Center margin={'50px'}>
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
                    <Table variant="simple" width={'90vw'}>
                      <Thead>
                        <Tr>
                          <Th fontSize={'14px'}>Photo</Th>
                          <Th fontSize={'14px'}>Email</Th>
                          <Th fontSize={'14px'}>Username</Th>
                          <Th fontSize={'14px'}>
                            Subscription Date{' '}
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
                          <Th fontSize={'14px'}>Type User</Th>
                          <Th fontSize={'14px'}>Edit Admin</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {users
                          ? currentUsers.map((user, i) => {
                              let activeOrNot = user.active
                                ? 'Active'
                                : 'Inactive';

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
                                    {user.subscription === 1
                                      ? 'Basic'
                                      : 'Premium'}
                                  </Td>
                                  <Td fontSize={'14px'} color={'gray.500'}>
                                    {user.rented.length}
                                  </Td>
                                  <Td fontSize={'14px'} color={'gray.500'}>
                                    {activeOrNot}
                                  </Td>
                                  <Td color={'gray.500'}>
                                    {user.admin ? 'Admin' : 'User'}
                                  </Td>
                                  <Td>
                                    <Box>
                                      <Popover>
                                        <PopoverTrigger>
                                          <Button background={'lightgray'}>
                                            <Image
                                              src={edit}
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
                                            <PopoverCloseButton />
                                            <PopoverHeader>
                                              {user.admin
                                                ? `Are you sure you want to REMOVE admin ${user.username}?`
                                                : `Are you sure you want to MAKE admin ${user.username}?`}
                                            </PopoverHeader>
                                            <PopoverBody>
                                              <Button
                                                background={'#cd6155'}
                                                value={user.username}
                                                onClick={() => handleBan(user)}
                                              >
                                                Continue
                                              </Button>
                                            </PopoverBody>
                                          </PopoverContent>
                                        </Portal>
                                      </Popover>
                                    </Box>
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
          </TabPanel>
          <TabPanel>
            <Statistics
              totalUsers={totalUsers}
              premiumUsers={premiumUsers.length}
              basicUsers={basicUsers.length}
            />

            <Center>
              <Box w="200px" marginTop={'40px'} marginBottom={'70px'}>
                <DoughnutGraph
                  basicUsers={percentageBasicUsers.toFixed(2)}
                  premiumUsers={percentagePremiumUsers.toFixed(2)}
                />
              </Box>
            </Center>

            <Center>
              <Box
                backgroundColor="var(--chakra-colors-gray-300)"
                borderRadius="10px"
              >
                <LineChart
                  dataSeptember={0}
                  dataOctober={totalRevenueOctober}
                  dataNovember={totalRevenueNovember}
                  tableName="Total Revenue"
                />
              </Box>
            </Center>

            <Flex justify={'space-evenly'} direction={'row '} margin={'100px'}>
              <LineChart
                dataSeptember={0}
                dataOctober={totalRentRevenueOctober}
                dataNovember={totalRentRevenueNovember}
                tableName="Rent Revenue"
                color="white"
              />
              <LineChart
                dataSeptember={0}
                dataOctober={premiumRevenueOctober}
                dataNovember={premiumRevenueNovember}
                tableName="Premium Revenue"
              />
            </Flex>

            <Flex justify={'space-evenly'} direction={'row '} margin={'100px'}>
              <BarChart
                dataSeptember={0}
                dataOctober={octoberUsers}
                dataNovember={novemberUsers}
                tableName="New Users"
              />
              <BarChart
                dataSeptember={0}
                dataOctober={octoberUsers}
                dataNovember={novemberUsers + octoberUsers}
                tableName="Total Users"
              />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
