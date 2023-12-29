import React from "react";
import {
  Box,
  Text,
  Flex,
  Image,
  Divider,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import "@fontsource/nunito";
import { color } from "../../globalStyles";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../Redux/actions";

export default function Comment({ username, text, avatar, date, userId, id, deleteLocal }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user);
  const handleDeleteComment = (e) => {
    e.preventDefault()
    dispatch(deleteComment(id))
    deleteLocal(prev => prev.filter(comment => {return comment._id !== id}))
  }
  return (
    <Box
      border="1px"
      borderColor="gray.800"
      backgroundColor={color.kinemaBg}
      color="gray.200"
      w="100%"
      borderRadius={0}
    >
      <Flex ml={7} mt={5} justify="space-between">
        <Flex>
          <Image borderRadius={100} src={avatar} h={10}></Image>
          <Text ml={4} fontFamily="Nunito" fontSize={28}>
            @{username}
          </Text>
        </Flex>
        <Box>
          {user.uid === userId || user.admin ? (
            <Button
              borderRadius={0}
              mr={5}
              color="white"
              backgroundColor={color.kinemaBg}
              _hover={{ backgroundColor: "gray.600" }}
              onClick={handleDeleteComment}
            >
              <DeleteIcon />
            </Button>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
      <Divider mt={5}></Divider>
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        minH={20}
        m={5}
      >
        <Text>"{text}"</Text>
        <Text color="gray">{date}</Text>
      </Box>
    </Box>
  );
}
