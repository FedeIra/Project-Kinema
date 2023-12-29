import React from "react";
import { Box, Flex, Icon, Text, Image, chakra, Center, Link } from "@chakra-ui/react";
import { MdEmail, MdHeadset, MdLocationOn } from "react-icons/md";
import { BsGithub } from "react-icons/bs";
import { GiDiploma, GiRibbonMedal } from "react-icons/gi";
import { AiFillLinkedin } from "react-icons/ai";
import { color } from '../../globalStyles'

export default function ProfileCard ({ fullName, profilePic, skill, description, education, location, email, linkedin, github }){
    
    const picture = require(`./ProfilePics/${profilePic}`)
    return(
            <Box
                w="380px"
                h={{base: "524px", lg:"560px"}}
                my={{base: '4px', lg: '16px'}}
                mx="auto"
                bg="white"
                _dark={{
                bg: "gray.800",
                }}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
            >
                <Image
                    w="full"
                    h={56}
                    fit="cover"
                    objectPosition="center"
                    src={picture}
                    alt="avatar"
                />

                <Flex alignItems="center" px={6} py={3} bg="gray.900">
                    <Icon as={GiRibbonMedal} h={6} w={6} color={color.kinemaLogoColor1} />

                    <chakra.h1 mx={3} color={color.kinemaLogoColor1} fontWeight="bold" fontSize="lg">
                        {skill}
                    </chakra.h1>
                </Flex>

                <Box py={4} px={6}>
                    <chakra.h1
                        fontSize={{base:"lg", lg:"xl"}}
                        fontWeight="bold"
                        color="gray.800"
                        _dark={{
                        color: "white",
                        }}
                    >
                        {fullName}
                    </chakra.h1>

                    <chakra.p
                        py={2}
                        fontSize={{base: "12px", md: "14px", lg:"16px"}}
                        color="gray.700"
                        _dark={{
                        color: "gray.400",
                        }}
                    >
                        {description}
                    </chakra.p>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{
                        color: "gray.200",
                        }}
                    >
                        <Icon as={GiDiploma} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize={{base: "12px", lg: "14px"}}>
                            {education}
                        </chakra.h1>
                    </Flex>

                    <Flex
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{
                        color: "gray.200",
                        }}
                    >
                        <Icon as={MdLocationOn} h={6} w={6} mr={2} />

                        <chakra.h1 px={2} fontSize={{base: "12px", lg: "14px"}}>
                            {location}
                        </chakra.h1>
                    </Flex>
                    <Center
                        alignItems="center"
                        mt={4}
                        color="gray.700"
                        _dark={{
                        color: "gray.200",
                        }}
                    >
                        <Link href={'mailto:'+email}>
                            <Icon as={MdEmail} h={6} w={6} mr={2} />
                        </Link>
                        <Link href={linkedin} isExternal>
                            <Icon as={AiFillLinkedin} h={6} w={6} mr={2} />
                        </Link>
                        <Link href={github} isExternal>
                            <Icon as={BsGithub} h={6} w={6} mr={2} />
                        </Link>
                    </Center>
                </Box>
            </Box>
    )
}

