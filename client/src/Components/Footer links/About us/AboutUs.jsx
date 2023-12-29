import React from "react";
import { Box, Text, Wrap, Heading } from "@chakra-ui/react";
import NavBar from "../../NavBar/NavBar";
import Footer from "../../Home/Chakra UI Components/Footer";
import ProfileCard from "./ProfileCard";
import aboutUsData from './aboutUsData.json';
import { color } from '../../globalStyles' 

export default function AboutUs (){

    function randomCards(array){
        return array.sort(()=> Math.random() > .5 ? 1 : -1)
    }

    let result = randomCards(aboutUsData)
    
    return (
        <Box>
            <NavBar/>
            <Heading
                fontWeight={600}
                mb={6}
                textAlign='center'
                color='white'
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                    Meet our <Text as={'span'} color={color.kinemaLogoColor1}>team</Text>
            </Heading>
            <Wrap
                spacing="20px"
                bgGradient="linear(to-b, #222222, #333333)"
                _dark={{
                    bg: "#3e3e3e",
                }}
                p={50}
                w="full"
                align="center"
                justify="center"
            >
                {result.map( (el) =>
                    <Box >
                        <ProfileCard
                            fullName={el.fullName}
                            skill={el.skill}
                            profilePic={el.profilePic} 
                            description={el.description} 
                            education={el.education} 
                            location={el.location} 
                            email={el.email} 
                            linkedin={el.linkedin} 
                            github={el.github} 
                        />
                    </Box>    
                )}
            </Wrap>
            <Footer/>
        </Box>
        )
    }