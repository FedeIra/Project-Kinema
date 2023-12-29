import {
  Box,
  Text,
  Center,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Portal,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getCommentsData, deleteComment } from '../../../Redux/actions';
import { useDispatch } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import prohibition from '../../../Assets/prohibition.png';
import { useToast } from '@chakra-ui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../AuthContext/firebase';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import loader from '../../../Assets/loader.gif';

export default function UserComments() {
  const dispatch = useDispatch();
  const toast = useToast();
  let { id } = useParams();

  const [comments, setComments] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(getCommentsData(id)).then((res) => {
      setLoading(false);
      setComments(res.payload);
    });
  }, [refresh]);

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
    setComments(comments.filter((comment) => comment.id !== id));
    setRefresh(Math.random());
    toast({
      title: `Comment has been deleted.`,
      status: 'info',
      duration: 3000,
      position: 'top-center',
      isClosable: true,
    });
  };

  const handleBan = async (uid, username) => {
    toast({
      title: `${username} has been banned.`,
      status: 'info',
      duration: 3000,
      position: 'top-center',
      isClosable: true,
    });
    await updateDoc(doc(firestore, 'users', uid), {
      banned: true,
    });
  };

  return (
    <Box
      border="1px"
      borderColor="gray.800"
      backgroundColor="gray.700"
      color="gray.200"
    >
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        backgroundColor="black"
      >
        <Button
          backgroundColor="lightgray"
          color={'black'}
          mt={5}
          ml={5}
          mb={5}
          onClick={() => window.history.back()}
          _hover={{ backgroundColor: 'gray.500' }}
        >
          Go back
        </Button>
      </Box>
      {loading ? (
        <Center height={'100vh'} width={'100vw'}>
          <Image boxSize="160px" src={loader} alt="loader" />
        </Center>
      ) : null}
      {comments.length > 0 ? (
        <TableContainer border="1px" borderColor="gray.500">
          <Center>
            <Table>
              <Thead
                backgroundColor="gray.800"
                color="gray.300"
                border="2px"
                borderColor="gray.800"
              >
                <Tr>
                  <Th fontSize={'14px'} color={'gray.300'}>
                    User Name
                  </Th>
                  <Th fontSize={'14px'} color={'gray.300'}>
                    Comment
                  </Th>
                  <Th fontSize={'14px'} color={'gray.300'}>
                    Date
                  </Th>
                  <Th fontSize={'14px'} color={'gray.300'}>
                    Ban
                  </Th>
                  <Th fontSize={'14px'} color={'gray.300'}>
                    Delete
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {comments.map((comment) => (
                  <Tr
                    key={comment.id}
                    border="2px solid"
                    borderColor="gray.500"
                    backgroundColor="gray.700"
                    color="gray.200"
                  >
                    <Td>{comment.username}</Td>
                    <Td>
                      {comment.content.length > 100 ? (
                        <Center justifyContent="flex.start">
                          <Text>{comment.content.slice(0, 100)}... </Text>
                          <Popover placement="left">
                            <PopoverTrigger>
                              <Button colorScheme="transparent" size="sm">
                                <BsFillChatDotsFill
                                  style={{ fontSize: '20px' }}
                                  color="white"
                                />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent width={'auto'} height={'auto'}>
                              <PopoverArrow />{' '}
                              <PopoverCloseButton
                                padding="5px"
                                border={'1px solid'}
                              />
                              <PopoverBody
                                display={'flex'}
                                alignItems={'center'}
                                width={'1000px'}
                                height={'150px'}
                                overflow={'auto'}
                                backgroundColor="gray.700"
                              >
                                {' '}
                                <Text>{comment.content}</Text>{' '}
                              </PopoverBody>
                            </PopoverContent>
                          </Popover>
                        </Center>
                      ) : (
                        <Text>{comment.content}</Text>
                      )}
                    </Td>
                    <Td>{comment.date}</Td>{' '}
                    <Td>
                      <Box display="flex" alignItems="center">
                        <Popover placement="right" closeOnBlur={false}>
                          {({ isOpen, onClose }) => (
                            <>
                              <PopoverTrigger style={{ cursor: 'pointer' }}>
                                <Button backgroundColor="transparent">
                                  <Image
                                    src={prohibition}
                                    alt="prohibition"
                                    width={'20px'}
                                    filter="invert(1)"
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
                                    Are you sure?
                                  </PopoverHeader>
                                  <PopoverBody
                                    display="flex"
                                    justifyContent="space-around"
                                  >
                                    <Button
                                      background={'#cd6155'}
                                      onClick={() => {
                                        handleBan(
                                          comment.userId,
                                          comment.username
                                        );
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
                    <Td>
                      <Button
                        backgroundColor="transparent"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        <BsFillTrashFill />
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Center>
        </TableContainer>
      ) : (
        <Center>
          <Text fontSize={'20px'} color={'gray.300'}>
            No comments.
          </Text>
        </Center>
      )}{' '}
    </Box>
  );
}
