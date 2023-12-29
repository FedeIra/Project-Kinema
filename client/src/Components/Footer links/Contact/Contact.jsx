import React from "react";
import Footer from "../../Home/Chakra UI Components/Footer";
import NavBar from "../../NavBar/NavBar";
import ContactTemplate from "./ContactTemplate";
import { Box, Flex, Image } from "@chakra-ui/react";




export default function Contact() {
  return (
    <Flex direction="column" bg="#222222" as="main"  backgroundColor={'#1D1D1D'}
    backgroundImage={
   'linear-gradient(180deg, #0000008c 20%, #0000008c 100%), url(https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/12/14/5fd73c24bebce.jpeg)'
    }
    backgroundRepeat={'no-repeat'}
    backgroundSize={'cover'}
     >
      <NavBar></NavBar>
      <ContactTemplate></ContactTemplate>
      <Footer/>
    </Flex>
  )
}
